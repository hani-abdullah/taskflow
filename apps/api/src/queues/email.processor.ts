import { Processor, WorkerHost } from '@nestjs/bullmq';

import { Job } from 'bullmq';

import { EmailService } from '../email/email.service';

import { EMAIL_QUEUE } from './queues.constants';

interface EmailJob {
  to: string;

  subject: string;

  html: string;
}

@Processor(EMAIL_QUEUE)
export class EmailProcessor extends WorkerHost {
  constructor(private readonly emailService: EmailService) {
    super();
  }

  async process(job: Job<EmailJob>) {
    await this.emailService.sendEmail({
      to: job.data.to,

      subject: job.data.subject,

      html: job.data.html,
    });
  }
}
