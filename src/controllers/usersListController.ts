import UserDto from "../services/users/dto/UserDto";
import { constants } from "http2";
import {  Request, Response ,NextFunction, } from "express";
import { findUserById,findUserByEmail, getUsersList, } from "../services/users/usersListService";

export const getUsers = async (req : Request, res : Response, next :NextFunction)  => {
  try {

    const users =  await getUsersList()
    res.send( users.map((item)=>new UserDto(item))  )

  } catch (err) {
    res.send( [] )
  }

}

export  const getUserById = async (req : Request, res : Response, next :NextFunction)  => {

  try {

    const { id } = req.params

    if (!id) {
      res.sendStatus(constants.HTTP_STATUS_BAD_REQUEST)
      return
    }

    const user = await findUserById(id)

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
}

