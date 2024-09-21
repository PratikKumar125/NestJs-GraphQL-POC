import { Injectable } from '@nestjs/common';
import { IUserPollRepoContract } from './contract';
import { DatabaseRepository, InjectModel } from '@squareboat/nestjs-objection';
import { UserPollModel } from '@libs/user/models';

@Injectable()
export class UserPollRepository
  extends DatabaseRepository<UserPollModel>
  implements IUserPollRepoContract
{
  @InjectModel(UserPollModel)
  model: UserPollModel;
  constructor() {
    super();
  }
}
