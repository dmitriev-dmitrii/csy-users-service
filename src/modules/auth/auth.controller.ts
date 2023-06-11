import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../users/dto/user.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post()
  create(@Body() UserDto: UserDto) {
    return this.AuthService.login(UserDto);
  }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

}
