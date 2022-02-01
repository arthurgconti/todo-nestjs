import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Pipes: rodam sempre que o cliente faz uma requisição, estamos setando um pipe de validação pra todos os endpoints
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
