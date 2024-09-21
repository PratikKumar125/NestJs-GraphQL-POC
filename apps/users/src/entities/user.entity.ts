import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Poll } from './poll.entity';

@ObjectType()
export class User {
  @Field((type) => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  age: number;

  @Field({ nullable: true })
  gender: string;

  @Field((type) => [Poll], { nullable: true })
  polls: Poll[];
}
