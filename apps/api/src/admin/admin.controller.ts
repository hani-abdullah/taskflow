import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Admin')
@ApiBearerAuth('access-token')
@ApiUnauthorizedResponse({ description: 'Missing or invalid access token.' })
@ApiForbiddenResponse({ description: 'Administrator role required.' })
export class AdminController {
  @Get('health')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Check the protected admin area' })
  @ApiOkResponse({ schema: { example: { success: true, area: 'admin' } } })
  health() {
    return { success: true, area: 'admin' };
  }
}
