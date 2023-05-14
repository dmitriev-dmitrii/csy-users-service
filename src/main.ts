import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api/users/');
  await app.listen(4000);
  console.log('app listen: http://localhost:4000/api/users/');
}
bootstrap();
