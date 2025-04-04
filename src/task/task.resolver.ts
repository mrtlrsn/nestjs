import { Args, ID, Mutation, Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { Task } from './models/task.model';
import { TaskService } from './task.service';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { TaskMutationResponse } from './dto/task-mutation-response.object';

const taskMutationResponse = (
  task: Task | undefined,
  returnStatus: string,
): TaskMutationResponse => {
  if (task) {
    return {
      status: returnStatus,
      task,
    };
  }

  return {
    status: 'task not found',
  };
};

@Resolver(() => Task)
export class TaskResolver {
  constructor(private taskService: TaskService) {}

  @Query(() => [Task])
  getAllTasks(): Task[] {
    return this.taskService.findAll();
  }

  @Query(() => Task, { nullable: true })
  getTask(@Args('id', { type: () => ID }) id: string): Task | undefined {
    return this.taskService.findOne(id);
  }

  @Mutation(() => TaskMutationResponse)
  createTask(
    @Args('createTaskInput') createTaskInput: CreateTaskInput,
  ): TaskMutationResponse {
    const task = this.taskService.create(createTaskInput);

    return taskMutationResponse(task, 'created');
  }

  @Mutation(() => TaskMutationResponse)
  updateTask(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateTaskInput') updateTaskInput: UpdateTaskInput,
  ): TaskMutationResponse {
    const task = this.taskService.update(id, updateTaskInput);

    return taskMutationResponse(task, 'updated');
  }

  @Mutation(() => TaskMutationResponse)
  deleteTask(@Args('id', { type: () => ID }) id: string): TaskMutationResponse {
    const task = this.taskService.findOne(id);

    this.taskService.remove(id);

    return taskMutationResponse(task, 'deleted');
  }
}
