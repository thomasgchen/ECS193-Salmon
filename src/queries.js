/* eslint-disable no-console */
const Sequelize = require('sequelize');
// eslint-disable-next-line no-unused-vars
const Case = require('../models/case');
const models = require('../models/index');

const connectionString = process.env.PGCONNECTSTRING;
const sequelize = new Sequelize(connectionString);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const getCases = (req, res) => {
  models.Case.findAll()
    .then(cases => {
      res.status(200).json(cases);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

module.exports = {
  getCases
};
