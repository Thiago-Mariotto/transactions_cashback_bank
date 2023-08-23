import { QueryInterface } from 'sequelize';
import { v4 as UUID } from 'uuid';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert(
      'cashbacks',
      [
        {
          id: UUID(),
          account_id: '5c965ee0-5438-4581-9aaf-b730b259022f',
          transaction_id: '9bb8ab8a-4e2a-4ee6-ba0e-8c3f3be021e9',
          rate: 0.005,
        },
        {
          id: UUID(),
          account_id: '809d58e2-65eb-4b09-a3e7-a242795b69c1',
          transaction_id: 'cdc34539-7a56-4493-9d7d-5210bf3c199a',
          rate: 0.015,
        },
      ],
      {},
    );
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('cashbacks', {});
  },
};
