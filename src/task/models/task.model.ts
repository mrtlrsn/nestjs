import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Task {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  status: string;
}
