import { Injectable } from '@nestjs/common';
import { UserDto } from '../users/dto/user.dto';
import { UsersService } from '../users/users.service';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegistrationCandidateDto } from './dto/user-registration-candidate.dto';

@Injectable()
export class AuthService {
  constructor(private UsersService: UsersService) {}

  async login(payload: UserLoginDto) {
    const user = await this.UsersService.findByEmail(payload.email);

    console.log(user);

    // const parsepayloadPassword = payload.email
    // const parseUserPassword = user.password

    if (user?.password !== payload.password) {
      // throw new UnauthorizedException();
    }

    return user;
  }
  async registration(payload: UserRegistrationCandidateDto) {
    let user = {};

    if (payload.email) {
      user = await this.UsersService.findByEmail(payload.email);
    }

    // const parseUserPassword = user.password

    return user;
  }
  async changePassword(payload: UserRegistrationCandidateDto) {
    const user = {};
    //
    // if (payload.email) {
    //   user = await this.UsersService.findByEmail(payload.email);
    // }

    // const parseUserPassword = user.password

    return user;
  }
}
