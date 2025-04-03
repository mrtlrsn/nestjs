import { Field, ObjectType } from '@nestjs/graphql';
import { TaskStatus } from '../enums/task-status';

@ObjectType()
export class Task {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => TaskStatus)
  status: TaskStatus;
}
