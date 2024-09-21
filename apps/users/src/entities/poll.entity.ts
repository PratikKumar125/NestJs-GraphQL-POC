import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Votes } from './votes.entity';

@ObjectType()
export class Poll {
  @Field((type) => Int)
  id: number;

  @Field()
  name: string;

  @Field((type) => [Votes], { nullable: true })
  votes: [Votes];
}
