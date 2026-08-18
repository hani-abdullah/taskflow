import {
  BadRequestException,
  Controller,
  ConflictException,
  Get,
  Headers,
  HttpException,
  NotFoundException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { RawBodyRequest } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma, SubscriptionStatus } from '@prisma/client';
import type { Request } from 'express';
import Stripe from 'stripe';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { PrismaService } from '../prisma/prisma.service';
import { QueueService } from '../queues/queue.service';
import { StripeService } from './stripe.service';

interface AuthenticatedUser {
  id: string;
  email: string;
}

@Controller('stripe')
export class StripeController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly prisma: PrismaService,
    private readonly queueService: QueueService,
    private readonly config: ConfigService,
  ) {}

  @Post('checkout')
  @UseGuards(JwtAuthGuard)
  async createCheckout(@CurrentUser() authUser: AuthenticatedUser) {
    const [user, existingSubscription] = await Promise.all([
      this.prisma.user.findUniqueOrThrow({ where: { id: authUser.id } }),
      this.prisma.subscription.findUnique({ where: { userId: authUser.id } }),
    ]);

    const customerId =
      existingSubscription?.stripeCustomerId ??
      (
        await this.stripeService.createCustomer({
          email: user.email,
          name: `${user.firstName} ${user.lastName}`.trim(),
          userId: user.id,
        })
      ).id;

    const session = await this.stripeService.createCheckoutSession({
      customerId,
      userId: user.id,
      priceId: this.config.getOrThrow<string>('STRIPE_PRICE_ID'),
      successUrl: this.config.getOrThrow<string>('STRIPE_SUCCESS_URL'),
      cancelUrl: this.config.getOrThrow<string>('STRIPE_CANCEL_URL'),
    });

    if (!session.url) {
      throw new BadRequestException('Stripe did not return a checkout URL');
    }

    return { url: session.url };
  }

  @Post('portal')
  @UseGuards(JwtAuthGuard)
  async createPortal(@CurrentUser() user: AuthenticatedUser) {
    const subscription = await this.getSubscriptionOrThrow(user.id);
    const session = await this.stripeService.createPortalSession(
      subscription.stripeCustomerId,
      this.config.getOrThrow<string>('STRIPE_SUCCESS_URL'),
    );
    return { url: session.url };
  }

  @Post('cancel')
  @UseGuards(JwtAuthGuard)
  async cancel(@CurrentUser() user: AuthenticatedUser) {
    const subscription = await this.getSubscriptionOrThrow(user.id);
    const result = await this.stripeService.cancelSubscription(
      subscription.stripeSubscriptionId,
    );
    return { success: true, cancelAtPeriodEnd: result.cancel_at_period_end };
  }

  @Get('subscription')
  @UseGuards(JwtAuthGuard)
  getSubscription(@CurrentUser() user: AuthenticatedUser) {
    return this.prisma.subscription.findUnique({ where: { userId: user.id } });
  }

  @Post('webhook')
  async webhook(
    @Req() request: RawBodyRequest<Request>,
    @Headers('stripe-signature') signature?: string,
  ) {
    if (!signature || !request.rawBody) {
      throw new BadRequestException('Missing Stripe signature or raw body');
    }

    let event: Stripe.Event;
    try {
      event = this.stripeService.constructWebhookEvent(
        request.rawBody,
        signature,
      );
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new BadRequestException('Invalid Stripe webhook signature');
    }

    try {
      await this.prisma.stripeWebhookEvent.create({
        data: { stripeEventId: event.id, type: event.type },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        const existing = await this.prisma.stripeWebhookEvent.findUnique({
          where: { stripeEventId: event.id },
        });
        if (existing?.processedAt) {
          return { received: true, duplicate: true };
        }
        throw new ConflictException('Stripe event is still being processed');
      }
      throw error;
    }

    try {
      await this.processWebhook(event);
      await this.prisma.stripeWebhookEvent.update({
        where: { stripeEventId: event.id },
        data: { processedAt: new Date() },
      });
    } catch (error) {
      await this.prisma.stripeWebhookEvent.delete({
        where: { stripeEventId: event.id },
      });
      throw error;
    }

    return { received: true };
  }

  private async processWebhook(event: Stripe.Event) {
    switch (event.type) {
      case 'checkout.session.completed':
        await this.handleCheckoutCompleted(event.data.object);
        break;
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        await this.handleSubscriptionEvent(event.data.object);
        break;
    }
  }

  private async handleCheckoutCompleted(session: Stripe.Checkout.Session) {
    const userId = session.metadata?.userId;
    const customerId = this.getStripeId(session.customer);
    const subscriptionId = this.getStripeId(session.subscription);
    if (!userId || !customerId || !subscriptionId) {
      throw new BadRequestException(
        'Checkout session is missing billing metadata',
      );
    }

    await this.prisma.subscription.upsert({
      where: { userId },
      create: {
        userId,
        stripeCustomerId: customerId,
        stripeSubscriptionId: subscriptionId,
        status: SubscriptionStatus.INCOMPLETE,
      },
      update: {
        stripeCustomerId: customerId,
        stripeSubscriptionId: subscriptionId,
      },
    });

    await this.queueService.createNotification({
      userId,
      type: 'SYSTEM',
      title: 'Checkout completed',
      message: 'Your subscription checkout was completed.',
      metadata: { stripeSessionId: session.id },
    });
  }

  private async handleSubscriptionEvent(subscription: Stripe.Subscription) {
    const userId = subscription.metadata.userId;
    const customerId = this.getStripeId(subscription.customer);
    const item = subscription.items.data[0];
    if (!userId || !customerId || !item) {
      throw new BadRequestException('Subscription is missing billing metadata');
    }

    const data = {
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscription.id,
      status: this.mapSubscriptionStatus(subscription.status),
      priceId: item.price.id,
      currentPeriodStart: new Date(item.current_period_start * 1000),
      currentPeriodEnd: new Date(item.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    };
    await this.prisma.subscription.upsert({
      where: { userId },
      create: { userId, ...data },
      update: data,
    });
  }

  private mapSubscriptionStatus(status: Stripe.Subscription.Status) {
    return status.toUpperCase() as SubscriptionStatus;
  }

  private getStripeId(value: string | { id: string } | null) {
    return typeof value === 'string' ? value : value?.id;
  }

  private async getSubscriptionOrThrow(userId: string) {
    const subscription = await this.prisma.subscription.findUnique({
      where: { userId },
    });
    if (!subscription) throw new NotFoundException('Subscription not found');
    return subscription;
  }
}
