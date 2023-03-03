import { NextFunction, Request, Response } from 'express';
import UserServise from '../services/UserService';

const INVALID_LOGIN = 'Invalid email or password';

export default async function validateLogin(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  const userService = new UserServise();
  const isUser = await userService.toLogin({ email, password });

  if (!isUser) {
    res.status(401).json({ message: INVALID_LOGIN });
    return;
  }
  next();
}
