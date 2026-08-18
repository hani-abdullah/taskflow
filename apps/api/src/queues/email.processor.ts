import { Processor } from '@nestjs/bullmq';

import { Job } from 'bullmq';

import { EmailService } from '../email/email.service';

import { EMAIL_QUEUE } from './queues.constants';

interface EmailJob {
  to: string;

  subject: string;

  html: string;
}

@Processor(EMAIL_QUEUE)
export class EmailProcessor {
  constructor(private readonly emailService: EmailService) {}

  async process(job: Job<EmailJob>) {
    await this.emailService.sendEmail({
      to: job.data.to,

      subject: job.data.subject,

      html: job.data.html,
    });
  }
}
