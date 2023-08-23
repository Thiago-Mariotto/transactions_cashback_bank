import { NextFunction, Request, Response } from 'express';
import AccountService from '../Services/AccountService';
import { AccountSchema } from './Schemas/AccountSchema';

export default class AccountController {

  constructor(private _accountService = new AccountService()) { }

  public async CreateAccount(req: Request, res: Response, next: NextFunction) {
    try {
      AccountSchema.parse(req.body);
      await this._accountService.Create(req.body);
      return res.status(201).json({ message: 'Conta criada' });
    } catch (error) {
      next(error);
    }
  }
}