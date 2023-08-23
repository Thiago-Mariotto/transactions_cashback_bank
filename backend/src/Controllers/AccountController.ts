import { NextFunction, Request, Response } from 'express';
import AccountService from '../Services/AccountService';
import LoggedAccount from '../Types/LoggedAccount';
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

  public async UpdateAccount(req: Request, res: Response, next: NextFunction) {
    const loggedAccount = req.body.user as LoggedAccount;
    const { accountId } = req.params;

    delete req.body.user;
    try {
      AccountSchema.parse(req.body);
      await this._accountService.Update({ id: accountId, ...req.body }, loggedAccount);
      return res.status(200).json({ message: 'Conta editada' });
    } catch (error) {
      next(error);
    }
  }
}