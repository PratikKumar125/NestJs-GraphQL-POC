import { BaseModel } from '@squareboat/nestjs-objection';
import { PollModel } from './polls.model';

export class UserModel extends BaseModel {
  static tableName = 'users';

  static get relationMappings() {
    return {
      polls: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: PollModel,
        join: {
          from: 'users.id',
          through: {
            from: 'user_poll.user_id',
            to: 'user_poll.poll_id',
          },
          to: 'polls.id',
        },
      },
    };
  }
}
