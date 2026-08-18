import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { QueueService } from '../queues/queue.service';
import { NotificationType } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly queueService: QueueService,
  ) {}

  async findAll(userId: string, projectId: string) {
    await this.ensureProjectOwnership(userId, projectId);

    return this.prisma.task.findMany({
      where: {
        projectId,
      },
      include: {
        assignee: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(userId: string, taskId: string) {
    const task = await this.prisma.task.findFirst({
      where: {
        id: taskId,
        project: {
          userId,
        },
      },
      include: {
        assignee: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async create(userId: string, dto: CreateTaskDto) {
    await this.ensureProjectOwnership(userId, dto.projectId);

    const assignee = dto.assigneeId
      ? await this.ensureUserExists(dto.assigneeId)
      : null;

    const task = await this.prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description,
        projectId: dto.projectId,
        assigneeId: dto.assigneeId,
        status: dto.status,
        priority: dto.priority,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
      },
    });

    if (assignee) {
      await this.queueService.createNotification({
        userId: assignee.id,
        type: NotificationType.TASK_ASSIGNED,
        title: 'New task assigned',
        message: `You were assigned "${task.title}".`,
        metadata: {
          taskId: task.id,
          projectId: task.projectId,
        },
      });

      await this.queueService.sendEmail({
        to: assignee.email,
        subject: `Task assigned: ${task.title}`,
        html: `
          <h1>New task assigned</h1>
          <p>
            You were assigned:
            <strong>${task.title}</strong>
          </p>
        `,
      });
    }

    return task;
  }

  async update(userId: string, taskId: string, dto: UpdateTaskDto) {
    await this.findOne(userId, taskId);

    if (dto.assigneeId) {
      await this.ensureUserExists(dto.assigneeId);
    }

    return this.prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        ...dto,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
      },
    });
  }

  async remove(userId: string, taskId: string) {
    await this.findOne(userId, taskId);

    await this.prisma.task.delete({
      where: {
        id: taskId,
      },
    });

    return {
      success: true,
    };
  }

  private async ensureProjectOwnership(userId: string, projectId: string) {
    const project = await this.prisma.project.findFirst({
      where: {
        id: projectId,
        userId,
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  private async ensureUserExists(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('Assignee not found');
    }

    return user;
  }
}
