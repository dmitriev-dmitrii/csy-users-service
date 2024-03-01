import UserDto from "../services/users/dto/UserDto";
import UserService from "../services/users";
import { constants } from "http2";
import {  Request, Response ,NextFunction, } from "express";
import {
  USER_AUTH_ACCESS_TOKEN_COOKIE_KEY,
  USER_AUTH_COOKIES_CONFIG,
  USER_AUTH_REFRESH_TOKEN_COOKIE_KEY
} from "../constants";

const userRegistration = async (req : Request, res : Response, next :NextFunction)  => {

  try {
    const { body , fingerprint } = req
    const user = await UserService.createUser(body)
    const tokens   =  await UserService.generateUserAuthTokens(new UserDto(user),fingerprint)

    res.cookie(USER_AUTH_REFRESH_TOKEN_COOKIE_KEY,tokens.refreshToken,USER_AUTH_COOKIES_CONFIG)
    res.send(  {...new UserDto(user),tokens} )
  }
  catch (err) {
    res.status(constants.HTTP_STATUS_BAD_REQUEST)
    res.send( err )
  }

}

const userLogin = async ({body,fingerprint } : Request, res : Response, next :NextFunction) => {
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

    const user = login ? await  UserService.findUserByLogin(login) : await  UserService.findUserByEmail(email)

    if(!user){
      res.status(constants.HTTP_STATUS_UNAUTHORIZED).send('неверный логин или пароль')
      return
    }

    const isEqualPasswords = await  UserService.compareUserPasswords(password  ,user.password)

    if (!isEqualPasswords) {
          res.status(constants.HTTP_STATUS_UNAUTHORIZED).send('неверный логин или пароль')
    }

    const tokens = await UserService.generateUserAuthTokens(user,fingerprint)
    res.cookie(USER_AUTH_REFRESH_TOKEN_COOKIE_KEY, tokens.refreshToken, USER_AUTH_COOKIES_CONFIG)
    res.cookie(USER_AUTH_ACCESS_TOKEN_COOKIE_KEY,tokens.accessToken,{httpOnly:false})
    res.send({ ...new UserDto(user), tokens })

    // res.signedCookies
  } catch (e) {
    console.log(e);
    res.sendStatus(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
  }

}


const userLogout = async (req : Request, res : Response, next :NextFunction) => {
  try {
    const { cookies } = req

    const refreshToken = cookies[USER_AUTH_REFRESH_TOKEN_COOKIE_KEY]
    res.clearCookie( USER_AUTH_REFRESH_TOKEN_COOKIE_KEY )
    res.clearCookie( USER_AUTH_ACCESS_TOKEN_COOKIE_KEY )

    const result =   await UserService.deleteUserToken(refreshToken)
    res.send(result)

  } catch (e) {
    console.log(e);
    res.sendStatus(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR);
  }

}


const updateUserAuthTokens =  async (req : Request, res : Response, next :NextFunction) => {
  try {
    const {cookies,fingerprint} = req
    const refreshToken = cookies[USER_AUTH_REFRESH_TOKEN_COOKIE_KEY]

    if(!refreshToken) {
      res.sendStatus(constants.HTTP_STATUS_UNAUTHORIZED)
      return
    }

   const decodedToken = await UserService.validateUserRefreshToken(refreshToken)

    if (!decodedToken) {
      res.sendStatus(constants.HTTP_STATUS_UNAUTHORIZED)
      return
    }

    const{userId} = decodedToken

    const user = await UserService.findUserById(userId)

    if (!user) {
      res.sendStatus(constants.HTTP_STATUS_UNAUTHORIZED)
      return
    }

    const tokens = await UserService.generateUserAuthTokens(new UserDto(user),fingerprint)

    res.cookie(USER_AUTH_REFRESH_TOKEN_COOKIE_KEY,tokens.refreshToken,USER_AUTH_COOKIES_CONFIG)
    res.cookie(USER_AUTH_ACCESS_TOKEN_COOKIE_KEY,tokens.accessToken,{httpOnly:false})

    res.send( {...new UserDto(user),tokens}  )

  }catch (err) {
    console.log(err);
    res.sendStatus(constants.HTTP_STATUS_UNAUTHORIZED)
  }

}

const getUsers = async (req : Request, res : Response, next :NextFunction)  => {
  try {

    const users =  await UserService.getUsersList()
    res.send( users.map((item)=>new UserDto(item))  )

  } catch (err) {
    res.send( [] )
  }

}

const getUserById = async (req : Request, res : Response, next :NextFunction)  => {

  try {

    const { id } = req.params

    if (!id) {
      res.sendStatus(constants.HTTP_STATUS_BAD_REQUEST)
      return
    }

    const user = await UserService.findUserById(id)

    if (user) {
      res.send ( new UserDto(user) )
      return
    }

  }
  catch (err) {
    res.sendStatus(constants.HTTP_STATUS_NOT_FOUND)
  }

}
export default {
  getUsers,
  getUserById,
  userRegistration,
  userLogin,
  userLogout,
  updateUserAuthTokens
}

