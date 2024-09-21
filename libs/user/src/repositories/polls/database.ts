import { Injectable } from '@nestjs/common';
import { IPollRepoContract } from './contract';
import {
  DatabaseRepository,
  InjectModel,
  LoadRelSchema,
} from '@squareboat/nestjs-objection';
import { PollModel, UserPollModel } from '@libs/user/models';

@Injectable()
export class PollsRepository
  extends DatabaseRepository<PollModel>
  implements IPollRepoContract
{
  @InjectModel(PollModel)
  model: PollModel;
  constructor() {
    super();
  }

  async getAllPolls(inputs: {
    id: number;
    eager: LoadRelSchema;
  }): Promise<Record<string, any>> {
    const query = this.query();
    query.where({ poll_id: inputs?.id });
    query.withGraphJoined(inputs?.eager);
    return query.allPages();
  }
}
