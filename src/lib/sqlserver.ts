import { Sequelize } from 'sequelize';

import { env } from '@/env';

const sqlserver = new Sequelize({
  dialect: 'mssql',
  host: env.DB_BDENTER_HOST,
  username: env.DB_BDENTER_USERNAME,
  password: env.DB_BDENTER_PASSWORD,
  database: env.DB_BDENTER_DATABASE,
  logging: false, // Set to true for debugging
});

export default sqlserver;
