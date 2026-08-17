import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findAll(userId: string) {
    return this.prisma.project.findMany({
      where: {
        userId,
      },
      include: {
        _count: {
          select: {
            tasks: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(
    userId: string,
    projectId: string,
  ) {
    const project =
      await this.prisma.project.findFirst({
        where: {
          id: projectId,
          userId,
        },
        include: {
          tasks: {
            orderBy: {
              createdAt: 'desc',
            },
          },
        },
      });

    if (!project) {
      throw new NotFoundException(
        'Project not found',
      );
    }

    return project;
  }

  async create(
    userId: string,
    dto: CreateProjectDto,
  ) {
    return this.prisma.project.create({
      data: {
        name: dto.name,
        description: dto.description,
        userId,
      },
    });
  }

  async update(
    userId: string,
    projectId: string,
    dto: UpdateProjectDto,
  ) {
    const project =
      await this.prisma.project.findFirst({
        where: {
          id: projectId,
          userId,
        },
      });

    if (!project) {
      throw new NotFoundException(
        'Project not found',
      );
    }

    return this.prisma.project.update({
      where: {
        id: projectId,
      },
      data: dto,
    });
  }

  async remove(
    userId: string,
    projectId: string,
  ) {
    const project =
      await this.prisma.project.findFirst({
        where: {
          id: projectId,
          userId,
        },
      });

    if (!project) {
      throw new NotFoundException(
        'Project not found',
      );
    }

    await this.prisma.project.delete({
      where: {
        id: projectId,
      },
    });

    return {
      success: true,
    };
  }
}