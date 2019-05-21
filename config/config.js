require('dotenv').load();

// eslint-disable-next-line prefer-destructuring
const parse = require('pg-connection-string').parse;

const config = parse(process.env.DATABASE_URL);

module.exports = {
  development: {
    username: config.user,
    password: config.password,
    database: config.database,
    host: config.host,
    dialect: 'postgres',
    logging: false
  },
  test: {
    username: config.user,
    password: config.password,
    database: config.database,
    host: config.host,
    dialect: 'postgres'
  },
  production: {
    username: config.user,
    password: config.password,
    database: config.database,
    host: config.host,
    dialect: 'postgres'
  }
};
