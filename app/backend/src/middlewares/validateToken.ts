import { NextFunction, Request, Response } from 'express';
import { tokenVerify } from '../utils/jwt';

const TOKEN_NOT_FOUND = 'Token not found';
const TOKEN_INVALID = 'Token must be a valid token';

export default function validateToken(req:Request, res:Response, next:NextFunction):void {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({ message: TOKEN_NOT_FOUND });
    return;
  }
  const verifyToken = tokenVerify(authorization);
  if (!verifyToken) {
    res.status(401).json({ message: TOKEN_INVALID });
    return;
  }

  next();
}
