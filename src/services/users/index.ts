import {ObjectId} from "mongoose";
import { UserInterface, UserModel } from "../../models/user";
import hashPassword from "./utils/hashPassword";


export const  getUsersList =  async ( ) => {
  return UserModel.find({});
}

type UserCandidate = Pick<UserInterface , 'login'| 'email' | 'password'>
export const  createUser =  async ( payload:UserCandidate   ) => {
  try {

    const password = await hashPassword(payload.password)

    return  await UserModel.create( {...payload, ...{password} } )
  }
  catch (err) {
    throw err
  }
}

// type UserLoginPayload = Pick<UserInterface , 'password'> & {login? : UserInterface["login"] , email ? : UserInterface["email"]  }
// export const  userLogin = async ( payload:UserLoginPayload ) => {
//   try {
//     const {login, email, password} = payload
//
//     let user = null
//
//     if (!password) {
//       return user
//     }
//
//     if (login) {
//       user = await UserModel.findOne ( {login : payload.login} )
//     }
//
//     if (email && !user ) {
//       user = await  UserModel.findOne ( {email : payload.email} )
//     }
//
//     if (user?.password === password) {
//       return user
//     }
//
//   }
//   catch (err) {
//     return null
//   }
// }

// export const  findUserById = async ( id:ObjectId | string)  => {
//     try {
//         return   await UserModel.findById(id);
//     }
//     catch (err) {
//        return null
//    }
// },

 const UserService  = {
   createUser,
   getUsersList,
 }

export default UserService