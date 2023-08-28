import { PartialType, PickType } from '@nestjs/mapped-types';
import { User } from '@schemas/user.schema';
//
export class AuthRegistrationDto extends PickType(User, [
  'email',
  'password',
]) {}
