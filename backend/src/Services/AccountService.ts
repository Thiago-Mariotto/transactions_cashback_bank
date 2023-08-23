/* eslint-disable indent */
import { ModelStatic } from 'sequelize';
import AccountSequelize from '../Database/models/AccountSequelize';
import { JuridicalAccount, PersonAccount } from '../Entities';
import BadRequest from '../Errors/BadRequest';
import IAccount from '../Interfaces/IAccount';
import JuridicalAccountService from './JuridicalAccountService';
import PersonalAccountService from './PersonalAccountService';

export default class AccountService {
  private _model: ModelStatic<AccountSequelize>;
  constructor() {
    this._model = AccountSequelize;
  }

  public async List(): Promise<AccountSequelize[]> {
    const accounts = await this._model.findAll();
    return accounts;
  }

  public async Find(id: string): Promise<AccountSequelize | null> {
    const account = await this._model.findByPk(id);
    return account;
  }

  public async Create(account: IAccount): Promise<JuridicalAccount | PersonAccount | Error> {
    switch (account.accountType) {
      case 1:
        return await new PersonalAccountService(this._model).CreatePersonal(account);
      case 2:
        return await new JuridicalAccountService(this._model).CreateJuridical(account);
      default:
        throw new BadRequest('Tipo de conta inválido');
    }
  }
}