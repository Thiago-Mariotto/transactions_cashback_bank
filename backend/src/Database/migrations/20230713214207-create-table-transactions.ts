import { DataTypes, Model, QueryInterface } from 'sequelize';
import ITransaction from '../../Interfaces/ITransaction';

export default {
  async up(queryInterface: QueryInterface) {
    return queryInterface
      .createTable<Model<ITransaction>>('transactions', {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        accountId: {
          type: DataTypes.UUID,
          allowNull: false,
          unique: true,
          field: 'account_id',
        },
        amount: {
          type: DataTypes.DECIMAL,
          allowNull: false,
        },
        date: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        }
      });
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('transactions');
  }
};
