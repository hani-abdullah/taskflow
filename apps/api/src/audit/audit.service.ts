import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuditService {
  constructor(private readonly prisma: PrismaService) {}

  log(params: {
    userId?: string;
    action: string;
    entity: string;
    entityId?: string;
    metadata?: Record<string, unknown>;
    ipAddress?: string;
    userAgent?: string;
  }) {
    return this.prisma.auditLog.create({
      data: {
        ...params,
        metadata: params.metadata as Prisma.InputJsonValue | undefined,
      },
    });
  }
}
