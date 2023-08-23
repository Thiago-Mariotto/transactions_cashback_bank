import supertest from 'supertest';
import AccountSequelize from '../../src/Database/models/AccountSequelize';
import { App } from '../../src/app';
import { validCPFAccount } from './mocks/PersonalAccount.mock';

describe('## POST /accounts', function () {
  const app = new App().start(3999);

  afterAll(() => {
    app.close();
    jest.clearAllMocks();
  });

  test('deve ser possível registrar uma conta CPF com sucesso', async () => {
    AccountSequelize.findOne = jest.fn()
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce(null);
    AccountSequelize.create = jest.fn()
      .mockResolvedValueOnce(null);

    const response = await supertest(app)
      .post('/accounts')
      .send(validCPFAccount);

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('Conta criada');
  });

  test('não deve ser possível cadastrar uma conta CPF com um e-mail já cadastrado', async () => {
    AccountSequelize.findOne = jest.fn()
      .mockResolvedValueOnce(validCPFAccount);

    AccountSequelize.create = jest.fn()
      .mockResolvedValueOnce(null);

    const response = await supertest(app)
      .post('/accounts')
      .send(validCPFAccount);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Email já cadastrado');
  });

  test('não deve ser possível cadastrar uma conta CPF com um CPF já cadastrado', async () => {
    AccountSequelize.findOne = jest.fn()
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce({ ...validCPFAccount, email: 'test@mail.com' });

    AccountSequelize.create = jest.fn()
      .mockResolvedValueOnce(null);

    const response = await supertest(app)
      .post('/accounts')
      .send(validCPFAccount);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('CPF já cadastrado');
  });

  test('não deve ser possível cadastrar uma conta CPF com um e-mail inválido', async () => {
    AccountSequelize.create = jest.fn()
      .mockResolvedValueOnce(null);

    const response = await supertest(app)
      .post('/accounts')
      .send({ ...validCPFAccount, email: 'mk@mail' });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Email inválido');
  });

  test('não deve ser possível registrar uma conta CPF com um nome inválido', async () => {
    AccountSequelize.create = jest.fn()
      .mockResolvedValueOnce(null);

    const response = await supertest(app)
      .post('/accounts')
      .send({ ...validCPFAccount, name: 'M' });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Nome precisa ter pelo menos 2 caracteres');
  });

  test('não deve ser possível registrar uma conta CPF com um número de documento inválido', async () => {
    AccountSequelize.create = jest.fn()
      .mockResolvedValueOnce(null);

    const response = await supertest(app)
      .post('/accounts')
      .send({ ...validCPFAccount, documentNumber: '123456789' });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('CPF inválido');
  });

  test('não deve ser possível cadastrar uma conta de CPF com uma senha inválida com 5 caracteres', async () => {
    AccountSequelize.create = jest.fn()
      .mockResolvedValueOnce(null);

    const response = await supertest(app)
      .post('/accounts')
      .send({ ...validCPFAccount, password: '123' });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Senha precisa ter no mínimo 6 caracteres');
  });

  test('não deve ser possível cadastrar uma conta de CPF com uma senha inválida com 65 caracteres', async () => {
    AccountSequelize.create = jest.fn()
      .mockResolvedValueOnce(null);

    const response = await supertest(app)
      .post('/accounts')
      .send({ ...validCPFAccount, password: 'HyTLxEq39yEildGdpumQUaZJPCcKNaNdquLSmRedLsJIe820SLP9tZWu06q2Luvs4g' });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Senha precisa ter no máximo 64 caracteres');
  });
});