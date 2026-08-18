import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

import nodemailer, { Transporter } from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';

@Injectable()
export class EmailService {
  private readonly transporter: Transporter<SMTPTransport.SentMessageInfo>;

  constructor(private readonly config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.config.get<string>('SMTP_HOST', 'localhost'),

      port: this.config.get<number>('SMTP_PORT', 1025),

      secure: this.config.get<boolean>('SMTP_SECURE', false),

      auth: this.config.get<string>('SMTP_USER')
        ? {
            user: this.config.get<string>('SMTP_USER'),

            pass: this.config.get<string>('SMTP_PASSWORD'),
          }
        : undefined,
    });
  }

  async sendEmail(params: {
    to: string;

    subject: string;

    html: string;
  }): Promise<SMTPTransport.SentMessageInfo> {
    return this.transporter.sendMail({
      from: this.config.get<string>('EMAIL_FROM', 'no-reply@example.com'),

      to: params.to,

      subject: params.subject,

      html: params.html,
    });
  }

  async sendWelcomeEmail(
    to: string,
    firstName?: string,
  ): Promise<SMTPTransport.SentMessageInfo> {
    const name = firstName || 'there';

    return this.sendEmail({
      to,

      subject: 'Welcome to our app',

      html: `
        <h1>Welcome, ${name}!</h1>

        <p>
          Your account has been
          successfully created.
        </p>

        <p>
          We're happy to have you
          with us.
        </p>
      `,
    });
  }

  async sendTaskAssignedEmail(params: {
    to: string;
    taskTitle: string;
    projectName?: string;
  }): Promise<SMTPTransport.SentMessageInfo> {
    return this.sendEmail({
      to: params.to,

      subject: `Task assigned: ${params.taskTitle}`,

      html: `
        <h1>New task assigned</h1>

        <p>
          You have been assigned:
        </p>

        <h2>
          ${params.taskTitle}
        </h2>

        ${params.projectName ? `<p>Project: ${params.projectName}</p>` : ''}

        <p>
          Open the application
          to view the task.
        </p>
      `,
    });
  }
}
