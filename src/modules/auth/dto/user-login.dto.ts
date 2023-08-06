import { UserDto } from '@modules/users/dto/user.dto';
import { IntersectionType, PickType, OmitType } from '@nestjs/mapped-types';

export class UserLoginDto extends PickType(UserDto, [
  'login',
  'email',
  'password',
] as const) {}

// export class UserRegistrationDto extends IntersectionType(
// PickType(UserDto, ["password"] as const),
// OmitType(UserDto, ["login"] as const)
// ) {
//
// }
