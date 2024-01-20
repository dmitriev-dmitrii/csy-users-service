import { UserTokensInterface, UserTokensModel } from "../../models/users-tokens";
import { ObjectId } from "mongoose";
import UserDto from "./dto/UserDto";
import { findUserById } from "./users";
import { comparePasswords } from "./utils/usersPasswordUtils";

import { buildAccessToken, buildRefreshToken, verifyAccessToken, verifyRefreshToken } from "./utils/usersTokenUtils";


export const generateUserAuthTokens  = async (user:UserDto)=> {

  const {id} = user

  const accessToken = await  buildAccessToken(user)
  const refreshToken = await buildRefreshToken(user)

  await saveUserRefreshToken(id,refreshToken)

  return {
    accessToken,
    refreshToken
  }
}

export const saveUserRefreshToken  = async (userId: ObjectId,refreshToken:string)=> {

  const tokenData : UserTokensInterface | null = await UserTokensModel.findOne({userId})

  if (!tokenData) {
    await UserTokensModel.create({ userId, refreshToken })
    return
  }
  await   UserTokensModel.updateOne({userId} , {refreshToken});
}

export const  compareUserPasswords = async (plaintPassword:string,hashedPassword:string)=>{
    return  comparePasswords(plaintPassword  ,hashedPassword)
}
export const deleteUserToken = async ( refreshToken='' ) => {

 return  UserTokensModel.deleteOne({refreshToken})
}

export const validateUserRefreshToken = async ( refreshToken='' ) => {

  if (!refreshToken) {
    return null
  }

  const tokenData = await UserTokensModel.findOne({refreshToken})
  const parsedUserData = verifyRefreshToken(refreshToken)

  if (!parsedUserData || !tokenData) {
    return null
  }
// TODO разобраться с ts-ignore
  // @ts-ignore
  const {id} = parsedUserData
  const {userId} = tokenData
  if (id !== userId) {
    return null
  }

  return  findUserById(userId);
}
export const validateAccessToken = async (accessToken='') => {
  try {

    if (!accessToken) {
      return null
    }

    const parsedUserData =  verifyAccessToken(accessToken)

    if (!parsedUserData) {
      return null
    }
    // TODO разобраться с ts-ignore
    // @ts-ignore
    const {id} = parsedUserData

    return  findUserById(id);
  } catch (e) {
    return null;
  }
}
