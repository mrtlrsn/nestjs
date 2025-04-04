import { Injectable } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { Task } from './models/task.model';

const TOPICS = {
  TASK_UPDATED: 'TASK_UPDATED',
};

@Injectable()
export class TaskPubSub {
  pubsub: PubSub;
  constructor() {
    this.pubsub = new PubSub();
  }

  taskUpdated(task: Task) {
    this.pubsub.publish(TOPICS.TASK_UPDATED, { taskUpdated: task });
  }

  subscribeOnTaskUpdated() {
    return this.pubsub.asyncIterableIterator(TOPICS.TASK_UPDATED);
  }
}
