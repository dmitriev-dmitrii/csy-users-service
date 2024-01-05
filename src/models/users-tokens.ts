import mongoose, { ObjectId, Schema } from "mongoose";
import { UserDocumentI } from "./users";


const options = {
    collection: 'users-tokens',
    autoIndex: true,
    versionKey: false,
    id:true,
    minimize:false,
    timestamps: {
        createdAt:true,
        updatedAt:true,
    }
}

const  UserTokenSchema = new Schema({

    userId: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    refreshToken:{
        index: false,
        required: true,
        type:String,
    },
},options);


export interface UserTokensInterface {
    'refreshToken':string,
    readonly userId: ObjectId,
    readonly 'id':ObjectId,
    readonly '_id':ObjectId,
    readonly "createdAt": string,
    readonly  "updatedAt": string,
}
export const UserTokensModel = mongoose.model<UserTokensInterface>('UsersToken', UserTokenSchema);

