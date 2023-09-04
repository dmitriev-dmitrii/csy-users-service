
import { ErrorRequestHandler } from "express";
class ErrorHandler extends Error {
    private statusCode: number;
    constructor(message:string, statusCode:number) {
        // super calls the constructor of the parent class
        super(message);
        this.statusCode = statusCode || 500;
        //  captureStackTrace returns a string that reperesents the location of that particular error in the call. gives us a stack that helps us to find the location of that error in the code. this will help us to find the exact error in our code.
        // "this" is object itself, "this.constructor" constructor of this class
        Error.captureStackTrace(this, this.constructor);
    }
}



// class mongooseError extends Error {
//     constructor(message, statusCode){
//         super(message);
//         this.statusCode = statusCode;
//         this.status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error';
//
//         this.isOperational = true;
//
//         Error.captureStackTrace(this, this.constructor);
//     }
// }

// const castErrorHandler = (err) => {
//     const msg = `Invalid value for ${err.path}: ${err.value}!`
//     return new CustomError(msg, 400);
// }
// const duplicateKeyErrorHandler = (err) => {
//     // const name = err.keyValue.name;
//     // const msg = `There is already a movie with name ${name}. Please use another name!`;
//     //
//     // return new CustomError(msg, 400);
// }



const errorMiddleware:ErrorRequestHandler = ( err ,req , res, next ) => {

    res.sendStatus(500)
}

export default errorMiddleware