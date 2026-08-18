import { Module } from '@nestjs/common';

import { BullModule } from '@nestjs/bullmq';

import { ConfigModule, ConfigService } from '@nestjs/config';

import { EMAIL_QUEUE, NOTIFICATION_QUEUE } from './queues.constants';
import { EmailProcessor } from './email.processor';
import { NotificationProcessor } from './notification.processor';
import { QueueService } from './queue.service';
import { EmailModule } from '../email/email.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    EmailModule,

    NotificationsModule,

    BullModule.forRootAsync({
      imports: [ConfigModule],

      inject: [ConfigService],

      useFactory: (config: ConfigService) => ({
        connection: {
          host: config.get<string>('REDIS_HOST', 'localhost'),

          port: config.get<number>('REDIS_PORT', 6379),
        },
      }),
    }),

    BullModule.registerQueue(
      {
        name: EMAIL_QUEUE,
      },
      {
        name: NOTIFICATION_QUEUE,
      },
    ),
  ],

  exports: [BullModule, QueueService],

  providers: [EmailProcessor, NotificationProcessor, QueueService],
})
export class QueuesModule {}
