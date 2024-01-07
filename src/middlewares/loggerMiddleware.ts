import { Request, Response , NextFunction } from 'express'

const loggerMiddleware = (  req: Request, res: Response, next:NextFunction ) => {

    console.log('logger:', req.method, req.path)
    // можем записывать какие-либо логи тут

    next()
}

export default loggerMiddleware