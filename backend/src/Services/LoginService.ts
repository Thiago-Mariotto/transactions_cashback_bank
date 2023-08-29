import { ModelStatic } from 'sequelize';
import AccountSequelize from '../Database/models/AccountSequelize';
import BadRequest from '../Errors/BadRequest';
import Login from '../Types/Login';
import { decrypt } from '../Utils/Crypt';
import { generateToken } from '../Utils/TokenTools';

export default class LoginService {
  private _model: ModelStatic<AccountSequelize>;
  constructor() {
    this._model = AccountSequelize;
  }

  public async Login(data: Login) {
    const account = await this._model.findOne({
      where: { email: data.email },
      attributes: ['id', 'email', 'password', 'name']
    });

    if (!account) {
      throw new BadRequest('Email ou senha inválidos');
    }

    const decodedPassword = decrypt(account.password);

    if (data.password !== decodedPassword) {
      throw new BadRequest('Email ou senha inválidos');
    }

    const newToken = generateToken({ id: account.id, name: account.name, email: account.email });
    return newToken;
  }
}