import { Field, ObjectType } from '@nestjs/graphql';
import { Task } from '../models/task.model';

@ObjectType()
export class TaskMutationResponse {
  @Field()
  status: string;

  @Field({ nullable: true })
  task?: Task;
}
