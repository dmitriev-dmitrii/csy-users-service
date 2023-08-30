import { DATABASE_PORT, DATABASE_URL, DATABASE_USER, DATABASE_PASSWORD } from './env';
import mongoose from "mongoose";
export default async function () {
    try {
        console.log('mongo db connect: ...')
    const url = `mongodb://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_URL}:${DATABASE_PORT}/csy-users-service?authSource=admin`;

    await mongoose.connect(url);

        console.log('mongo db connect: success')
    }   catch (err) {
        console.log('mongo db connect: failed')
        console.log(err)
        return err
    }
};
