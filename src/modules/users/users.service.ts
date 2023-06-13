import { Injectable } from '@nestjs/common';

import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  async  create(data: UserDto) {
    return `This action returns all users`;
  }
  async  findAll() {
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
  async findByEmail(email: string) {
    return `This action returns a  email #${email} user`;
  }
  async updateById(id: number, updateUserDto: UserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }

}
