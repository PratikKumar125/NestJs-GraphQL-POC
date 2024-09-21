import { BaseModel } from '@squareboat/nestjs-objection';
import { VotesModel } from './votes.model';

export class PollModel extends BaseModel {
  static tableName = 'polls';

  static get relationMappings() {
    return {
      vote: {
        relation: BaseModel.HasManyRelation,
        modelClass: VotesModel,
        join: {
          from: 'polls.id',
          to: 'votes.poll_id',
        },
      },
    };
  }
}
