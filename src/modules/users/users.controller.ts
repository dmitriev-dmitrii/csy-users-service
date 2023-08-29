import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import mongoose, { ObjectId } from 'mongoose';

@Controller('')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  index() {
    return this.usersService.index();
  }

  @Get(':userId')
  async find(@Param('userId') userId) {
    return this.usersService.findById(userId);
  }
  // @Get(':id')
  // findByName(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }
  // @Get(':id')
  // findByEmail(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() UserDto: UserDto) {
  //   return this.usersService.updateById(+id, UserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
