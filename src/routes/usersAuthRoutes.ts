import { Router } from "express";
import { updateUserAuthTokens, userLogin, userLogout, userRegistration } from "../controllers/usersAuthController";

const usersAuthRouter = Router()

 usersAuthRouter.post('/registration', userRegistration);

 usersAuthRouter.post('/login',  userLogin );

 usersAuthRouter.post('/logout',  userLogout);

 usersAuthRouter.put('/refresh-token', updateUserAuthTokens );

export  default  usersAuthRouter;