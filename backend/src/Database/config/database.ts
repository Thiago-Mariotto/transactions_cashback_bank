import * as dotenv from 'dotenv';
import { Options } from 'sequelize';
dotenv.config();

const { DATABASE_NAME } = process.env;
const devDatabaseName = `${process.env.DATABASE_NAME}_${process.env.NODE_ENV}` || 'bank_development';
const databaseName = process.env.NODE_ENV === 'production' ? DATABASE_NAME : devDatabaseName;
const config: Options = {
  username: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASSWORD || 'password',
  database: databaseName,
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number(process.env.DATABASE_PORT) || 3306,
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false,
};

export = config;
