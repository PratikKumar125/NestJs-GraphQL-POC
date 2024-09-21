import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { BoatModule } from '@libs/boat';
import { UserLibModule } from '@libs/user';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UserResolver } from './resolvers/users.resolver';
import { PollsResolver } from './resolvers/polls.resolver';
import { UserPollResolver } from './resolvers/userPoll.resolver';

@Module({
  imports: [
    BoatModule,
    UserLibModule,
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    //   sortSchema: true,
    //   installSubscriptionHandlers: true,
    // }),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserResolver, PollsResolver, UserPollResolver],
})
export class UsersModule {}
