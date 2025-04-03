import { Field, InputType } from '@nestjs/graphql';
import { TaskStatus } from '../enums/task-status';

@InputType()
export class CreateTaskInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => TaskStatus, { defaultValue: TaskStatus.TO_DO })
  status: TaskStatus;
}
