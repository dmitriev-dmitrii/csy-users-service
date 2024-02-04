import { UserTokensInterface, UserTokensModel } from "../../models/users-tokens";
import { ObjectId } from "mongoose";
import UserDto from "./dto/UserDto";
import { findUserById } from "./users";
import { comparePasswords } from "./utils/usersPasswordUtils";

import { buildAccessToken, buildRefreshToken, verifyAccessToken, verifyRefreshToken } from "./utils/usersTokenUtils";


export const generateUserAuthTokens  = async (user:UserDto,fingerprint:any)=> {

  const {id} = user
  const { hash  } = fingerprint

  const accessToken = buildAccessToken(user)
  const refreshToken = buildRefreshToken({...user,...{fingerprintHash:hash}})


  await saveUserRefreshToken({userId:id, fingerprintHash :hash, refreshToken})

  return {
    accessToken,
    refreshToken
  }
}

export const saveUserRefreshToken  = async (payload : {userId: ObjectId, refreshToken:string, fingerprintHash:string})=> {
  const {userId, refreshToken, fingerprintHash} = payload
  const tokenData : UserTokensInterface | null = await UserTokensModel.findOne({fingerprintHash})

  if (!tokenData) {
    await UserTokensModel.create({ userId, refreshToken , fingerprintHash })
    return
  }
  await   UserTokensModel.updateOne({fingerprintHash , userId} , {refreshToken});
}

export const  compareUserPasswords = async (plaintPassword:string,hashedPassword:string)=>{
    return  comparePasswords(plaintPassword  ,hashedPassword)
}
export const deleteUserToken = async ( refreshToken='' ) => {

 return  UserTokensModel.deleteOne({refreshToken})
}

export const validateUserRefreshToken = async ( refreshToken='') => {

  // @ts-ignore
  const {fingerprintHash}  = verifyRefreshToken(refreshToken)
  // выбрасывает ошибку если токен протух
  return  UserTokensModel.findOne({refreshToken,fingerprintHash})

}
export const validateUserAccessToken = async (accessToken='') => {
  try {

    if (!accessToken) {
      return false
    }

     verifyAccessToken(accessToken)
    // выбрасывает ошибку если токен протух
      return  true
  } catch (err) {
    // console.log('validateUserAccessToken err',err);
      return false;
  }
}
