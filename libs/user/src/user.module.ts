import { Module } from '@nestjs/common';
import { UserLibService } from './user.service';
import { UserLibConstants } from './constants';
import { UserPollRepository, UserRepository } from './repositories';
import { PollsRepository } from './repositories/polls/database';

@Module({
  providers: [
    UserLibService,
    {
      provide: UserLibConstants.USER_LIB_REPOSITORY,
      useClass: UserRepository,
    },
    {
      provide: UserLibConstants.POLL_LIB_REPOSITORY,
      useClass: PollsRepository,
    },
    {
      provide: UserLibConstants.USER_POLL_LIB_REPOSITORY,
      useClass: UserPollRepository,
    },
  ],
  exports: [UserLibService],
})
export class UserLibModule {}
