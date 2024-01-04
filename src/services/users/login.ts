
import { UserInterface } from "../../models/users";
import { UserTokensInterface , UserTokensModel } from "../../models/users-tokens";
import { ObjectId } from "mongoose";

import {sign} from 'jsonwebtoken'
import {
  USER_TOKEN_ACCESS_EXPIRES_TIME,
  USER_TOKEN_ACCESS_KEY,
  USER_TOKEN_REFRESH_EXPIRES_TIME,
  USER_TOKEN_REFRESH_KEY
} from "../../config/env";


type UserLoginPayload = Pick<UserInterface , 'password'> & {login? : UserInterface["login"] , email ? : UserInterface["email"]  }
export const  userLogin = async ( payload:UserLoginPayload ) => {
  try {
    const {login, email, password} = payload

    let user = null

    if (!password) {
      return user
    }


    // if (user?.password === password) {
    //   return user
    // }

  }
  catch (err) {
    return null
  }
}

export const generateUserAccessTokens  = async (user:UserInterface)=> {

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

  return  UserTokensModel.create({ userId,refreshToken })

}