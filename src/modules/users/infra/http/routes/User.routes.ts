import { Router, Request, Response } from 'express';

import UserController from '../controller/UserController';

const userRoutes = Router();

const userController = new UserController();

userRoutes.post('/', userController.create);
userRoutes.patch('/', userController.update);
userRoutes.get('/:id', userController.find);
userRoutes.get('/', userController.index);

export default userRoutes;
