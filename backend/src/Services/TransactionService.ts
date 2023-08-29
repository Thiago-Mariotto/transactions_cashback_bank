import { ModelStatic } from 'sequelize';
import db from '../Database/models';
import AccountSequelize from '../Database/models/AccountSequelize';
import CashbackSequelize from '../Database/models/CashbackSequelize';
import TransactionSequelize from '../Database/models/TransactionSequelize';
import { Cashback } from '../Entities';
import Transaction from '../Entities/Transaction';
import Forbidden from '../Errors/Forbidden';
import NotFound from '../Errors/NotFound';
import LoggedAccount from '../Types/LoggedAccount';
import AccountService from './AccountService';
import CashbackService from './CashbackService';

export default class TransactionService {
  private _transactionModel: ModelStatic<TransactionSequelize>;
  private _accountService: AccountService;
  private _cashbackService: CashbackService;
  private _cashbackModel: ModelStatic<CashbackSequelize>;

  constructor() {
    this._transactionModel = TransactionSequelize;
    this._cashbackModel = CashbackSequelize;
    this._cashbackService = new CashbackService();
    this._accountService = new AccountService();
  }

  private async UserExists(accountId: string): Promise<AccountSequelize> {
    const user = await this._accountService.Find(accountId);
    if (!user) throw new NotFound('Conta não encontrada');
    return user;
  }

  private async ThisUserTransaction(accountId: string, loggedUserId: string) {
    if (accountId !== loggedUserId) throw new Forbidden('Você não pode acessar as transações de outro usuário');
  }

  public async create(accountId: string, amount: number, loggedUser: LoggedAccount) {
    const t = await db.transaction();
    try {
      await this.UserExists(accountId);
      await this.ThisUserTransaction(accountId, loggedUser.id);

      const newTransaction = new Transaction(accountId, amount);

      const transaction = await this._transactionModel.create({
        accountId: newTransaction.accountId,
        amount: newTransaction.value,
        date: new Date(),
      }, { transaction: t });

      newTransaction.id = transaction.id;

      const cashbackConfig = await this._cashbackService.create(amount);
      const newCashback = new Cashback(accountId, transaction.id, cashbackConfig.rate);

      const cashback = await this._cashbackModel.create(
        {
          accountId: newCashback.accountId,
          transactionId: newCashback.transactionId,
          rate: newCashback.rate
        },
        { transaction: t }
      );
      newCashback.id = cashback.id;

      await t.commit();

      const result = {
        transactionId: newTransaction.id,
        accountId,
        date: transaction.date,
        value: newTransaction.value,
        cashback: newCashback.rate
      };
      return result;

    } catch (err) {
      await t.rollback();
      throw err;
    }
  }

  public async listByAccount(accountId: string, loggedUser: LoggedAccount) {
    await this.UserExists(accountId);
    await this.ThisUserTransaction(accountId, loggedUser.id);

    const transactions = await this._transactionModel.findAll({
      where: {
        accountId
      }
    });

    return transactions;
  }
}