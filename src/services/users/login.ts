
import { UserTokensInterface , UserTokensModel } from "../../models/users-tokens";
import { ObjectId } from "mongoose";
import UserDto from './dto/UserDto'
import {sign} from 'jsonwebtoken'
import {
  USER_TOKEN_ACCESS_EXPIRES_TIME,
  USER_TOKEN_ACCESS_KEY,
  USER_TOKEN_REFRESH_EXPIRES_TIME,
  USER_TOKEN_REFRESH_KEY
} from "../../config/env";

//
// type UserLoginPayload = Pick<UserDto , 'password'> & {login? : UserDto["login"] , email ? : UserDto["email"]  }
// export const  userLogin = async ( payload:UserLoginPayload ) => {
//   try {
//     const {login, email, password} = payload
//
//     let user = null
//
//     if (!password) {
//       return null
//     }
//
//
//     // if (user?.password === password) {
//     //   return user
//     // }
//
//   }
//   catch (err) {
//     return null
//   }
// }

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