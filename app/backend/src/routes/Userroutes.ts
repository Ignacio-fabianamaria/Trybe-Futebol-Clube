import { Request, Response, Router } from 'express';
import UserServise from '../services/UserService';
import UserController from '../controllers/UserControler';
import validateLogin from '../middlewares/validateLogin';

const usersRoutes = Router();
const userService = new UserServise();
const userController = new UserController(userService);

usersRoutes.post(
  '/login',
  validateLogin,
  (req:Request, res:Response) => userController.toLogin(req, res),
);

export default usersRoutes;
