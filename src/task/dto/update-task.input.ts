import { Field, ID, InputType } from '@nestjs/graphql';
import { TaskStatus } from '../enums/task-status';

@InputType()
export class UpdateTaskInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => TaskStatus)
  status: TaskStatus;
}
