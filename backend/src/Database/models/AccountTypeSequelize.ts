import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import db from '.';

class AccountTypeSequelize extends Model<InferAttributes<AccountTypeSequelize>,
  InferCreationAttributes<AccountTypeSequelize, { omit: 'id' }>> {
  declare id: CreationOptional<number>;
  declare type: CreationOptional<string>;
}

AccountTypeSequelize.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  sequelize: db,
  modelName: 'accounts_types',
  timestamps: false,
  underscored: true,
});

export default AccountTypeSequelize;