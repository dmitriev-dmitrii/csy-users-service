import { ObjectId } from "mongoose";
import { UserModel } from "../../models/usersModel";
import {hashPassword} from "./utils/usersPasswordUtils";

export const  findUserById = async ( id:ObjectId | string)  => {
      return UserModel.findById(id);
}
export const  findUserByLogin = async ( login = '')  => {
  return UserModel.findOne({login});
}
export const  findUserByEmail = async ( email='')  => {
  return UserModel.findOne({ email });
}
export const  getUsersList =  async ( ) => {
  return  UserModel.find()
}

export const  createUser =  async ( {login='' ,email = "", password= ''}   ) => {

  const hashedPassword =  await hashPassword(password)

  return await UserModel.create({ password: hashedPassword, login, email })
}

export default {
  findUserByLogin,
  findUserById,
  findUserByEmail,
  getUsersList,
}