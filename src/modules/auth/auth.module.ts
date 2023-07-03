import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [AuthController],
  imports: [],
  providers: [AuthService, UsersService],
})
export class AuthModule {}
