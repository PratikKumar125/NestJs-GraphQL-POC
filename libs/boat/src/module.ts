import { Global, Module, ValidationPipe } from '@nestjs/common';
import config from '@config/index';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE, DiscoveryModule } from '@nestjs/core';
import { BaseValidator, IsEqualToProp } from './validator';
import { ObjectionModule } from '@squareboat/nestjs-objection';
import { LocalizationModule } from '@squareboat/nestjs-localization';
import { EventModule } from '@squareboat/nest-events';
import { ConsoleModule } from '@squareboat/nest-console';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UserResolver } from 'apps/users/src/resolvers/users.resolver';

@Global()
@Module({
  imports: [
    DiscoveryModule,
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: config,
    }),
    ObjectionModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('db'),
      inject: [ConfigService],
    }),
    LocalizationModule.register({
      path: 'resources/lang',
      fallbackLang: 'en',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      installSubscriptionHandlers: true,
    }),
    EventModule,
    ConsoleModule,
  ],
  providers: [
    BaseValidator,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
  exports: [],
})
export class BoatModule {}
