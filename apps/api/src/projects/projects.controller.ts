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

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  findAll(@CurrentUser() user: { id: string }) {
    return this.projectsService.findAll(user.id);
  }

  @Get(':id')
  findOne(@CurrentUser() user: { id: string }, @Param('id') projectId: string) {
    return this.projectsService.findOne(user.id, projectId);
  }

  @Post()
  create(@CurrentUser() user: { id: string }, @Body() dto: CreateProjectDto) {
    return this.projectsService.create(user.id, dto);
  }

  @Patch(':id')
  update(
    @CurrentUser() user: { id: string },
    @Param('id') projectId: string,
    @Body() dto: UpdateProjectDto,
  ) {
    return this.projectsService.update(user.id, projectId, dto);
  }

  @Delete(':id')
  remove(@CurrentUser() user: { id: string }, @Param('id') projectId: string) {
    return this.projectsService.remove(user.id, projectId);
  }
}
