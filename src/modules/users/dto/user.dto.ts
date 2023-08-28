import { IsEmail, IsNumber, IsString, Min, MinLength } from 'class-validator';

export class UserDto {
  @IsString()
  login: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  // @Transform(({ value }) => parseInt(value))
}
