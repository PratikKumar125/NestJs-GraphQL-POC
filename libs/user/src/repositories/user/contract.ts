export interface IUserRepoContract {
  getUserById(id: any): Promise<Record<string, any>>;
}
