import { ModelStatic } from 'sequelize';
import AccountSequelize from '../Database/models/AccountSequelize';
import NotAuthorized from '../Errors/NotAuthorized';
import { decodeToken } from '../Utils/TokenTools';

export default class AuthService {
  private _accountModel: ModelStatic<AccountSequelize>;

  constructor() {
    this._accountModel = AccountSequelize;
  }

  public async validateToken(token: string) {
    const decodedToken = decodeToken(token);
    const account = await this._accountModel
      .findByPk(decodedToken.id);
    if (!account) throw new NotAuthorized('Não autorizado');
    return decodedToken;
  }
}