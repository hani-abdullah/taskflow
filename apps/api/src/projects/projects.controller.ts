import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { ProjectsService } from './projects.service';

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectAccessService } from './project-access.service';
import { AuditService } from '../audit/audit.service';
import { Req } from '@nestjs/common';
import type { Request } from 'express';
import { ApiBearerAuth, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { HttpCode, HttpStatus } from '@nestjs/common';

@Controller('projects')
@UseGuards(JwtAuthGuard)
@ApiTags('Projects')
@ApiBearerAuth('access-token')
@ApiUnauthorizedResponse({ description: 'Missing or invalid access token.' })
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly projectAccess: ProjectAccessService,
    private readonly auditService: AuditService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'List projects available to the current user' })
  @ApiOkResponse({ schema: { type: 'array', items: { type: 'object' }, example: [{ id: 'cm123project', name: 'Website launch', description: 'Marketing site launch', role: 'OWNER' }] } })
  findAll(@CurrentUser() user: { id: string }) {
    return this.projectsService.findAll(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a project' })
  @ApiParam({ name: 'id', example: 'cm123project' })
  @ApiOkResponse({ schema: { example: { id: 'cm123project', name: 'Website launch', description: 'Marketing site launch' } } })
  @ApiNotFoundResponse({ description: 'Project not found or inaccessible.' })
  async findOne(
    @CurrentUser() user: { id: string },
    @Param('id') projectId: string,
  ) {
    await this.projectAccess.assertMember(projectId, user.id);
    return this.projectsService.findOne(projectId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a project' })
  @ApiCreatedResponse({ schema: { example: { id: 'cm123project', name: 'Website launch', description: 'Plan and ship the new marketing website.' } } })
  create(@CurrentUser() user: { id: string }, @Body() dto: CreateProjectDto) {
    return this.projectsService.create(user.id, dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a project' })
  @ApiParam({ name: 'id', example: 'cm123project' })
  @ApiOkResponse({ schema: { example: { id: 'cm123project', name: 'Q4 website launch', description: 'Updated project scope and launch plan.' } } })
  @ApiNotFoundResponse({ description: 'Project not found or inaccessible.' })
  async update(
    @CurrentUser() user: { id: string },
    @Param('id') projectId: string,
    @Body() dto: UpdateProjectDto,
  ) {
    await this.projectAccess.assertOwner(projectId, user.id);
    return this.projectsService.update(projectId, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a project' })
  @ApiParam({ name: 'id', example: 'cm123project' })
  @ApiNoContentResponse({ description: 'Project deleted.' })
  @ApiNotFoundResponse({ description: 'Project not found or inaccessible.' })
  async remove(
    @CurrentUser() user: { id: string },
    @Param('id') projectId: string,
    @Req() request: Request,
  ) {
    const project = await this.projectAccess.assertOwner(projectId, user.id);
    const result = await this.projectsService.remove(projectId);
    await this.auditService.log({
      userId: user.id,
      action: 'DELETE',
      entity: 'Project',
      entityId: project.id,
      metadata: { projectName: project.name },
      ipAddress: request.ip,
      userAgent: request.headers['user-agent'],
    });
    return result;
  }
}
