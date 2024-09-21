import { BaseModel } from '@squareboat/nestjs-objection';

export class VotesModel extends BaseModel {
  static tableName = 'votes';
}
