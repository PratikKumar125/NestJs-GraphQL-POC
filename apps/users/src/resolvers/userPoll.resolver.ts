import { Args, Float, Mutation, Resolver } from '@nestjs/graphql';
import { UserPoll } from '../entities/user_poll.entity';
import { UserPollModel } from '@libs/user/models';
import { UsersService } from '../users.service';

@Resolver(UserPoll)
export class UserPollResolver {
  constructor(private readonly userService: UsersService) {}
  @Mutation(() => UserPoll)
  async enrollToPoll(
    @Args({ name: 'userId', type: () => Float }) userId: number,
    @Args({ name: 'pollId', type: () => Float }) pollId: number,
  ): Promise<Partial<UserPollModel>> {
    return this.userService.enrollUserToPoll({
      user_id: userId,
      poll_id: pollId,
    });
  }
}
