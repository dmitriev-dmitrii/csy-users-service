import { NextFunction, Request, Response } from "express";
import { constants } from "http2";
import { validateUserAccessToken } from "../services/users/auth";
import { USER_AUTH_ACCESS_TOKEN_COOKIE_KEY } from "../constants";

 async function authMiddleware(req: Request, res: Response, next: NextFunction) {
     try {
         const { headers ,cookies} = req

         const accessToken = String(cookies[USER_AUTH_ACCESS_TOKEN_COOKIE_KEY]);

         if (!accessToken) {
             res.sendStatus(constants.HTTP_STATUS_UNAUTHORIZED)
             return
         }

         const isValid = await validateUserAccessToken(accessToken);

         if (!isValid) {
             res.sendStatus(constants.HTTP_STATUS_UNAUTHORIZED)
             return
         }


         next();
     } catch (err) {
         console.log('authMiddleware', err);
         res.sendStatus(constants.HTTP_STATUS_UNAUTHORIZED)
     }
 }

export default authMiddleware