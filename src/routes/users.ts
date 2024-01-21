import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import UserController from "../controllers/users";

const {getUsers,userRegistration,userLogin,userLogout,refreshUserAuthTokens ,getUserById} = UserController

const usersRouter = Router()

usersRouter.get('/', authMiddleware, getUsers );

usersRouter.get('/:id',  authMiddleware, getUserById );

usersRouter.post('/registration', userRegistration);

usersRouter.post('/login',  userLogin );

usersRouter.post('/logout',  userLogout);

usersRouter.get('/refresh-token', refreshUserAuthTokens );

export  default usersRouter;