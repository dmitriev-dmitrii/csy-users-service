import mongoose, {Schema} from 'mongoose'

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

const  userSchema = new Schema({

    id:{
        type:Schema.Types.ObjectId
        // для _id работает алиас id
    },
    login: {
        type: String,
        required: true,
        index: true,
        unique: true,
        // enum: { values: ['admin'], message: '{VALUE} is not supported' }
    },
    email: {
        type: String,
        unique:true,
        index: true,
        lowercase:true,
        trim:true,
        required: [true, "name required"],
        minlength:[3,'hui'],
        // TODO добавить регулярку
        // maxlength:54,
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
const UserModel = mongoose.model('User', userSchema);

// UserModel.createIndexes()

// @ts-ignore
// userSchema.post('save', function(error, doc, next) {
//     if ( error.code === 11000) {
//         console.log('asd')
//         next(new Error('There was a duplicate key error'));
//     } else {
//         next(error);
//     }
// });


// userSchema.post('validate', function(doc,e) {
//     console.log(doc)
//     // console.log('%s has been validated (but not saved yet)', doc._id);
//     // e()
// });


export default UserModel;




