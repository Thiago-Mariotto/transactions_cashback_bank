import AccountSequelize from '../Database/models/AccountSequelize';
import NotAuthorized from '../Errors/NotAuthorized';
import { decodeToken } from '../Utils/TokenTools';

export default class AuthService {
  private _accountModel: typeof AccountSequelize;

  constructor() {
    this._accountModel = AccountSequelize;
  }

  public async validateToken(token: string) {
    this._accountModel.initialize();
    const decodedToken = decodeToken(token);
    const account = await this._accountModel
      .findByPk(decodedToken.id);
    if (!account) throw new NotAuthorized('Não autorizado');
    return decodedToken;
  }
}