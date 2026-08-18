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

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(
    @CurrentUser() user: { id: string },
    @Query('projectId') projectId: string,
  ) {
    return this.tasksService.findAll(user.id, projectId);
  }

  @Get(':id')
  findOne(@CurrentUser() user: { id: string }, @Param('id') taskId: string) {
    return this.tasksService.findOne(user.id, taskId);
  }

  @Post()
  create(@CurrentUser() user: { id: string }, @Body() dto: CreateTaskDto) {
    return this.tasksService.create(user.id, dto);
  }

  @Patch(':id')
  update(
    @CurrentUser() user: { id: string },
    @Param('id') taskId: string,
    @Body() dto: UpdateTaskDto,
  ) {
    return this.tasksService.update(user.id, taskId, dto);
  }

  @Delete(':id')
  remove(@CurrentUser() user: { id: string }, @Param('id') taskId: string) {
    return this.tasksService.remove(user.id, taskId);
  }
}
