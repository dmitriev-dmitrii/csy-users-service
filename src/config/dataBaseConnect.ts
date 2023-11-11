import { DB_PORT, DB_URL, DB_USER, DB_PASSWORD, DB_NAME } from "./env";
import mongoose from "mongoose";
export default async function () {
    try {
        // TODO вынести в utils
        console.log(`${DB_NAME} connect: loading...`)

    const url = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_URL}:${DB_PORT}/${DB_NAME}?authSource=admin`;

    await mongoose.connect(url);

        console.log(`${DB_NAME} connect: success`)
    }   catch (err) {
        console.log(`${DB_NAME} connect: failed`)
        console.log(err)
        return err
    }
};
