import { Router } from "express";
import UserService from '../services/users/index'
import {constants} from "http2";
import { generateUserAccessTokens } from "../services/users/login";
import UserDto from "../services/users/dto/UserDto";

const  {getUsersList,createUser,findUserById} = UserService

const users = Router()

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

        res.send(  {...new UserDto(user),...{tokens}} )
    }
    catch (err) {
        res.status(constants.HTTP_STATUS_BAD_REQUEST)
        res.send( err )
    }
} );

// users.post('/login',  async (req,res) => {
//     const { body } = req
//
//     const user = await UserService.login(body)
//
//     if (user) {
//         res.send ( user )
//         return
//     }
//
//     res.sendStatus(constants.HTTP_STATUS_UNAUTHORIZED)
// } );

// users.post('/logout',  async (req,res) => {
//     const { body } = req
//
//     const user = await UserService.login(body)
//
//     if (user) {
//         res.send ( user )
//         return
//     }
//
//     res.sendStatus(constants.HTTP_STATUS_UNAUTHORIZED)
// } );

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