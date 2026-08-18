import { Injectable } from '@nestjs/common';

import { InjectQueue } from '@nestjs/bullmq';

import { Queue } from 'bullmq';

import { EMAIL_QUEUE, NOTIFICATION_QUEUE } from './queues.constants';

import { NotificationType } from '@prisma/client';

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue(EMAIL_QUEUE)
    private readonly emailQueue: Queue,

    @InjectQueue(NOTIFICATION_QUEUE)
    private readonly notificationQueue: Queue,
  ) {}

  async sendEmail(params: {
    to: string;

    subject: string;

    html: string;
  }) {
    return this.emailQueue.add('send-email', params, {
      attempts: 3,

      backoff: {
        type: 'exponential',
        delay: 2000,
      },

      removeOnComplete: 100,

      removeOnFail: 500,
    });
  }

  async createNotification(params: {
    userId: string;

    type: NotificationType;

    title: string;

    message: string;

    metadata?: Record<string, unknown>;
  }) {
    return this.notificationQueue.add('create-notification', params, {
      attempts: 3,

      backoff: {
        type: 'exponential',
        delay: 1000,
      },

      removeOnComplete: 100,

      removeOnFail: 500,
    });
  }
}
