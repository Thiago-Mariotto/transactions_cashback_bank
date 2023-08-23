import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert(
      'account_types',
      [
        {
          id: 1,
          type: 'PF'
        },
        {
          id: 2,
          type: 'PJ'
        },
      ],
      {},
    );
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('account_types', {});
  },
};
