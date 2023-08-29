import { DataTypes, Model, QueryInterface } from 'sequelize';
import ICashback from '../../Types/Cashback';

export default {
  async up(queryInterface: QueryInterface) {
    return queryInterface
      .createTable<Model<ICashback>>('cashbacks', {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        accountId: {
          type: DataTypes.UUID,
          allowNull: false,
          field: 'account_id',
        },
        transactionId: {
          type: DataTypes.UUID,
          allowNull: false,
          field: 'transaction_id',
        },
        rate: {
          type: DataTypes.DECIMAL(5, 4),
          allowNull: false,
        },
      });
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('cashbacks');
  }
};
