import { Injectable } from '@nestjs/common';
import { AuthRegistrationDto } from './dto/auth-registration.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async registration(payload: AuthRegistrationDto) {
    // const isEmailExists = await this.userModel.findOne({
    //   email: payload.email,
    // });
    //
    // if (isEmailExists) {
    //   return;
    // }

    return this.userModel.create(payload);
  }

  login(payload) {
    return `This action returns all auth`;
  }

  logout(payload) {
    return `This action r`;
  }
}
