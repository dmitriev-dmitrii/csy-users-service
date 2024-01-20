import {
  generateUserAuthTokens,
  validateUserRefreshToken,
  deleteUserToken,
  compareUserPasswords
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
   generateUserAuthTokens,
   deleteUserToken,
 }

export default UserService