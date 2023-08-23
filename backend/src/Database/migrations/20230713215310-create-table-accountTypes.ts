import { DataTypes, QueryInterface } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface) {
    return queryInterface
      .createTable('account_types', {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        type: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        }
      });
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('account_types');
  }
};
