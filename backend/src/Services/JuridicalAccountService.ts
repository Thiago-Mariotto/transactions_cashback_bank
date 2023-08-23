import { ModelStatic } from 'sequelize';
import AccountSequelize from '../Database/models/AccountSequelize';
import JuridicalAccount from '../Entities/JuridicalAccount';
import BadRequest from '../Errors/BadRequest';
import Account from '../Types/Account';
import AccountsType from '../Types/AccountTypes';
import LoggedAccount from '../Types/LoggedAccount';
import { decrypt, encrypt } from '../Utils/Crypt';

export default class JuridicalAccountService {

  constructor(private _model: ModelStatic<AccountSequelize>) { }

  public async CreateJuridical(account: Account): Promise<JuridicalAccount> {
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

  private validateUpdateAccount(updateAccount: Account, accountDatabase: AccountSequelize) {
    if (updateAccount.password !== decrypt(accountDatabase.password)) {
      const encryptedPassword = encrypt(updateAccount.password);
      updateAccount.password = encryptedPassword;
    }
    if (accountDatabase.dataValues.documentNumber !== updateAccount.documentNumber) {
      throw new BadRequest('CPF não pode ser alterado');
    }
    if (accountDatabase.dataValues.accountType !== updateAccount.accountType) {
      throw new BadRequest('Tipo de conta não pode ser alterado');
    }
  }

  public async UpdateJuridical(updateAccount: Account, loggedAccount: LoggedAccount): Promise<void | Error> {
    const accountDatabase = await this._model.findByPk(updateAccount.id);

    if (!accountDatabase) throw new BadRequest('Conta não encontrada');
    if (accountDatabase.id !== loggedAccount.id) {
      console.log(accountDatabase.id, loggedAccount.id);
      throw new BadRequest('Você não pode alterar os dados de outra conta');
    }
    this.validateUpdateAccount(updateAccount, accountDatabase);

    await this._model.update({
      name: updateAccount.name,
      email: updateAccount.email,
      password: updateAccount.password,
    }, {
      where: { id: updateAccount.id },
    });
  }
}