import { Module } from '@nestjs/common';

import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { QueuesModule } from '../queues/queues.module';

@Module({
  imports: [QueuesModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
