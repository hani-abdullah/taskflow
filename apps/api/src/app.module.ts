import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';
import { envValidationSchema } from './config/env.validation';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { NotificationsModule } from './notifications/notifications.module';
import { BillingModule } from './billing/billing.module';
import { EmailModule } from './email/email.module';
import { QueuesModule } from './queues/queues.module';
import { StripeModule } from './stripe/stripe.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AdminModule } from './admin/admin.module';
import { AuditModule } from './audit/audit.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validationSchema: envValidationSchema,
    }),

    PrismaModule,

    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 100 }]),

    AuthModule,

    UsersModule,

    ProjectsModule,

    TasksModule,

    NotificationsModule,

    BillingModule,

    EmailModule,

    QueuesModule,

    StripeModule,
    AdminModule,
    AuditModule,
  ],

  controllers: [AppController],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
