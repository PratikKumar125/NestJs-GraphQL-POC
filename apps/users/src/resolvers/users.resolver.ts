import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UsersService } from '../users.service';
import { User } from '../entities/user.entity';
import { Poll } from '../entities/poll.entity';
import { CreateUserInput } from '../args';
import { UserModel } from '@libs/user/models';
import { Logger } from '@nestjs/common';

@Resolver(User)
export class UserResolver {
  private readonly logger = new Logger(UserResolver.name);

  constructor(private readonly userService: UsersService) {}
  @Query(() => User)
  // @RoleGuard(ROLES_ENUM.ADMIN) -> we can just like api's can use pipes, etc here also but need to convert execution context to graphql context
  async getUserInfo(
    @Args('id', { nullable: false, type: () => Int }) id: number,
  ) {
    const res = await this.userService.getUserbyId(id);
    return res;
  }

  @Mutation(() => User)
  async createUser(
    @Args('createUserInputs') createUserInputs: CreateUserInput,
  ): Promise<UserModel> {
    return await this.userService.createUser(createUserInputs);
  }

  @ResolveField('polls', (returns) => [Poll])
  async getPolls(@Parent() user: User) {
    return this.userService.getUserPolls(user?.id);
  }
}
