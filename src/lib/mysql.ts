import { Sequelize } from 'sequelize';

import { env } from '@/env';

const mysql = new Sequelize({
  dialect: 'mysql',
  host: env.DB_FULFILLMENT_HOST,
  port: 3306, // Adjust if needed
  username: env.DB_FULFILLMENT_USERNAME,
  password: env.DB_FULFILLMENT_PASSWORD,
  database: env.DB_FULFILLMENT_DATABASE,
  logging: false, // Set to true for debugging
});

export default mysql;
