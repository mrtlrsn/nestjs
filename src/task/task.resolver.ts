import { Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { Task } from './models/task.model';
import { TaskService } from './task.service';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private taskService: TaskService) {}

  @Query(() => [Task])
  getAllTasks(): Task[] {
    return [];
  }
}
