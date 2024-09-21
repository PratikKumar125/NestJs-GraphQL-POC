import { UserLibService } from '@libs/user';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(private readonly userLibSerice: UserLibService) {}
  getHello(): string {
    return 'Hello World!';
  }

  async createUser(inputs: Record<string, any>) {
    return await this.userLibSerice.userRepo.create(inputs);
  }

  async getUserbyId(id: number) {
    const res = await this.userLibSerice.userRepo.getUserById(id);
    return res?.data;
  }

  async getUserPolls(id: number) {
    try {
      const userPolls = await this.userLibSerice.userRepo.getUserPolls({
        id,
        eager: { polls: { vote: true } },
      });

      return userPolls?.data?.[0]?.polls;
    } catch (error) {
      console.log(error);
    }
  }

  async enrollUserToPoll(inputs: Record<string, any>) {
    const { userId, pollId } = inputs;
    return await this.userLibSerice.userPollRepo.create(inputs);
  }

  async createPoll(inputs: Record<string, any>) {
    return await this.userLibSerice.pollsRepo.create(inputs);
  }

  async getPollVotes(pollId: number) {
    const res = await this.userLibSerice.pollsRepo.getAllPolls({
      id: pollId,
      eager: { vote: true },
    });
    return res?.data;
  }
}
