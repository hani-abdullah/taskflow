import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { SubscriptionStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SubscriptionGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext) {
    const request = context
      .switchToHttp()
      .getRequest<{ user?: { id: string } }>();
    if (!request.user) {
      throw new ForbiddenException('Authentication required');
    }

    const subscription = await this.prisma.subscription.findUnique({
      where: { userId: request.user.id },
    });

    if (!subscription || subscription.status !== SubscriptionStatus.ACTIVE) {
      throw new ForbiddenException('Active subscription required');
    }

    return true;
  }
}
