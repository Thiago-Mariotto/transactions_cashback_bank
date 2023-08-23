import { NextFunction, Request, Response } from 'express';
import TransactionService from '../Services/TransactionService';
import LoggedAccount from '../Types/LoggedAccount';
import { TransactionSchema } from './Schemas/TransactionSchema';

export default class TransactionController {
  constructor(private _transactionService = new TransactionService()) { }

  public async CreateTransaction(req: Request, res: Response, next: NextFunction) {
    const { accountId } = req.params;
    const { amount } = req.body;
    const loggedUser: LoggedAccount = req.body.user;

    try {
      TransactionSchema.parse({ amount });
      const transaction = await this._transactionService.create(accountId, amount, loggedUser);
      return res.status(201).json(transaction);
    } catch (err) {
      next(err);
    }
  }

  public async UserTransactions(req: Request, res: Response, next: NextFunction) {
    const { accountId } = req.params;
    const loggedUser: LoggedAccount = req.body.user;

    try {
      const transactions = await this._transactionService.listByAccount(accountId, loggedUser);
      return res.status(200).json(transactions);

    } catch (err) {
      next(err);
    }
  }
}