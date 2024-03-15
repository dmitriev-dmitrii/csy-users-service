import { ObjectId } from "mongoose";
import { UserDocumentInterface } from "../../../models/usersModel";

export default class UserDto {
  login:string
  email: string
  id : ObjectId
  createdAt: string
  updatedAt: string

  constructor(user:UserDocumentInterface ) {
    this.id = user._id
    this.login = user.login
    this.email  = user.email
    this.createdAt  = user.createdAt
    this.updatedAt  = user.updatedAt
  }

}
