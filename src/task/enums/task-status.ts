import { registerEnumType } from '@nestjs/graphql';

export enum TaskStatus {
  TO_DO = 'TO_DO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

registerEnumType(TaskStatus, {
  name: 'TaskStatus',
  description: 'Available task statuses',
});
