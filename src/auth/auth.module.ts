import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { LoggerMiddleware } from '../core/middleware/logger.middleware';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {
  public configure(consumer: MiddlewareConsumer): void {
      consumer.apply(LoggerMiddleware).forRoutes({
        path: '*',
        method: RequestMethod.ALL,
      });
    }
}
