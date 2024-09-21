import { JoinRelatedOptions } from 'objection';

export interface IPollRepoContract {
  getAllPolls(inputs: {
    id: number;
    eager: JoinRelatedOptions;
  }): Promise<Record<string, any>>;
}
