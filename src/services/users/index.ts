import { generateUserAccessTokens } from "./login";
import { createUser, findUserById, getUsersList } from "./users";

 const UserService  = {
   createUser,
   getUsersList,
   findUserById,
   generateUserAccessTokens,
 }

export default UserService