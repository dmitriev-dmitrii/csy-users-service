import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { AuthModule } from '@modules/auth/auth.module';
import { UsersModule } from '@modules/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import dataBaseUrl from '@config/dataBaseUrl';
@Module({
  imports: [MongooseModule.forRoot(dataBaseUrl), AuthModule, UsersModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
