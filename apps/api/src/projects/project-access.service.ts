import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectAccessService {
  constructor(private readonly prisma: PrismaService) {}

  async assertMember(projectId: string, userId: string) {
    const membership = await this.prisma.projectMember.findUnique({
      where: { projectId_userId: { projectId, userId } },
    });

    if (!membership) {
      throw new ForbiddenException('You do not have access to this project');
    }

    return membership;
  }

  async assertOwner(projectId: string, userId: string) {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) throw new NotFoundException('Project not found');

    if (project.userId !== userId) {
      throw new ForbiddenException(
        'Only the project owner can perform this action',
      );
    }

    return project;
  }
}
