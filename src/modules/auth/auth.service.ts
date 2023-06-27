import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserDto } from "../users/dto/user.dto";
import { UsersService } from '../users/users.service';
import { UserLoginDto } from "./dto/user-login.dto";
import { IsNumber } from "class-validator";

@Injectable()
export class AuthService {
  constructor(
    private UsersService: UsersService,

  ) {}

  async login(data: UserLoginDto) {

   const user = await this.UsersService.findByEmail(data.email)

    console.log(user);

    // const parseDataPassword = data.email
    // const parseUserPassword = user.password


    if (user?.password !== data.password) {
      // throw new UnauthorizedException();
    }

    return  user;
  }
 async registration(data: UserDto) {
   let user = {}

   if (data.email) {
     user = await this.UsersService.findByEmail(data.email)
   }




   // const parseUserPassword = user.password

    return  user;
  }

}
