import mongoose,{Schema}  from 'mongoose'
import {mongooseUniqIndexErrorsParser, mongooseValidationErrorsParser} from "../utils/mongooseErrParser";
import {log} from "util";

const options = {
    collection: 'users',
    // autoIndex: false,
    versionKey: false,
    id:true,
    // minimize:false,
    timestamps: {
        createdAt:true,
        updatedAt:true,
    }
}

const  UserSchema = new Schema({

    id:{
        type:Schema.Types.ObjectId
        // для _id работает алиас id
    },
    login: {
        type: String,
        required: true,
        index: true,
        unique: true,
        minlength:[2,'to short login'],

        validate: {
            // @ts-ignore
            validator: (value) => {
                return !['admin'].includes(value)
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
        // TODO добавить хешь пароля
        maxlength:[54,"too long"],
        minlength:[8, "tooShort"],
        // TODO добавить регулярку
        // match:[/^[A-Za-z0-9]+$/,"passwordIncorrect"],
        required:[true,"password Required"]
    },
    // phone: {
    //     type: String,
    //     validate: {
    //         // @ts-ignore
    //         validator: function(v) {
    //             return /\d{3}-\d{3}-\d{4}/.test(v);
    //         },
    //         // @ts-ignore
    //         message: props => `${props.value} is not a valid phone number!`
    //     },
    //     required: [true, 'User phone number required']
    // }

},options);

// https://mongoosejs.com/docs/api/error.html
// https://mongoosejs.com/docs/middleware.html

// UserModel.createIndexes()
// @ts-ignore
UserSchema.pre('validate', { document: true, query: true },(next,xz) => {

    console.log(next, xz,'validate')
    next()
    // if(err.name === 'ValidationError') {
    //     const { errors } = err
    //     next( mongooseValidationErrorsParser(errors) )
    //     return
    // }


});
// @ts-ignore
UserSchema.post('save', (err, payload, next)=> {

    if (err.code === 11000) {
        next( mongooseUniqIndexErrorsParser(err) )
        return
    }

    next();
});

// @ts-ignore

UserSchema.post('validate', (err, _ , next) => {



    if(err.name === 'ValidationError') {
        const { errors } = err
        next( mongooseValidationErrorsParser(errors) )
        return
    }

    next()
});

const UserModel = mongoose.model('User', UserSchema);
export default UserModel;




