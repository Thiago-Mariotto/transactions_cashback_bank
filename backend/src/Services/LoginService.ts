import AccountSequelize from '../Database/models/AccountSequelize';
import BadRequest from '../Errors/BadRequest';
import ILogin from '../Interfaces/ILogin';
import { decrypt } from '../Utils/Crypt';
import { generateToken } from '../Utils/TokenTools';

export default class LoginService {
  private _model: typeof AccountSequelize;
  constructor() {
    this._model = AccountSequelize;
  }

  public async Login(data: ILogin) {
    this._model.initialize();
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