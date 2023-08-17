import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { UsersModule } from '@modules/users/users.module';

@Module({
  controllers: [AuthController],
  imports: [UsersModule],
  providers: [AuthService, UsersService],
})
export class AuthModule {}
