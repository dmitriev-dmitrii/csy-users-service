import mongoose, { ObjectId, Schema } from "mongoose";
import {mongooseValidationErrorsParser} from "../utils/mongooseErrParser";
import { UserTokensInterface } from "./users-tokens";

const options = {
    collection: 'users',
    // autoIndex: false,
    versionKey: false,
    id:true,
    minimize:false,
    timestamps: {
        createdAt:true,
        updatedAt:true,
    }
}

const  UserSchema = new Schema({

    login: {
        type: String,
        required: true,
        index: true,
        unique: true,
        minlength:[2,'to short login'],

        validate: {

            validator: (value:string) => {
                return !['admin','hui'].includes(value)
            },
            // @ts-ignore
            message: (prop)=>{
                return `${prop.value} is bad name`
            }
        }
    },
    email: {
        type: String,
        unique:true,
        index: true,
        lowercase:true,
        trim:true,

        required: [true, "email required"],
        // minlength:[3,'hui'],
        // match:[/^[A-Za-z0-9]+$/,"passwordIncorrect"],
        // TODO добавить регулярку
        maxlength:54,
        // default: ""
    },
    password:{
        type:String,
        required:[true,"password Required"]
    },
},options);

// https://mongoosejs.com/docs/api/error.html
// https://mongoosejs.com/docs/middleware.html


// @ts-ignore

UserSchema.post('validate', (err, _ , next) => {

    if(err.name === 'ValidationError') {
        const { errors } = err
        next( mongooseValidationErrorsParser(errors) )
        return
    }

    next()
});

export interface UserDocumentI {
    readonly  '_id': ObjectId
    readonly  'id': ObjectId
    login: string,
    "email": string,
    'tokens' ? : any,
    readonly "password": string,
    readonly "createdAt": string,
    readonly  "updatedAt": string
}

export const UserModel = mongoose.model<UserDocumentI>('User', UserSchema);

