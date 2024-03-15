import {
  UserTokensInterface,
  UserTokensModel,
  UserTokensToSaveFields
} from "../../models/usersTokensModel";
import UserDto from "./dto/UserDto";
import { createUser } from "./usersListService";
import { comparePasswords } from "./utils/usersPasswordUtils";

import { buildAccessToken, buildRefreshToken, verifyAccessToken, verifyRefreshToken } from "./utils/usersTokenUtils";
import { FingerprintResult, } from "express-fingerprint";
import { FingerprintResultComponent } from "express-fingerprint/lib/types";


const MAX_USER_SESSIONS_COUNT = 5
// TODO сделать ограничение по количеству сессий

export const generateUserAuthTokens  = async (user:UserDto,fingerprint:FingerprintResult)=> {

  const {id:userId} = user
  const {hash:fingerprintHash,components} = fingerprint

  const { geoip:userGeo, useragent:userAgent } = components  as FingerprintResultComponent


  const accessToken = buildAccessToken(user)
  const refreshToken = buildRefreshToken({...user,...{fingerprintHash , userGeo ,userAgent }})

  await saveUserRefreshToken({userId, fingerprintHash ,userGeo ,userAgent , refreshToken} )

  return {
    accessToken,
    refreshToken
  }
}

export const saveUserRefreshToken  = async ( payload:UserTokensToSaveFields   )=> {

  const {userId, refreshToken, fingerprintHash} = payload
  const tokenData : UserTokensInterface | null = await UserTokensModel.findOne({fingerprintHash,userId})

  if (!tokenData) {
    await UserTokensModel.create(payload)
    return
  }
  await   UserTokensModel.updateOne({fingerprintHash , userId} , {refreshToken});
}

export const  compareUserPasswords = async (plaintPassword:string,hashedPassword:string)=> {
    return  comparePasswords(plaintPassword  ,hashedPassword)
}
export const deleteUserToken = async ( refreshToken='' ) => {

 return  UserTokensModel.deleteOne({refreshToken})
}

export const validateUserRefreshToken = async ( refreshToken='') => {
  // TODO
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
export const getUserTokensList = async ( userId = '' ) => {

  return  UserTokensModel.find({userId})
}
export default {
  createUser,
  compareUserPasswords,
  validateUserRefreshToken,
  validateUserAccessToken,
  generateUserAuthTokens,
  deleteUserToken,
  getUserTokensList,
}