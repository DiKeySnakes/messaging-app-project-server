import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan('tiny'));
  app.useGlobalPipes(new ValidationPipe({ disableErrorMessages: true }));
  await app.listen(process.env.PORT);
}
bootstrap().then(() =>
  console.log('👍 Serer is listening on port: ', process.env.PORT),
);
