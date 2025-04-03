import { Field, ID, InputType } from '@nestjs/graphql';
import { TaskStatus } from '../enums/task-status';

@InputType()
export class UpdateTaskInput {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => TaskStatus)
  status: TaskStatus;
}
