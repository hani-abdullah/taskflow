import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe?: Stripe;

  constructor(private readonly config: ConfigService) {}

  createCustomer(params: {
    email: string;
    name: string;
    userId: string;
  }): Promise<Stripe.Customer> {
    return this.getClient().customers.create({
      email: params.email,
      name: params.name,
      metadata: { userId: params.userId },
    });
  }

  createCheckoutSession(params: {
    customerId: string;
    userId: string;
    priceId: string;
    successUrl: string;
    cancelUrl: string;
  }): Promise<Stripe.Checkout.Session> {
    return this.getClient().checkout.sessions.create({
      mode: 'subscription',
      customer: params.customerId,
      line_items: [{ price: params.priceId, quantity: 1 }],
      success_url: params.successUrl,
      cancel_url: params.cancelUrl,
      metadata: { userId: params.userId },
      subscription_data: { metadata: { userId: params.userId } },
    });
  }

  createPortalSession(
    customerId: string,
    returnUrl: string,
  ): Promise<Stripe.BillingPortal.Session> {
    return this.getClient().billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    });
  }

  cancelSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
    return this.getClient().subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });
  }

  constructWebhookEvent(payload: Buffer, signature: string): Stripe.Event {
    const secret = this.config.get<string>('STRIPE_WEBHOOK_SECRET');
    if (!secret) {
      throw new ServiceUnavailableException(
        'Stripe webhook signing secret is not configured',
      );
    }
    return this.getClient().webhooks.constructEvent(payload, signature, secret);
  }

  private getClient() {
    if (this.stripe) return this.stripe;

    const secretKey = this.config.get<string>('STRIPE_SECRET_KEY');
    if (!secretKey) {
      throw new ServiceUnavailableException('Stripe billing is not configured');
    }
    this.stripe = new Stripe(secretKey);
    return this.stripe;
  }
}
