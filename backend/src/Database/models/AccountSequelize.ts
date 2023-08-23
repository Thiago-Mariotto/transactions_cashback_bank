import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model
} from 'sequelize';
import { V4Options } from 'uuid';
import db from '.';

class AccountSequelize extends Model<
  InferAttributes<AccountSequelize>,
  InferCreationAttributes<AccountSequelize, { omit: 'id' }>
> {
  declare id: CreationOptional<V4Options>;
  declare documentNumber: CreationOptional<string>;
  declare name: CreationOptional<string>;
  declare email: CreationOptional<string>;
  declare password: CreationOptional<string>;
  declare active: CreationOptional<boolean>;
  declare accountType: CreationOptional<number>;

  public static initialize() {
    this.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      documentNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      accountType: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'account_types',
          key: 'id',
        }
      }
    }, {
      sequelize: db,
      modelName: 'accounts',
      timestamps: false,
      underscored: true,
    });

    // this.hasMany(TransactionSequelize, {
    //   foreignKey: 'accountId',
    //   as: 'transactions'
    // });
  }
}

export default AccountSequelize;
