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
import { UserDto } from './dto/user.dto';

@Controller('')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.usersService.findById(id);
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
