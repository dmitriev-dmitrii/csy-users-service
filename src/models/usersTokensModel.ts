import mongoose, { ObjectId, Schema } from "mongoose";
import { UserDocumentInterface } from "./usersModel";

import { mergeWith } from "lodash";
const  userAgentCustomizer = (objValue:'', srcValue:'') => {
    if (!objValue) {
        return '';
    }
}
const userAgentDefault = {
    browser: {
        family: '',
        version: '',
    },
    device: {
        family: '',
        version: '',
    },
    os: {
        family: '',
        major: '',
        minor: '',
    },
};

const userGeoDefault = {
    country: "",
    region: "",
    city: ""
}

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
    },

    refreshToken:{
        index: false,
        required: true,
        type:String,
    },
    fingerprintHash:{
        index: false,
        required: true,
        type:String,
    },
    userAgent:{
        type: typeof userAgentDefault,
    },
    userGeo:{
        type: typeof userAgentDefault,
    }


},options);


export interface UserTokensInterface {
    readonly 'id':ObjectId,
    readonly '_id':ObjectId,
    readonly createdAt: string,
    readonly updatedAt: string,

    'refreshToken':string,
    readonly userId: ObjectId,
    readonly fingerprintHash:string,
    readonly userAgent: typeof userAgentDefault,
    readonly userGeo: typeof userAgentDefault,
}

export type UserTokensToSaveFields = Required<Pick<UserTokensInterface,'refreshToken' |'fingerprintHash' |  'userId'>> & Pick<UserTokensInterface ,'userAgent' | 'userGeo' >;
UserTokenSchema.pre('save', async function (next) {
    this.userAgent = mergeWith( userAgentDefault,this.userAgent ,userAgentCustomizer)
    this.userGeo = mergeWith( userGeoDefault,this.userGeo ,userAgentCustomizer)
    next();
});
export const UserTokensModel = mongoose.model<UserTokensInterface>('UsersToken', UserTokenSchema);

