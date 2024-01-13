import UserDto from "../services/users/dto/UserDto";
import UserService from "../services/users";
import { constants } from "http2";
import { USER_TOKEN_REFRESH_EXPIRES_TIME } from "../../config/env";
import { findUserByEmail, findUserByLogin } from "../services/users/users";

const USER_TOKEN_AUTH_HEADER = 'csy-auth'
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

    if (isEqualPasswords) {
      const tokens = await UserService.generateUserAccessTokens(user)
      res.cookie(USER_TOKEN_AUTH_HEADER, tokens.refreshToken, authCookieOptions)
      res.send({ ...new UserDto(user), tokens })
    }

    res.status(constants.HTTP_STATUS_UNAUTHORIZED).send('неверный логин или пароль')

  } catch (e) {

    res.sendStatus(constants.HTTP_STATUS_UNAUTHORIZED)
  }

}
// @ts-ignore
const refreshUserLoginToken =  async (req,res) => {
  try {
    const {cookies} = req
    const token = cookies[USER_TOKEN_AUTH_HEADER]

    if(!token) {
      res.sendStatus(constants.HTTP_STATUS_UNAUTHORIZED)
    }

    const user = await UserService.validateUserRefreshToken(cookies[USER_TOKEN_AUTH_HEADER])

    if (user) {

      const tokens = await UserService.generateUserAccessTokens(user)

      res.cookie(USER_TOKEN_AUTH_HEADER,tokens.refreshToken,authCookieOptions)
      res.send(  {...new UserDto(user),tokens} )

      return
    }

    // TODO доделать
    // if (user) {
    //     const tokens = await generateUserAccessTokens(user)
    //
    //     res.cookie(USER_TOKEN_AUTH_HEADER,tokens.refreshToken,authCookieOptions)
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
    const token = cookies[USER_TOKEN_AUTH_HEADER]
    const result =   await UserService.deleteUserToken(token)

    res.clearCookie(USER_TOKEN_AUTH_HEADER)
    res.send(result)
  }catch (e) {

    res.sendStatus(constants.HTTP_STATUS_UNAUTHORIZED)
  }

}

// @ts-ignore
 const userRegistration = async (req, res, next)  => {

  try {
    const { body } = req
    const user = await UserService.createUser(body)
    const tokens   =  await UserService.generateUserAccessTokens(user)

    res.cookie(USER_TOKEN_AUTH_HEADER,tokens.refreshToken,authCookieOptions)
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
  refreshUserLoginToken
}

