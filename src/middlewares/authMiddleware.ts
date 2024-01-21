import { NextFunction, Request, Response } from "express";
import { constants } from "http2";
import { validateAccessToken } from "../services/users/auth";
import { USER_AUTH_ACCESS_TOKEN_HEADER } from "../constants";

 async function authMiddleware(req: Request, res: Response, next: NextFunction) {
     try {
         const { headers } = req
         const accessToken = String(headers[USER_AUTH_ACCESS_TOKEN_HEADER]);

         if (!accessToken) {
             res.sendStatus(constants.HTTP_STATUS_UNAUTHORIZED)
             return
         }
         
         const userData = await validateAccessToken(accessToken);

         if (!userData) {
             res.sendStatus(constants.HTTP_STATUS_UNAUTHORIZED)
             return
         }


         next();
     } catch (e) {
         console.log('authMiddleware', e);
         res.sendStatus(constants.HTTP_STATUS_UNAUTHORIZED)
     }
 }

export default authMiddleware