import { Injectable } from '@nestjs/common';

import { UserDto } from './dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '@modules/users/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async createUser(payload: UserDto) {
    const email = { payload };
    // if () {
    //
    // }
    return email;
  }
  async findAll() {
    return `This action returns all users`;
  }
  async findById(id: number) {
    return `id  is ${typeof id}  ${id}`;
  }
  async findByName(name: string) {
    return `This action returns a #${name} user`;
  }
  async findByLogin(login: string) {
    return `login : ${login}`;
  }
  async findByEmail(email: string): Promise<any> {
    return email;
  }
  async updateById(id: number, updateUserDto: UserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
