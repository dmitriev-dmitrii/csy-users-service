import { UserDto } from "../../users/dto/user.dto";
import { IntersectionType, PickType,OmitType } from "@nestjs/mapped-types";

export class UserLoginDto extends PickType(UserDto, ['email',"password"] as const) {

}

// export class UserRegistrationDto extends IntersectionType(
  // PickType(UserDto, ["password"] as const),
  // OmitType(UserDto, ["login"] as const)
// ) {
//
// }
