import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import UserController from "../controllers/users";

const {getUsers,userRegistration,userLogin,userLogout,updateUserAuthTokens ,getUserById} = UserController

const usersRouter = Router()

usersRouter.post('/registration', userRegistration);

usersRouter.post('/login',  userLogin );

usersRouter.post('/logout',  userLogout);

usersRouter.put('/refresh-token', updateUserAuthTokens );

usersRouter.get('/', authMiddleware, getUsers );

usersRouter.get('/:id',  authMiddleware, getUserById );

export  default usersRouter;