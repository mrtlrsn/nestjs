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
    return this.taskService.findAll();
  }

  @Query(() => Task)
  getTask(@Args('id', { type: () => String }) id: string): Task | undefined {
    return this.taskService.findOne(id);
  }

  @Mutation(() => Task)
  createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput): Task {
    return this.taskService.create(createTaskInput);
  }

  @Mutation(() => Task)
  updateTask(
    @Args('id', { type: () => String }) id: string,
    @Args('updateTaskInput') updateTaskInput: UpdateTaskInput,
  ): Task {
    return this.taskService.update(id, updateTaskInput);
  }

  @Mutation(() => Boolean)
  deleteTask(@Args('id', { type: () => String }) id: string): boolean {
    return this.taskService.remove(id);
  }
}
