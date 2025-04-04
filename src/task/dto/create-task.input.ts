import { Field, InputType } from '@nestjs/graphql';
import { TaskStatus } from '../enums/task-status';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateTaskInput {
  @Field()
  title: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => TaskStatus, { defaultValue: TaskStatus.TO_DO })
  status: TaskStatus;
}
