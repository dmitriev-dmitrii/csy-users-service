import { Router } from "express";
import UserService from '../services/users'
import {constants} from "http2";
const users = Router()
users.post('/registration',  async (req,res) => {
    const { body } = req
    res.send( await UserService.create(body) )
} );

users.post('/login',  async (req,res) => {
    const { body } = req
    const user = await UserService.login(body)

    if (user) {
        res.send ( user )
        return
    }

    res.sendStatus(constants.HTTP_STATUS_UNAUTHORIZED)
} );

users.get('/',  async (req,res) => {
     res.send( await UserService.index() )
} );

users.get('/:id',  async (req,res) => {
    const { id } = req.params
    const user = await UserService.findById(id)

    if (user) {
        res.send ( user )
        return
    }
    res.sendStatus(constants.HTTP_STATUS_NOT_FOUND)

} );
export  default users;