import supertest from 'supertest';
import AccountSequelize from '../../src/Database/models/AccountSequelize';
import { App } from '../../src/app';
import { validCNPJAccount } from './mocks/JuridicalAccount.mock';

describe('## POST /accounts', function () {
  const app = new App().start(3999);

  afterAll(() => {
    app.close();
    jest.clearAllMocks();
  });

  test('deve ser possível registrar uma conta CNPJ com sucesso', async () => {
    AccountSequelize.findOne = jest.fn()
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce(null);
    AccountSequelize.create = jest.fn()
      .mockResolvedValueOnce(null);

    const response = await supertest(app)
      .post('/accounts')
      .send(validCNPJAccount);

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('Conta criada');
  });

  test('não deve ser possível cadastrar uma conta no CNPJ com um e-mail já cadastrado', async () => {
    AccountSequelize.findOne = jest.fn()
      .mockResolvedValueOnce(validCNPJAccount);

    AccountSequelize.create = jest.fn()
      .mockResolvedValueOnce(null);

    const response = await supertest(app)
      .post('/accounts')
      .send(validCNPJAccount);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Email já cadastrado');
  });

  test('não deveria ser possível cadastrar uma conta CNPJ com um CNPJ já cadastrado', async () => {
    AccountSequelize.findOne = jest.fn()
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce({ ...validCNPJAccount, email: 'test@mail.com' });

    AccountSequelize.create = jest.fn()
      .mockResolvedValueOnce(null);

    const response = await supertest(app)
      .post('/accounts')
      .send(validCNPJAccount);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('CNPJ já cadastrado');
  });

  test('não deveria ser possível cadastrar uma conta CNPJ com um e-mail inválido', async () => {
    AccountSequelize.create = jest.fn()
      .mockResolvedValueOnce(null);

    const response = await supertest(app)
      .post('/accounts')
      .send({ ...validCNPJAccount, email: 'mk@mail' });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Email inválido');
  });

  test('não deve ser possível cadastrar uma conta CNPJ com um número de documento inválido', async () => {
    AccountSequelize.findOne = jest.fn()
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce(null);

    AccountSequelize.create = jest.fn()
      .mockResolvedValueOnce(null);

    const response = await supertest(app)
      .post('/accounts')
      .send({ ...validCNPJAccount, documentNumber: '123456789' });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('CNPJ inválido');
  });

  test('não deveria ser possível cadastrar uma conta CNPJ com uma senha inválida com 5 caracteres', async () => {
    AccountSequelize.create = jest.fn()
      .mockResolvedValueOnce(null);

    const response = await supertest(app)
      .post('/accounts')
      .send({ ...validCNPJAccount, password: '123' });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Senha precisa ter no mínimo 6 caracteres');
  });

  test('não deve ser possível cadastrar uma conta CNPJ com uma senha inválida com 65 caracteres', async () => {
    AccountSequelize.create = jest.fn()
      .mockResolvedValueOnce(null);

    const response = await supertest(app)
      .post('/accounts')
      .send({ ...validCNPJAccount, password: 'HyTLxEq39yEildGdpumQUaZJPCcKNaNdquLSmRedLsJIe820SLP9tZWu06q2Luvs4g' });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Senha precisa ter no máximo 64 caracteres');
  });
});