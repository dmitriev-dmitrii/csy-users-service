import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '@schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async index(): Promise<User[]> {
    return this.userModel.find();
  }

  async findById(userId: string | number): Promise<User | HttpException> {
    try {
      const res = await this.userModel.findById(userId);
      if (res) {
        return res;
      }
      throw '';
    } catch (err) {
      throw new NotFoundException();
    }
  }
  // async findByName(name: string) {
  //   return `This action returns a #${name} user`;
  // }
  // async findByLogin(login: string) {
  //   return `login : ${login}`;
  // }
  // async findByEmail(email: string): Promise<any> {
  //   return email;
  // }
  // async updateById(id: number, updateUserDto: UserDto) {
  //   return `This action updates a #${id} user`;
  // }
  //
  // async remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
