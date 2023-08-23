import supertest from 'supertest';
import { v4 as uuid } from 'uuid';
import db from '../../src/Database/models';
import AccountSequelize from '../../src/Database/models/AccountSequelize';
import CashbackSequelize from '../../src/Database/models/CashbackSequelize';
import TransactionSequelize from '../../src/Database/models/TransactionSequelize';
import AuthService from '../../src/Services/AuthService';
import { App } from '../../src/app';

describe('#POST /accounts/:accountId/transactions', function () {
  const app = new App().start(3999);

  afterAll(() => {
    app.close();
    jest.clearAllMocks();
  });

  test('deve ser possível registrar uma transação com sucesso', async function () {
    const userId = uuid();
    const transactionId = uuid();
    const userMock = { id: userId, name: 'John', email: 'j@mail.com' };

    AuthService.prototype.validateToken = jest.fn().mockReturnValueOnce(userMock); // stub do token
    AccountSequelize.findByPk = jest.fn()
      .mockReturnValueOnce(userMock)
      .mockReturnValueOnce(userMock); // stub do usuário
    TransactionSequelize.create = jest.fn().mockReturnValueOnce({ id: transactionId, accountId: userId, amount: 100, date: new Date() }); // stub da transação
    CashbackSequelize.create = jest.fn().mockReturnValueOnce({ id: uuid(), accountId: userId, rate: 0.1, transactionId }); // stub do cashback
    db.transaction = jest.fn().mockReturnValueOnce({ commit: jest.fn(), rollback: jest.fn() }); // stub da transaction do sequelize

    const response = await supertest(app).post(`/accounts/${userId}/transactions`)
      .send({ amount: 100, })
      .set('Authorization', 'fake_token');

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('transactionId');
    expect(response.body).toHaveProperty('accountId');
    expect(response.body).toHaveProperty('date');
    expect(response.body).toHaveProperty('value');
    expect(response.body).toHaveProperty('cashback');
    jest.clearAllMocks();
  });

  test('não deve ser possível realizar uma transação em contas diferentes', async function () {
    const userId = uuid();
    const anotherUserId = uuid();
    const userMock = { id: userId, name: 'John', email: 'j@mail.com' };

    AuthService.prototype.validateToken = jest.fn().mockReturnValueOnce(userMock); // stub do token
    AccountSequelize.findByPk = jest.fn()
      .mockReturnValueOnce(userMock)
      .mockReturnValueOnce(userMock); // stub do usuário

    db.transaction = jest.fn().mockReturnValueOnce({ commit: jest.fn(), rollback: jest.fn() }); // stub da transaction do sequelize

    const response = await supertest(app).post(`/accounts/${anotherUserId}/transactions`)
      .send({ amount: 100, })
      .set('Authorization', 'fake_token');

    expect(response.statusCode).toBe(403);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Você não pode acessar as transações de outro usuário');
    jest.clearAllMocks();
  });

  test('não deve ser possível realizar uma transação em uma conta inexistente', async function () {
    const userId = uuid();
    const userMock = { id: userId, name: 'John', email: 'j@mail.com' };

    AuthService.prototype.validateToken = jest.fn().mockReturnValueOnce(userMock); // stub do token
    AccountSequelize.findByPk = jest.fn()
      .mockReturnValueOnce(undefined);
    db.transaction = jest.fn().mockReturnValueOnce({ commit: jest.fn(), rollback: jest.fn() }); // stub da transaction do sequelize

    const response = await supertest(app).post(`/accounts/${userId}/transactions`)
      .send({ amount: 100, })
      .set('Authorization', 'fake_token');

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Conta não encontrada');
  });

  test('não deve ser possível realizar uma transação sem um token', async function () {
    const userId = uuid();

    const response = await supertest(app).post(`/accounts/${userId}/transactions`)
      .send({ amount: 100, });

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Token não encontrado');
  });

  test('não deve ser possível realizar uma transação com um valor inválido', async function () {
    const userId = uuid();
    const userMock = { id: userId, name: 'John', email: 'j@mail.com' };

    AuthService.prototype.validateToken = jest.fn().mockReturnValueOnce(userMock); // stub do token
    AccountSequelize.findByPk = jest.fn()
      .mockReturnValueOnce(userMock)
      .mockReturnValueOnce(userMock);
    db.transaction = jest.fn().mockReturnValueOnce({ commit: jest.fn(), rollback: jest.fn() }); // stub da transaction do sequelize

    const response = await supertest(app).post(`/accounts/${userId}/transactions`)
      .send({ amount: -100, })
      .set('Authorization', 'fake_token');

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Valor da transação inválido');
  });
});