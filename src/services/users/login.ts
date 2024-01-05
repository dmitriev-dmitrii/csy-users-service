
import { UserTokensInterface , UserTokensModel } from "../../models/users-tokens";
import { ObjectId } from "mongoose";
import UserDto from './dto/UserDto'
import {sign,verify} from 'jsonwebtoken'
import {
  USER_TOKEN_ACCESS_EXPIRES_TIME,
  USER_TOKEN_ACCESS_KEY,
  USER_TOKEN_REFRESH_EXPIRES_TIME,
  USER_TOKEN_REFRESH_KEY
} from "../../config/env";
import { findUserByEmail, findUserById, findUserByLogin } from "./users";
import { hashPassword,comparePasswords } from "./utils/usersPasswordUtils";



export const generateUserAccessTokens  = async (user:UserDto)=> {

  const {id,login,email} = user

  const accessToken =   sign({id,login,email}, USER_TOKEN_ACCESS_KEY, { expiresIn: USER_TOKEN_ACCESS_EXPIRES_TIME });

  const refreshToken =  sign({id,login,email}, USER_TOKEN_REFRESH_KEY, { expiresIn: USER_TOKEN_REFRESH_EXPIRES_TIME });

  await saveUserToken(id,refreshToken)

  return {
    accessToken,
    refreshToken
  }
}

export const saveUserToken  = async (userId: ObjectId,refreshToken:string)=> {

  const tokenData : UserTokensInterface | null = await UserTokensModel.findOne({userId})

  if (tokenData) {
    tokenData.refreshToken = refreshToken
    return UserTokensModel.updateOne(tokenData);
  }

  const tokens = await UserTokensModel.create({ userId,refreshToken })
  return  tokens.toObject()
}

export const  userLogin = async ( {login = '', email = '', password = ''} ) => {

    let user = login ? await findUserByLogin(login) : await findUserByEmail(email)

    const isEqualPasswords = await comparePasswords(password  ,user?.password)

    if (isEqualPasswords) {
      return user
    }

    return null

}
export const userLogout = async ( refreshToken='' ) => {

 return  UserTokensModel.deleteOne({refreshToken})
}

export const validateRefreshToken = async ( refreshToken='' ) => {

  if (!refreshToken) {
    return null
  }

  const tokenData = await UserTokensModel.findOne({refreshToken})
  const parsedUserData = verify(refreshToken, USER_TOKEN_REFRESH_KEY)

  if (!parsedUserData || !tokenData) {
    return null
  }

  // @ts-ignore
  const {id} = parsedUserData
  const {userId} = tokenData
  if (id !== userId) {
    return null
  }

  return  findUserById(userId);
}
