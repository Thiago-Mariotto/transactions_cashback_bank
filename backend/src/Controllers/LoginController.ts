import { NextFunction, Request, Response } from 'express';
import ILogin from '../Interfaces/ILogin';
import LoginService from '../Services/LoginService';
import { LoginSchema } from './Schemas/LoginSchema';

export default class LoginController {

  constructor(private _loginService = new LoginService()) { }

  public async Login(req: Request, res: Response, next: NextFunction) {
    try {
      LoginSchema.parse(req.body as ILogin);
      const token = await this._loginService.Login(req.body);
      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }
}
