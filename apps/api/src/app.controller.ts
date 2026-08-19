import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiServiceUnavailableResponse, ApiTags } from '@nestjs/swagger';

import { PrismaService } from './prisma/prisma.service';

@Controller('health')
@ApiTags('Health')
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @ApiOperation({ summary: 'Check API and database health' })
  @ApiOkResponse({ description: 'The API and database are healthy.', schema: { example: { status: 'ok', database: 'connected' } } })
  @ApiServiceUnavailableResponse({ description: 'The database is unavailable.' })
  async health() {
    await this.prisma.$queryRaw`SELECT 1`;

    return {
      status: 'ok',
      database: 'connected',
    };
  }
}
