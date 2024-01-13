import {
  generateUserAccessTokens,
  validateUserRefreshToken,
  deleteUserToken,
  compareUserPasswords
} from "./login";
import { createUser, findUserById, findUserByLogin, findUserByEmail, getUsersList } from "./users";

  // userLogin,


 const UserService  = {
   createUser,
    compareUserPasswords,
   findUserByLogin,
   findUserById,
   findUserByEmail,
   getUsersList,
   validateUserRefreshToken,
   generateUserAccessTokens,
   deleteUserToken,
 }

export default UserService