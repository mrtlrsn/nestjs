import { Args, ID, Mutation, Query, Subscription } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { Task } from './models/task.model';
import { TaskService } from './task.service';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { TaskMutationResponse } from './dto/task-mutation-response.object';
import { TaskStatus } from './enums/task-status';
import { TaskPubSub } from './task.pubsub';

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
  constructor(
    private taskService: TaskService,
    private taskPubsub: TaskPubSub,
  ) {}

  @Query(() => [Task])
  getAllTasks(
    @Args('filterByStatus', { type: () => TaskStatus, nullable: true })
    status?: TaskStatus,
  ): Task[] {
    return this.taskService.findAll(status);
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

    this.taskPubsub.taskUpdated(task);
    return taskMutationResponse(task, 'created');
  }

  @Mutation(() => TaskMutationResponse)
  updateTask(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateTaskInput') updateTaskInput: UpdateTaskInput,
  ): TaskMutationResponse {
    const task = this.taskService.update(id, updateTaskInput);

    if (task) {
      this.taskPubsub.taskUpdated(task);
    }

    return taskMutationResponse(task, 'updated');
  }

  @Mutation(() => TaskMutationResponse)
  deleteTask(@Args('id', { type: () => ID }) id: string): TaskMutationResponse {
    const task = this.taskService.findOne(id);

    this.taskService.remove(id);

    return taskMutationResponse(task, 'deleted');
  }

  @Subscription(() => Task)
  taskUpdated() {
    return this.taskPubsub.subscribeOnTaskUpdated();
  }
}
