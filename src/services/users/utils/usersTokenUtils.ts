import { JwtPayload, sign, verify } from "jsonwebtoken";
import {
  USER_TOKEN_ACCESS_EXPIRES_TIME,
  USER_TOKEN_ACCESS_KEY,
  USER_TOKEN_REFRESH_EXPIRES_TIME,
  USER_TOKEN_REFRESH_KEY
} from "../../../../config/env";
import UserDto from "../dto/UserDto";


export const buildAccessToken = (user:UserDto):string => {
  const {id,login,email} = user
  return  sign({id,login,email}, USER_TOKEN_ACCESS_KEY, { expiresIn: USER_TOKEN_ACCESS_EXPIRES_TIME });
}

export const buildRefreshToken =   (user:UserDto):string => {
  const {id,login,email} = user
  return sign({ id, login, email }, USER_TOKEN_REFRESH_KEY, { expiresIn: USER_TOKEN_REFRESH_EXPIRES_TIME });

}

export const verifyAccessToken = (accessToken = ''):JwtPayload | string => {
 return  verify(accessToken, USER_TOKEN_ACCESS_KEY)
}

export const verifyRefreshToken =  (refreshToken = ''):JwtPayload | string => {
  console.log(refreshToken);
  return  verify(refreshToken, USER_TOKEN_REFRESH_KEY)
}