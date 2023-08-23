import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert(
      'transactions',
      [
        {
          id: '9bb8ab8a-4e2a-4ee6-ba0e-8c3f3be021e9',
          account_id: '9bb8ab8a-4e2a-4ee6-ba0e-8c3f3be021e9',
          amount: 94.98,
          date: new Date()
        },
        {
          id: 'cdc34539-7a56-4493-9d7d-5210bf3c199a',
          account_id: '809d58e2-65eb-4b09-a3e7-a242795b69c1',
          amount: 178987.76,
          date: new Date()
        },
      ],
      {},
    );
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('transactions', {});
  },
};
