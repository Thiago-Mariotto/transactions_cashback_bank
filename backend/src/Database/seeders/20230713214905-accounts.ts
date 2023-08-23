import { QueryInterface } from 'sequelize';
import { v4 as UUID } from 'uuid';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert(
      'accounts',
      [
        {
          id: '5c965ee0-5438-4581-9aaf-b730b259022f',
          document_number: '010.942.777-70',
          name: 'João da Silva',
          email: 'joao@mail.com',
          password: 'U2FsdGVkX1/mlywDErbTyb2sEWpM11ejAtwTRyWgJ6s=',
          active: true,
          account_type: 1,
        },
        {
          id: '809d58e2-65eb-4b09-a3e7-a242795b69c1',
          document_number: '724.822.337-98',
          name: 'Maria da Silva',
          email: 'ma@mail.com',
          password: 'U2FsdGVkX1/mlywDErbTyb2sEWpM11ejAtwTRyWgJ6s=',
          active: false,
          account_type: 1,
        },
        {
          id: UUID(),
          document_number: '02.108.024/0001-94',
          name: 'ALPHA COMICS',
          email: 'ac@mail.com',
          password: 'U2FsdGVkX1/mlywDErbTyb2sEWpM11ejAtwTRyWgJ6s=',
          active: true,
          account_type: 2,
        },
        {
          id: UUID(),
          document_number: '25.372.981/0001-29',
          name: 'BETA COMICS',
          email: 'beta@comics.com',
          password: 'U2FsdGVkX1/mlywDErbTyb2sEWpM11ejAtwTRyWgJ6s=',
          active: false,
          account_type: 2,
        },
      ],
      {},
    );

  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('accounts', {});
  },
};
