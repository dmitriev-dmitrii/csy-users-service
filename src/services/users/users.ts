import {ObjectId} from "mongoose";
import { UserInterface, UserModel } from "../../models/users";
import hashPassword from "./utils/hashPassword";
import { generateUserAccessTokens } from "./login";

export const  findUserById = async ( id:ObjectId | string)  => {
    try {
        return   await UserModel.findById(id);
    }
    catch (err) {
       return null
   }
}

export const  getUsersList =  async ( ) => {
  return UserModel.find({});
}

type UserCandidate = Pick<UserInterface , 'login'| 'email' | 'password'>
export const  createUser =  async ( payload:UserCandidate   ) => {

    const password = await hashPassword(payload.password)

    const user =   await UserModel.create( {...payload, ...{password} } )

    const tokens   =   await generateUserAccessTokens(user)

    return { ...user,... tokens}
}

