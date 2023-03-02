import { NextFunction, Request, Response } from 'express';

const ERROR_LOGIN = 'All fields must be filled';
const INVALID_LOGIN = 'Invalid email or password';
const REGEX_EMAIL = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i;

export default function validateLogin(req:Request, res:Response, next:NextFunction):void {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: ERROR_LOGIN });
    return;
  }
  if (!REGEX_EMAIL.test(email)) {
    res.status(401).json({ message: INVALID_LOGIN });
    return;
  }
  if (password.length < 6) {
    res.status(401).json({ message: INVALID_LOGIN });
    return;
  }
  next();
}
