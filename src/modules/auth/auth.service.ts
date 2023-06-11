import { Injectable } from '@nestjs/common';
import { UserDto } from "../users/dto/user.dto";
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private UsersService: UsersService,
  ) {}
 async login(data: UserDto) {
   let user = {}

    if (data.login) {
       user = await this.UsersService.findByLogin(data.login)
    }

   if (data.email) {
     user = await this.UsersService.findByEmail(data.email)
   }

   const parseDataPassword = data.email
   // const parseUserPassword = user.password

    return 'login AuthService '+ user;
  }

}
