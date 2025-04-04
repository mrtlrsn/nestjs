import { Field, ID, ObjectType } from '@nestjs/graphql';
import { TaskStatus } from '../enums/task-status';

@ObjectType()
export class Task {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  status: TaskStatus;
}
