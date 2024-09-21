import { BaseModel } from '@squareboat/nestjs-objection';

export class UserPollModel extends BaseModel {
  static tableName = 'user_poll';
}
