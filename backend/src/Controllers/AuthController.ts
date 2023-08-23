import { NextFunction, Request, Response } from 'express';
import NotAuthorized from '../Errors/NotAuthorized';
import AuthService from '../Services/AuthService';

export default class AuthController {

  constructor(private _authService = new AuthService()) { }

  public async validateToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];
    try {
      if (!token) throw new NotAuthorized('Token não encontrado');
      const payload = await this._authService.validateToken(token);
      req.body.user = payload;
      next();
    } catch (error) {
      next(error);
    }
  }
}