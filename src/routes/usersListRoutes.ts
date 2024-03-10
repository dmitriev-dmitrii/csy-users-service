import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import { getUserById, getUsers } from "../controllers/usersListController";


const usersListRouter = Router()



usersListRouter.get('/', authMiddleware, getUsers );

usersListRouter.get('/:id',  authMiddleware, getUserById );

export  default usersListRouter;