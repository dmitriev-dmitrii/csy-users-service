import { generateUserAccessTokens, validateRefreshToken, userLogin, userLogout } from "./login";
import { createUser, findUserById, findUserByLogin, getUsersList } from "./users";

 const UserService  = {

   userLogin,
   userLogout,
   validateRefreshToken,
   findUserByLogin,
   createUser,
   getUsersList,
   findUserById,
   generateUserAccessTokens,
 }

export default UserService