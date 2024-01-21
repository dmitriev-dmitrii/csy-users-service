import { USER_TOKEN_REFRESH_EXPIRES_TIME } from "../../config/env";

export const USER_AUTH_REFRESH_TOKEN_COOKIE_KEY = 'csy-refresh'
export const USER_AUTH_ACCESS_TOKEN_HEADER = 'csy-auth'

export const USER_AUTH_COOKIES_CONFIG =
  {
  maxAge: USER_TOKEN_REFRESH_EXPIRES_TIME ,
  httpOnly:true,
  }