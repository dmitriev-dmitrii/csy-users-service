import { IsEmail, IsNumber, IsString, Min, MinLength } from 'class-validator';

export class UserDto {
  @IsString()
  login: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(10)
  password: string;

  // @Transform(({ value }) => parseInt(value))
}
