import { Inject, Injectable } from '@nestjs/common';
import { UserLibConstants } from './constants';
import { UserRepository } from './repositories';
import { PollsRepository } from './repositories/polls/database';
import { UserPollRepository } from './repositories/user_polls/database';

@Injectable()
export class UserLibService {
  constructor(
    @Inject(UserLibConstants.USER_LIB_REPOSITORY)
    public readonly userRepo: UserRepository,
    @Inject(UserLibConstants.POLL_LIB_REPOSITORY)
    public readonly pollsRepo: PollsRepository,
    @Inject(UserLibConstants.USER_POLL_LIB_REPOSITORY)
    public readonly userPollRepo: UserPollRepository,
  ) {}
}
