import { Processor, WorkerHost } from '@nestjs/bullmq';

import { Job } from 'bullmq';

import { NotificationType, Prisma } from '@prisma/client';

import { NotificationsService } from '../notifications/notifications.service';

import { NOTIFICATION_QUEUE } from './queues.constants';

interface NotificationJob {
  userId: string;

  type: NotificationType;

  title: string;

  message: string;

  metadata?: Prisma.InputJsonValue;
}

@Processor(NOTIFICATION_QUEUE)
export class NotificationProcessor extends WorkerHost {
  constructor(private readonly notificationsService: NotificationsService) {
    super();
  }

  async process(job: Job<NotificationJob>) {
    await this.notificationsService.create({
      userId: job.data.userId,

      type: job.data.type,

      title: job.data.title,

      message: job.data.message,

      metadata: job.data.metadata,
    });
  }
}
