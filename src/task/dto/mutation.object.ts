import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MutationObject {
  @Field()
  status: string;
}
