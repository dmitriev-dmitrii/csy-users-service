import mongoose,{Schema}  from 'mongoose'
import {mongooseValidationErrorsParser} from "../utils/mongooseErrParser";


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

UserSchema.set('toJSON', {
    // для удобства переименовывает поле _id в id
    transform: function (doc, payload, options) {
        payload.id = payload._id;
        delete payload._id;
    }
});

export interface UserInterface {
    login: string,
    "email": string,
    readonly "password": string,
    readonly  'id':string
    readonly "createdAt": string,
    readonly  "updatedAt": string
}
export const UserModel = mongoose.model<UserInterface>('User', UserSchema);

