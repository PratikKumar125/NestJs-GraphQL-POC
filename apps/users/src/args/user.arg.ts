import { IsEqualToProp } from '@libs/boat/validator';
import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsEmail, IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field({ nullable: false })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field({ nullable: false })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  // @IsEqualToProp('name', {
  //   message: 'name and email must match',
  // })
  email: string;

  @Field({ nullable: false })
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  age: number;

  @Field({ nullable: false })
  @IsNotEmpty()
  @IsString()
  @IsIn(['MALE', 'FEMALE'])
  gender: string;
}
