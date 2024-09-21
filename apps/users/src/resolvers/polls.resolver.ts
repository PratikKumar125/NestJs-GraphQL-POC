import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UsersService } from '../users.service';
import { Poll } from '../entities/poll.entity';
import { Votes } from '../entities/votes.entity';
import { PollModel } from '@libs/user/models';

@Resolver(Poll)
export class PollsResolver {
  constructor(private readonly userService: UsersService) {}
  @Mutation(() => Poll)
  async createPoll(
    @Args({ name: 'name', type: () => String }) name: string,
  ): Promise<Partial<PollModel>> {
    return await this.userService.createPoll({ name });
  }

  @ResolveField('votes', (returns) => [Votes])
  async getPollVotes(@Parent() poll: Poll) {
    return this.userService.getPollVotes(poll?.id);
  }
}
