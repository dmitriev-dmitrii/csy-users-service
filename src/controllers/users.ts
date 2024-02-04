import UserDto from "../services/users/dto/UserDto";
import UserService from "../services/users";
import { constants } from "http2";

import {
  USER_AUTH_ACCESS_TOKEN_HEADER_KEY,
  USER_AUTH_COOKIES_CONFIG,
  USER_AUTH_REFRESH_TOKEN_COOKIE_KEY
} from "../constants";
import { validateUserAccessToken } from "../services/users/auth";



// @ts-ignore
const userLogin = async (req, res, next) => {
  try {
    const { body, fingerprint  } = req
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

    const tokens = await UserService.generateUserAuthTokens(new UserDto(user),fingerprint)
    res.cookie(USER_AUTH_REFRESH_TOKEN_COOKIE_KEY, tokens.refreshToken, USER_AUTH_COOKIES_CONFIG)
    res.send({ ...new UserDto(user), tokens })

    // res.signedCookies
  } catch (e) {
    console.log(e);
    res.sendStatus(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
  }

}



// @ts-ignore
const userLogout = async (req,res) => {
  try {
    const { cookies } = req
    // const accessToken = [USER_AUTH_ACCESS_TOKEN_HEADER_KEY]
    const refreshToken = cookies[USER_AUTH_REFRESH_TOKEN_COOKIE_KEY]

    const result =   await UserService.deleteUserToken(refreshToken)
    // TODO проверять удалился ли токен из бд?
      res.clearCookie( USER_AUTH_REFRESH_TOKEN_COOKIE_KEY )

    res.send(result)

  }catch (e) {
    console.log(e);
    res.sendStatus(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR);
  }

}

// @ts-ignore
 const userRegistration = async (req, res, next)  => {

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



// @ts-ignore
const updateUserAuthTokens =  async (req,res) => {
  try {
    const {cookies,fingerprint} = req
    const refreshToken = cookies[USER_AUTH_REFRESH_TOKEN_COOKIE_KEY]

    if(!refreshToken) {
      res.sendStatus(constants.HTTP_STATUS_UNAUTHORIZED)
      return
    }
    // @ts-ignore
   const token = await UserService.validateUserRefreshToken(refreshToken)

    // @ts-ignore
    const{userId} = token

    if (!userId) {
      res.sendStatus(constants.HTTP_STATUS_UNAUTHORIZED)
      return
    }

    const user = await UserService.findUserById(userId)
    // @ts-ignore
    const tokens = await UserService.generateUserAuthTokens(new UserDto(user),fingerprint)

    res.cookie(USER_AUTH_REFRESH_TOKEN_COOKIE_KEY,tokens.refreshToken,USER_AUTH_COOKIES_CONFIG)
    // @ts-ignore
    res.send( {...new UserDto(user),tokens}  )

  }catch (err) {
    console.log(err);
    res.sendStatus(constants.HTTP_STATUS_UNAUTHORIZED)
  }

}
// @ts-ignore
const getUsers = async (req, res, next)  => {
  try {

    const users =  await UserService.getUsersList()
    res.send( users.map((item)=>new UserDto(item))  )

  } catch (err) {
    res.send( [] )
  }

}
// @ts-ignore
const getUserById = async (req, res, next)  => {

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
    console.log(err);
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

