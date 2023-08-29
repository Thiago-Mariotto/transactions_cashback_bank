import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model
} from 'sequelize';
import db from '.';

class CashbackSequelize extends Model<
  InferAttributes<CashbackSequelize>,
  InferCreationAttributes<CashbackSequelize, { omit: 'id' }>> {
  declare id: CreationOptional<string>;
  declare rate: CreationOptional<number>;
  declare accountId: CreationOptional<string>;
  declare transactionId: CreationOptional<string>;
}

CashbackSequelize.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  accountId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'accounts',
      key: 'id',
    }
  },
  transactionId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'transactions',
      key: 'id',
    }
  },
  rate: {
    type: DataTypes.DECIMAL(3, 3),
    allowNull: false,
  }
}, {
  sequelize: db,
  modelName: 'cashbacks',
  timestamps: false,
  underscored: true,
});
// this.belongsTo(TransactionSequelize, { foreignKey: 'transactionId', as: 'transaction' });

export default CashbackSequelize;
