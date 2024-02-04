import {
  generateUserAuthTokens,
  validateUserRefreshToken,
  deleteUserToken,
  compareUserPasswords,
  validateUserAccessToken
} from "./auth";
import { createUser, findUserById, findUserByLogin, findUserByEmail, getUsersList } from "./users";


 const UserService  = {
   createUser,
   compareUserPasswords,
   findUserByLogin,
   findUserById,
   findUserByEmail,
   getUsersList,
   validateUserRefreshToken,
   validateUserAccessToken,
   generateUserAuthTokens,
   deleteUserToken,
 }

export default UserService