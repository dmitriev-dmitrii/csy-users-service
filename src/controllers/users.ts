import UserDto from "../services/users/dto/UserDto";
import UserService from "../services/users";
import { constants } from "http2";
import { USER_TOKEN_REFRESH_EXPIRES_TIME } from "../../config/env";
import { findUserByEmail, findUserByLogin } from "../services/users/users";
import { verifyAccessToken } from "../services/users/utils/usersTokenUtils";

const USER_AUTH_ACCESS_TOKEN_HEADER = 'csy-auth'
const USER_AUTH_REFRESH_TOKEN_COOKIE_KEY = 'csy-refresh'

const authCookieOptions = {maxAge: USER_TOKEN_REFRESH_EXPIRES_TIME ,httpOnly: true}

// @ts-ignore
const userLogin = async (req, res, next) => {
  try {
    const { body } = req
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

    const tokens = await UserService.generateUserAuthTokens(user)
    res.cookie(USER_AUTH_REFRESH_TOKEN_COOKIE_KEY, tokens.refreshToken, authCookieOptions)
    res.send({ ...new UserDto(user), tokens })


  } catch (e) {
    console.log(e);
    res.sendStatus(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
  }

}
// @ts-ignore
const refreshUserAuthTokens =  async (req,res) => {
  try {
    const {cookies} = req
    const token = cookies[USER_AUTH_ACCESS_TOKEN_HEADER]

    if(!token) {
      res.sendStatus(constants.HTTP_STATUS_UNAUTHORIZED)
    }

    const user = await UserService.validateUserRefreshToken(cookies[USER_AUTH_ACCESS_TOKEN_HEADER])

    if (user) {

      const tokens = await UserService.generateUserAuthTokens(user)

      res.cookie(USER_AUTH_ACCESS_TOKEN_HEADER,tokens.refreshToken,authCookieOptions)
      res.send(  {...new UserDto(user),tokens} )

      return
    }

    // TODO доделать
    // if (user) {
    //     const tokens = await generateUserAuthTokens(user)
    //
    //     res.cookie(USER_AUTH_ACCESS_TOKEN_HEADER,tokens.refreshToken,authCookieOptions)
    //
    //     return
    // }


  }catch (e) {

    res.sendStatus(constants.HTTP_STATUS_UNAUTHORIZED)
  }

}


// @ts-ignore
const userLogout = async (req,res) => {
  try {
    const { cookies } = req
    // const accessToken = [USER_AUTH_ACCESS_TOKEN_HEADER]
    const refreshToken = cookies[USER_AUTH_REFRESH_TOKEN_COOKIE_KEY]

    const result =   await UserService.deleteUserToken(refreshToken)
    // TODO проверять удалился ли токен ?
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
    const { body } = req
    const user = await UserService.createUser(body)
    const tokens   =  await UserService.generateUserAuthTokens(user)

    res.cookie(USER_AUTH_REFRESH_TOKEN_COOKIE_KEY,tokens.refreshToken,authCookieOptions)
    res.send(  {...new UserDto(user),tokens} )
  }
  catch (err) {
    res.status(constants.HTTP_STATUS_BAD_REQUEST)
    res.send( err )
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
// @ts-ignore
   const getUsers = async (req, res, next)  => {
        try {

          const users =  await UserService.getUsersList()
          res.send( users.map((item)=>new UserDto(item))  )

        } catch (err) {
          res.send( [] )
        }

}
export default {
  getUsers,
  getUserById,
  userRegistration,
  userLogin,
  userLogout,
  refreshUserAuthTokens
}

