import supertest from 'supertest';
import AccountSequelize from '../../src/Database/models/AccountSequelize';
import { App } from '../../src/app';

describe('## POST /login', function () {
  const app = new App().start(3999);

  afterAll(() => {
    app.close();
    jest.clearAllMocks();
  });

  test('it should be possible to login a account successfully', async () => {
    AccountSequelize.findOne = jest.fn()
      .mockReturnValueOnce({ id: 1, name: 'John', email: 'j@mail.com', password: 'U2FsdGVkX1/mlywDErbTyb2sEWpM11ejAtwTRyWgJ6s=' });

    const response = await supertest(app).post('/login').send({
      email: 'j@mail.com',
      password: 'password'
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  test('it not should be possible to login a account with invalid email', async () => {
    AccountSequelize.findOne = jest.fn()
      .mockReturnValueOnce(null);

    const response = await supertest(app).post('/login').send({
      email: 'j@mail.com',
      password: 'password'
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Email ou senha inválidos');
  });

  test('it not should be possible to login a account with invalid password', async () => {
    AccountSequelize.findOne = jest.fn()
      .mockReturnValueOnce({ id: 1, name: 'John', email: 'j@mail.com', password: 'U2FsdGVkX1/mlywDErbTyb2sEWpM11ejAtwTRyWgJ6s=' });

    const response = await supertest(app).post('/login').send({
      email: 'j@mail.com',
      password: 'invalid password'
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Email ou senha inválidos');
  });
});