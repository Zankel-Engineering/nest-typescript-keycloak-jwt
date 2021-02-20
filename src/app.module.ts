import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { TerminusOptionsService } from './config/terminus-options.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TerminusModule.forRootAsync({
      useFactory: () => ({
        disableDeprecationWarnings: true,
        endpoints: [
          // ...
        ],
      }),
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
