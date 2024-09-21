import { Injectable } from '@nestjs/common';
import { IUserRepoContract } from './contract';
import {
  DatabaseRepository,
  InjectModel,
  LoadRelSchema,
  Pagination,
} from '@squareboat/nestjs-objection';
import { raw } from 'objection';
import { UserModel } from '@libs/user/models';

@Injectable()
export class UserRepository
  extends DatabaseRepository<UserModel>
  implements IUserRepoContract
{
  @InjectModel(UserModel)
  model: UserModel;
  constructor() {
    super();
  }
  async getUserById(id: any): Promise<Pagination<UserModel>> {
    const query = this.query();
    try {
      query.where({ id }).first();
      const result = query.allPages<UserModel>();
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async getUserPolls(inputs: {
    id: number;
    eager: LoadRelSchema;
  }): Promise<Pagination<Record<string, any>>> {
    const query = this.query();
    try {
      query.where('users.id', inputs?.id);
      query.withGraphFetched(inputs?.eager);
      const result = query.allPages();
      return result;
    } catch (err) {
      console.log(err);
    }
  }
}
