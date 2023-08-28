import { Injectable } from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegistrationDto } from './dto/auth-registration.dto';

@Injectable()
export class AuthService {
  registration(payload) {
    return 'This action adds a new auth';
  }

  login(payload) {
    return `This action returns all auth`;
  }

  logout(payload) {
    return `This action r`;
  }
}
