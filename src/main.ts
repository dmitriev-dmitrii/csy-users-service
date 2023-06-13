import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const validationPipeConfig = {
  transform: true, // преобразовывает примитивы если может в params запроса /:id  '1' => 1
  // whitelist: true,
  // forbidNonWhitelisted: true,
  // disableErrorMessages: process.env.NODE_ENV === 'PRODUCTION' ? true : false,
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe( validationPipeConfig) );
  app.enableCors();
  app.setGlobalPrefix('api/users/');

  await app.listen(4000);
  console.log('app listen: http://localhost:4000/api/users/');
}
bootstrap();
