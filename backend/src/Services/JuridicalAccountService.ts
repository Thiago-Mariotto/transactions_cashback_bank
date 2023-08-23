import { ModelStatic } from 'sequelize';
import AccountSequelize from '../Database/models/AccountSequelize';
import JuridicalAccount from '../Entities/JuridicalAccount';
import BadRequest from '../Errors/BadRequest';
import IAccount from '../Interfaces/IAccount';
import AccountsType from '../Types/AccountTypes';
import { encrypt } from '../Utils/Crypt';

export default class JuridicalAccountService {

  constructor(private _model: ModelStatic<AccountSequelize>) { }

  public async CreateJuridical(account: IAccount): Promise<JuridicalAccount> {
    const newAccount = new JuridicalAccount(
      account.name,
      account.email,
      account.password,
      account.documentNumber
    );

    const emailAlreadyRegistered = await this._model.findOne({
      where: {
        email: account.email,
      },
    });

    if (emailAlreadyRegistered) throw new BadRequest('Email já cadastrado');

    const CNPJAlreadyRegistered = await this._model.findOne({
      where: {
        documentNumber: account.documentNumber,
      },
    });

    if (CNPJAlreadyRegistered) throw new BadRequest('CNPJ já cadastrado');

    const encryptedPassword = encrypt(account.password);
    newAccount.password = encryptedPassword;

    await this._model.create({
      name: newAccount.name,
      email: newAccount.email,
      password: newAccount.password,
      documentNumber: newAccount.CNPJ,
      accountType: AccountsType.JURIDICAL,
    });

    return newAccount;
  }
}