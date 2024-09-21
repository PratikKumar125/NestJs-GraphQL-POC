import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Votes {
  @Field((type) => Int)
  id: number;

  @Field({nullable: true})
  user_id: number;

  @Field({ nullable: true })
  poll_id: number;
}
