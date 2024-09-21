import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { RestController } from '@libs/boat';

@Controller()
export class UsersController extends RestController {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  @Get()
  getHello(): string {
    return this.usersService.getHello();
  }
}
