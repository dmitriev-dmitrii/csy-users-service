import {ObjectId} from "mongoose";
import  { UserModel } from "../../models/user";

export const  getUsersList =  async ( ) => {
  return UserModel.find({});
}

export const  createUser =  async ( payload= {} ) => {
  try {
    return  await UserModel.create(payload)
  }
  catch (err) {
    throw err
  }
}

export const  userLogin = async ( payload= {
  email:'',
  login:'',
  password:''
} ) => {
  try {
    const {login, email, password} = payload

    let user = null

    if (!password) {
      return user
    }

    if (login) {
      user = await UserModel.findOne ( {login : payload.login} )
    }

    if (email && !user ) {
      user = await  UserModel.findOne ( {email : payload.email} )
    }

    if (user?.password === password) {
      return user
    }

  }
  catch (err) {
    return null
  }
}

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