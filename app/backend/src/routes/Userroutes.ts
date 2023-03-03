import { Request, Response, Router } from 'express';
import UserServise from '../services/UserService';
import UserController from '../controllers/UserControler';
import validateLogin from '../middlewares/validateLogin';
import validateEmailPassword from '../middlewares/validateEmailPassword';

// import validateToken from '../middlewares/validateToken';

const usersRoutes = Router();
const userService = new UserServise();
const userController = new UserController(userService);

usersRoutes.post(
  '/login',
  validateEmailPassword,
  validateLogin,
  (req:Request, res:Response) => userController.toLogin(req, res),
);

/* usersRoutes.get(
  '/login/role',
  validateToken,
  (req:Request, res:Response) => UserController.getLogin(req, res),
); */

export default usersRoutes;
