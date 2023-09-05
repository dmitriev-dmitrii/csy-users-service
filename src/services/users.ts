import {ObjectId} from "mongoose";
import UserModel from '../models/user'
import User from "../models/user";

 const UserService  = {

     index: async ( ) => {
         return UserModel.find({});
     },

    create: async ( payload= {} ) => {
        try {
          return  await UserModel.create(payload)
        }
        catch (err) {
            throw err
        }
    },

     // update: async ( payload= {} ) => {
     //     try {
     //         return  await UserModel.create(payload)
     //     }
     //     catch (err) {
     //         throw err
     //     }
     // },

     login: async ( payload= {
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
     },

     findById: async ( id:ObjectId | string) : Promise< typeof User | null> => {
         try {
             return   await UserModel.findById(id);
         }
         catch (err) {
            return null
        }
     },

 }
export default UserService