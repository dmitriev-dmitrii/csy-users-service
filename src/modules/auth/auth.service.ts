import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthRegistrationDto } from './dto/auth-registration.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async registration(payload: AuthRegistrationDto) {
    const isEmailAlreadyExists = await this.userModel.findOne({
      email: payload.email,
    });

    if (isEmailAlreadyExists !== null) {
      return new HttpException('email already exist', HttpStatus.BAD_REQUEST);
    }
    const a = new User(payload);
    console.log(a);
    return this.userModel.create(a);
  }

  login(payload) {
    return `This action returns all auth`;
  }

  logout(payload) {
    return `This action r`;
  }
}
