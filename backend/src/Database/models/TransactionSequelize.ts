import { Association, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import db from '.';
import AccountSequelize from './AccountSequelize';

class TransactionSequelize extends Model<
  InferAttributes<TransactionSequelize>,
  InferCreationAttributes<TransactionSequelize, { omit: 'id' }>> {
  public id!: string;
  public amount!: number;
  public accountId!: string;
  public date!: Date;

  public static associations: {
    account: Association<TransactionSequelize, AccountSequelize>;
  };

  public static initialize() {
    this.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        accountId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'accounts',
            key: 'id',
          },
          field: 'account_id',
        },
        amount: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        sequelize: db,
        modelName: 'transactions',
        timestamps: false,
        underscored: true,
      }
    );

    this.belongsTo(AccountSequelize, { targetKey: 'id', foreignKey: 'accountId', as: 'account' });
    // this.belongsTo(CashbackSequelize, { foreignKey: 'transactionId', as: 'cashback' });
  }
}

export default TransactionSequelize;