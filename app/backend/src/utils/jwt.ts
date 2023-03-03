import { sign, SignOptions, verify } from 'jsonwebtoken';
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET || 'suaSenhasecreta';

const jwtConfig: SignOptions = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

export const generateToken = (payload:string | object) =>
  sign(payload, JWT_SECRET, jwtConfig);

export const tokenVerify = (token:string) => {
  try {
    const verifyJwt = verify(token, JWT_SECRET);
    return verifyJwt;
  } catch (error) {
    console.log(error);
  }
};
