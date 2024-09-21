import { Field, ObjectType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

@ObjectType()
export class UserPoll {
  @Field((type) => Number, { nullable: false })
  id: number;

  @Field((type) => Number, { nullable: false })
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  user_id: number;

  @Field((type) => Number, { nullable: false })
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  poll_id: number;
}
