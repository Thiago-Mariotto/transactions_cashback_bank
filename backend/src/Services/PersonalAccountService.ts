import { ModelStatic } from 'sequelize';
import AccountSequelize from '../Database/models/AccountSequelize';
import PersonAccount from '../Entities/PersonAccount';
import BadRequest from '../Errors/BadRequest';
import IAccount from '../Interfaces/IAccount';
import AccountsType from '../Types/AccountTypes';
import { encrypt } from '../Utils/Crypt';

export default class PersonalAccountService {
  constructor(private _model: ModelStatic<AccountSequelize>) { }

  public async CreatePersonal(account: IAccount): Promise<PersonAccount | Error> {

    const newAccount = new PersonAccount(
      account.name,
      account.email,
      account.password,
      account.documentNumber,
    );

    const emailAlreadyRegistered = await this._model.findOne({
      where: {
        email: account.email,
      },
    });

    if (emailAlreadyRegistered) throw new BadRequest('Email já cadastrado');

    const CPFAlreadyRegistered = await this._model.findOne({
      where: {
        documentNumber: account.documentNumber,
      },
    });

    if (CPFAlreadyRegistered) throw new BadRequest('CPF já cadastrado');

    const encryptedPassword = encrypt(account.password);
    newAccount.password = encryptedPassword;

    await this._model.create({
      name: newAccount.name,
      email: newAccount.email,
      password: newAccount.password,
      documentNumber: newAccount.CPF,
      accountType: AccountsType.PERSONAL,
    });

    return newAccount;
  }
}