import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/** bootstraping */
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(cookieParser());
  const options = new DocumentBuilder()
      .setTitle('UDC microservice login')
      .setDescription('Abstracts the communication with keycloak and securely stores the refresh token on clients.')
      .setVersion('0.0.1')
      .addTag('udc')
      .addTag('login')
      .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
