import { DataTypes, Model, QueryInterface } from 'sequelize';
import IAccount from '../../Types/Account';

export default {
  async up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IAccount>>('accounts', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      documentNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'document_number',
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      accountType: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'account_type',
      }
    });
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('accounts');
  }
};
