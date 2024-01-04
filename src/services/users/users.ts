import { ObjectId } from "mongoose";
import { UserModel } from "../../models/users";
import hashPassword from "./utils/hashPassword";

export const  findUserById = async ( id:ObjectId | string)  => {
      return UserModel.findById(id);
}

export const  getUsersList =  async ( ) => {
  return  UserModel.find({})
}

export const  createUser =  async ( {login='' ,email = "", password= ''}   ) => {

  const hashedPassword =  await hashPassword(password)

  return await UserModel.create({ password: hashedPassword, login, email })
}

