import { Module } from '@nestjs/common';
import { TaskResolver } from './task.resolver';
import { TaskService } from './task.service';
import { TaskPubSub } from './task.pubsub';

@Module({
  providers: [TaskResolver, TaskService, TaskPubSub],
})
export class TaskModule {}
