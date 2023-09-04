import { ErrorRequestHandler } from "express";

const errorMiddleware:ErrorRequestHandler = ( err ,req , res, next ) => {
    console.log( err )
    res.status(500)
    next('server error');
}
export default errorMiddleware