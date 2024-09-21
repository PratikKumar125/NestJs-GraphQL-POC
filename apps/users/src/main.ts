import { RestServer } from '@libs/boat';
import { UsersModule } from './users.module';

RestServer.make(UsersModule, {
  port: +process.env.APP_PORT,
  addValidationContainer: true,
});
