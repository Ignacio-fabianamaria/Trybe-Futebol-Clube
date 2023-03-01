import { Request, Response, Router } from 'express';
import UserServise from '../services/UserService';
import UserController from '../controllers/UserControler';

const usersRoutes = Router();
const userService = new UserServise();
const userController = new UserController(userService);

usersRoutes.post('/login', (req:Request, res:Response) => userController.toLogin(req, res));

export default usersRoutes;
