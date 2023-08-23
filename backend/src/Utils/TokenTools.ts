import jwt from 'jsonwebtoken';
import NotAuthorized from '../Errors/NotAuthorized';

const SECRET_KEY = process.env.SECRET_KEY || 'password';

type payloadType = {
  id: number;
  name: string;
  email: string;
};

const jwtConfig: jwt.SignOptions = {
  expiresIn: '30m',
  algorithm: 'HS256'
};

export const generateToken = (payload: object) => {
  const token = jwt.sign(payload, SECRET_KEY, jwtConfig);
  return token;
};

export const decodeToken = (token: string): payloadType => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded as payloadType;
  } catch (err) {
    throw new NotAuthorized('Not authorized');
  }
};