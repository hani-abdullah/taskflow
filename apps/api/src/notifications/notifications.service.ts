import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { NotificationType, Prisma } from '@prisma/client';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(params: {
    userId: string;

    type: NotificationType;

    title: string;

    message: string;

    metadata?: Prisma.InputJsonValue;
  }) {
    return this.prisma.notification.create({
      data: {
        userId: params.userId,

        type: params.type,

        title: params.title,

        message: params.message,

        metadata: params.metadata,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.notification.findMany({
      where: {
        userId,
      },

      orderBy: {
        createdAt: 'desc',
      },

      take: 50,
    });
  }

  async findUnread(userId: string) {
    return this.prisma.notification.findMany({
      where: {
        userId,

        readAt: null,
      },

      orderBy: {
        createdAt: 'desc',
      },

      take: 50,
    });
  }

  async unreadCount(userId: string) {
    return this.prisma.notification.count({
      where: {
        userId,

        readAt: null,
      },
    });
  }

  async markAsRead(userId: string, id: string) {
    const notification = await this.prisma.notification.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    return this.prisma.notification.update({
      where: {
        id,
      },

      data: {
        readAt: new Date(),
      },
    });
  }

  async markAllAsRead(userId: string) {
    await this.prisma.notification.updateMany({
      where: {
        userId,

        readAt: null,
      },

      data: {
        readAt: new Date(),
      },
    });

    return {
      success: true,
    };
  }
}
