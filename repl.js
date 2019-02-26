/* eslint-disable no-console */
const Sequelize = require('sequelize');
const repl = require('repl');
// eslint-disable-next-line no-unused-vars
const Case = require('./models/case');
const models = require('./models/index');

const connectionString = process.env.DATABASE_URL;
const sequelize = new Sequelize(connectionString);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// open the repl session
const replServer = repl.start({});

// attach modules to the repl context
replServer.context.db = models;
