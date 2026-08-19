import { Module } from '@nestjs/common';

import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { QueuesModule } from '../queues/queues.module';
import { ProjectsModule } from '../projects/projects.module';

@Module({
  imports: [QueuesModule, ProjectsModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
