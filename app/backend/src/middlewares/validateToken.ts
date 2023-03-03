import { NextFunction, Request, Response } from 'express';
import { tokenVerify } from '../utils/jwt';

const TOKEN_NOT_FOUND = 'Token not found';
const TOKEN_INVALID = 'Token must be a valid token';

export default function validateToken(req:Request, res:Response, next:NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: TOKEN_NOT_FOUND });
  }
  try {
    const verifyToken = tokenVerify(authorization);
    if (!verifyToken) return res.status(401).json({ message: TOKEN_INVALID });
    res.locals.user = verifyToken;
    next();
  } catch (error) {
    res.status(401).json({ message: TOKEN_INVALID });
  }
}

// res.locals Property -  https://www.geeksforgeeks.org/express-js-res-locals-property/
