import { Router } from "express";
import UserService from '../services/users/index'
import {constants} from "http2";
import { generateUserAccessTokens, userLogin } from "../services/users/login";
import UserDto from "../services/users/dto/UserDto";
import { USER_TOKEN_REFRESH_EXPIRES_TIME } from "../config/env";

const  {getUsersList,createUser,findUserById} = UserService

const users = Router()
const authHeader = 'csy-auth'
const authCookieOptions = {maxAge:120000,httpOnly:true}
users.get('/',  async (req,res) => {
    try {

    const users =  await getUsersList()
    res.send( users.map((item)=>new UserDto(item))  )

    } catch (err) {
        res.send( [] )
    }
} );

users.post('/registration',  async (req,res) => {
    try {
        const { body } = req
        const user = await createUser(body)
        const tokens   =  await generateUserAccessTokens(user)
        // USER_TOKEN_REFRESH_EXPIRES_TIME

        res.cookie(authHeader,tokens.refreshToken,authCookieOptions)
        res.send(  {...new UserDto(user),tokens} )
    }
    catch (err) {
        res.status(constants.HTTP_STATUS_BAD_REQUEST)
        res.send( err )
    }
} );

users.post('/login',  async (req,res) => {
    try {
        const { body } = req
        const   {login = '', email = '', password = ''} = body

        if (!password) {
            res.sendStatus(constants.HTTP_STATUS_BAD_REQUEST)
            return
        }

        if (!login && !email) {
            res.sendStatus(constants.HTTP_STATUS_BAD_REQUEST)
            return
        }

        const user = await UserService.userLogin(body)

        if (user) {
            const tokens = await generateUserAccessTokens(user)
            res.cookie(authHeader,tokens.refreshToken,authCookieOptions)
            res.send(  {...new UserDto(user),tokens} )

            return
        }
        res.status(constants.HTTP_STATUS_UNAUTHORIZED).send('неверный логин или пароль')


    }catch (e) {

        res.sendStatus(constants.HTTP_STATUS_UNAUTHORIZED)
    }

} );

users.post('/logout',  async (req,res) => {
    try {
        const { cookies } = req

        const result =   await UserService.userLogout(cookies[authHeader])

        res.clearCookie(authHeader)
        res.send(result)
    }catch (e) {

        res.sendStatus(constants.HTTP_STATUS_UNAUTHORIZED)
    }

} );

users.get('/refresh-token',  async (req,res) => {
    try {
        const {cookies} = req
        const token = cookies[authHeader]

        if(!token) {
            res.sendStatus(constants.HTTP_STATUS_UNAUTHORIZED)
        }

        const user = await UserService.validateRefreshToken(cookies[authHeader])

        if (user) {

            const tokens = await generateUserAccessTokens(user)

            res.cookie(authHeader,tokens.refreshToken,authCookieOptions)
            res.send(  {...new UserDto(user),tokens} )

            return
        }


        // if (user) {
        //     const tokens = await generateUserAccessTokens(user)
        //
        //     res.cookie(authHeader,tokens.refreshToken,authCookieOptions)
        //
        //     return
        // }


    }catch (e) {

        res.sendStatus(constants.HTTP_STATUS_UNAUTHORIZED)
    }

} );


// users.patch('update',  async (req,res) => {
//     try {
//         const { body } = req
//
//         const { id } = body
//
//         const user = await UserService.findById(id)
//
//         if (user) {
//             res.send
//         }
//
//         res.sendStatus(constants.HTTP_STATUS_NOT_FOUND)
//     }
//     catch (err) {
//
//
//     }
// } );



users.get('/:id',  async (req,res) => {
    try {

    const { id } = req.params
    const user = await findUserById(id)

    if (user) {
        res.send ( new UserDto(user) )
        return
    }

    }
    catch (err) {
        console.log(err);
        res.sendStatus(constants.HTTP_STATUS_NOT_FOUND)
    }
} );
export  default users;