import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { Task } from './models/task.model';
import { CreateTaskInput } from './dto/create-task.input';
import { TaskStatus } from './enums/task-status';
import { UpdateTaskInput } from './dto/update-task.input';

@Injectable()
export class TaskService {
  private tasks: Record<string, Task> = {};

  findAll(): Task[] {
    return Object.values(this.tasks);
  }

  findOne(id: string): Task | undefined {
    const task = this.tasks[id];

    return task;
  }

  create(createTaskInput: CreateTaskInput): Task {
    const task: Task = {
      id: randomUUID(),
      ...createTaskInput,
      status: createTaskInput.status || TaskStatus.TO_DO,
    };

    this.tasks[task.id] = task;

    return task;
  }

  update(id: string, updateTaskInput: UpdateTaskInput): Task {
    const task = this.findOne(id);

    const updatedTask = {
      ...task,
      ...updateTaskInput,
    };

    this.tasks[id] = updatedTask as Task;

    return updatedTask as Task;
  }

  remove(id: string): boolean {
    delete this.tasks[id];

    return true;
  }
}
