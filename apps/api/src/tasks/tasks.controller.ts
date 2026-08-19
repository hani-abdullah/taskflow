import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { TasksService } from './tasks.service';

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { HttpCode, HttpStatus } from '@nestjs/common';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
@ApiTags('Tasks')
@ApiBearerAuth('access-token')
@ApiUnauthorizedResponse({ description: 'Missing or invalid access token.' })
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOperation({ summary: 'List tasks in a project' })
  @ApiQuery({ name: 'projectId', required: true, example: 'cm123project' })
  @ApiOkResponse({ schema: { type: 'array', items: { type: 'object' }, example: [{ id: 'cm123task', title: 'Review homepage copy', status: 'TODO', priority: 'HIGH', projectId: 'cm123project' }] } })
  findAll(
    @CurrentUser() user: { id: string },
    @Query('projectId') projectId: string,
  ) {
    return this.tasksService.findAll(user.id, projectId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task' })
  @ApiParam({ name: 'id', example: 'cm123task' })
  @ApiOkResponse({ schema: { example: { id: 'cm123task', title: 'Review homepage copy', status: 'TODO', priority: 'HIGH', projectId: 'cm123project' } } })
  @ApiNotFoundResponse({ description: 'Task not found or inaccessible.' })
  findOne(@CurrentUser() user: { id: string }, @Param('id') taskId: string) {
    return this.tasksService.findOne(user.id, taskId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a task' })
  @ApiCreatedResponse({ schema: { example: { id: 'cm123task', title: 'Review homepage copy', status: 'TODO', priority: 'HIGH', projectId: 'cm123project' } } })
  create(@CurrentUser() user: { id: string }, @Body() dto: CreateTaskDto) {
    return this.tasksService.create(user.id, dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a task' })
  @ApiParam({ name: 'id', example: 'cm123task' })
  @ApiOkResponse({ schema: { example: { id: 'cm123task', title: 'Approve homepage copy', status: 'IN_PROGRESS', priority: 'HIGH' } } })
  @ApiNotFoundResponse({ description: 'Task not found or inaccessible.' })
  update(
    @CurrentUser() user: { id: string },
    @Param('id') taskId: string,
    @Body() dto: UpdateTaskDto,
  ) {
    return this.tasksService.update(user.id, taskId, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a task' })
  @ApiParam({ name: 'id', example: 'cm123task' })
  @ApiNoContentResponse({ description: 'Task deleted.' })
  @ApiNotFoundResponse({ description: 'Task not found or inaccessible.' })
  remove(@CurrentUser() user: { id: string }, @Param('id') taskId: string) {
    return this.tasksService.remove(user.id, taskId);
  }
}
