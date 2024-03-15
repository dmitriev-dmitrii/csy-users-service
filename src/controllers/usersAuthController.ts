import UserDto from "../services/users/dto/UserDto";

import { constants } from "http2";
import {  Request, Response ,NextFunction, } from "express";
import {
  USER_AUTH_ACCESS_TOKEN_COOKIE_KEY,
  USER_AUTH_COOKIES_CONFIG,
  USER_AUTH_REFRESH_TOKEN_COOKIE_KEY
} from "../constants/cookiesConfig";
import {
  createUser,
  findUserByEmail,
  findUserById,
  findUserByLogin,
  getUsersList
} from "../services/users/usersListService";
import {
  compareUserPasswords,
  deleteUserToken,
  generateUserAuthTokens,
  getUserTokensList,
  validateUserRefreshToken
} from "../services/users/usersAuthService";

export  const userRegistration = async (req : Request, res : Response, next :NextFunction)  => {

  try {
    const { body , fingerprint } = req
    const user = await  createUser(body)
    // TODO
    //  @ts-ignore
    const tokens   =  await  generateUserAuthTokens(new UserDto(user),fingerprint)

    res.cookie(USER_AUTH_REFRESH_TOKEN_COOKIE_KEY,tokens.refreshToken,USER_AUTH_COOKIES_CONFIG)
    res.send(  {...new UserDto(user),tokens} )
  }
  catch (err) {
    res.status(constants.HTTP_STATUS_BAD_REQUEST)
    res.send( err )
  }

}

export  const userLogin = async ({body,fingerprint } : Request, res : Response, next :NextFunction) => {
  try {

    const { login = '', email = '', password = '' } = body

    if (!password) {
      res.sendStatus(constants.HTTP_STATUS_BAD_REQUEST)
      return
    }

    if (!login && !email) {
      res.sendStatus(constants.HTTP_STATUS_BAD_REQUEST)
      return
    }

    const user = login ? await   findUserByLogin(login) : await   findUserByEmail(email)

    if(!user){
      res.status(constants.HTTP_STATUS_UNAUTHORIZED).send('неверный логин или пароль')
      return
    }

    const isEqualPasswords = await   compareUserPasswords(password  ,user.password)

    if (!isEqualPasswords) {
          res.status(constants.HTTP_STATUS_UNAUTHORIZED).send('неверный логин или пароль')
    }
    // TODO
    //  @ts-ignore
    const tokens = await  generateUserAuthTokens(user,fingerprint)
    res.cookie(USER_AUTH_REFRESH_TOKEN_COOKIE_KEY, tokens.refreshToken, USER_AUTH_COOKIES_CONFIG)
    res.cookie(USER_AUTH_ACCESS_TOKEN_COOKIE_KEY,tokens.accessToken,{httpOnly:false})
    res.send({ ...new UserDto(user), tokens })

    // res.signedCookies
  } catch (e) {
    console.log(e);
    res.sendStatus(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
  }

}


export  const userLogout = async (req : Request, res : Response, next :NextFunction) => {
  try {
    const { cookies } = req

    const refreshToken = cookies[USER_AUTH_REFRESH_TOKEN_COOKIE_KEY]
    res.clearCookie( USER_AUTH_REFRESH_TOKEN_COOKIE_KEY )
    res.clearCookie( USER_AUTH_ACCESS_TOKEN_COOKIE_KEY )

    const result =   await  deleteUserToken(refreshToken)
    res.send(result)

  } catch (e) {
    console.log(e);
    res.sendStatus(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR);
  }

}


export  const updateUserAuthTokens =  async (req : Request, res : Response, next :NextFunction) => {
  try {
    const {cookies,fingerprint} = req
    const refreshToken = cookies[USER_AUTH_REFRESH_TOKEN_COOKIE_KEY]

    if(!refreshToken) {
      res.sendStatus(constants.HTTP_STATUS_UNAUTHORIZED)
      return
    }

   const decodedToken = await  validateUserRefreshToken(refreshToken)

    if (!decodedToken) {
      res.sendStatus(constants.HTTP_STATUS_UNAUTHORIZED)
      return
    }

    const{userId} = decodedToken

    const user = await  findUserById(userId)

    if (!user) {
      res.sendStatus(constants.HTTP_STATUS_UNAUTHORIZED)
      return
    }
    // TODO
    //  @ts-ignore
    const tokens = await  generateUserAuthTokens(new UserDto(user),fingerprint)

    res.cookie(USER_AUTH_REFRESH_TOKEN_COOKIE_KEY,tokens.refreshToken, USER_AUTH_COOKIES_CONFIG)
    res.cookie(USER_AUTH_ACCESS_TOKEN_COOKIE_KEY,tokens.accessToken) //TODO поставить время куки

    res.send( {...new UserDto(user),tokens}  )

  }catch (err) {
    console.log(err);
    res.sendStatus(constants.HTTP_STATUS_UNAUTHORIZED)
  }

}
export  const getUserSessions =  async (req : Request, res : Response, next :NextFunction) => {

    try {

      const { userId } = req.params

      res.send( await  getUserTokensList(userId) )

    } catch (err) {
      res.send( [] )
    }

}

export  const deleteAllUserSessions =  async (req : Request, res : Response, next :NextFunction) => {
  try {
    // const {cookies,fingerprint} = req
    // const refreshToken = cookies[USER_AUTH_REFRESH_TOKEN_COOKIE_KEY]

    // if (!user) {
    //   res.sendStatus(constants.HTTP_STATUS_FORBIDDEN)
    //   return
    // }
    //
    // res.send( {...new UserDto(user),tokens}  )

  }catch (err) {
    // console.log(err);
    // res.sendStatus(constants.HTTP_STATUS_UNAUTHORIZED)
  }

}

export default {
  getUserSessions,
  userRegistration,
  userLogin,
  userLogout,
  updateUserAuthTokens
}

