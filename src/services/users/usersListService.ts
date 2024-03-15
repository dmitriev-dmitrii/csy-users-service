import { ObjectId } from "mongoose";
import { UserModel, UserRequiredToSaveFields } from "../../models/usersModel";

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

export const  createUser =  async ( payload:UserRequiredToSaveFields ) => {

  return await UserModel.create(payload)
}

export default {
  findUserByLogin,
  findUserById,
  findUserByEmail,
  getUsersList,
}