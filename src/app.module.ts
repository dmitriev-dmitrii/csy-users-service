import { Module } from '@nestjs/common';
import { UsersModule } from '@modules/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import dataBaseUrl from '@config/dataBaseUrl';
@Module({
  imports: [MongooseModule.forRoot(dataBaseUrl), UsersModule],
})
export class AppModule {}
