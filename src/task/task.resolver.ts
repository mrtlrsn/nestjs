import { Args, Mutation, Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { Task } from './models/task.model';
import { TaskService } from './task.service';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private taskService: TaskService) {}

  @Query(() => [Task])
  getAllTasks(): Task[] {
    return [];
  }

  @Query(() => Task)
  getTask(@Args('id', { type: () => String }) id: string): Task {
    return new Task();
  }

  @Mutation(() => Task)
  createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput): Task {
    return new Task();
  }

  @Mutation(() => Task)
  updateTask(@Args('updateTaskInput') updateTaskInput: UpdateTaskInput): Task {
    return new Task();
  }

  @Mutation(() => Boolean)
  deleteTask(@Args('id', { type: () => String }) id: string): boolean {
    return true;
  }
}
