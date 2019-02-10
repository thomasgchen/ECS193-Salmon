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

const createCase = (req, res) => {
  models.Case.create(req.body)
    .then(newCase => {
      res.status(201).json(newCase);
    })
    .catch(err => {
      res.status(400).send(err);
    });
};

const destroyCase = (req, res) => {
  models.Case.find({
    where: {
      id: req.body.id
    }
  })
    .then(foundCase => {
      if (!foundCase) {
        res.status(404).json({ error: `No case found with id ${req.body.id}` });
      }
      foundCase
        .destroy()
        .then(() => {
          res.status(204).json({ message: 'Case destroyed' });
        })
        .catch(error => {
          res.status(500).send(error);
        });
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

const updateCase = (req, res) => {
  models.Case.find({
    where: {
      id: req.body.id
    }
  })
    .then(foundCase => {
      if (!foundCase) {
        res.status(404).json({ error: `No case found with id ${req.body.id}` });
      }
      foundCase
        .update(req.body)
        .then(updatedCase => {
          res.status(200).json(updatedCase);
        })
        .catch(error => {
          res.status(500).send(error);
        });
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

module.exports = {
  getCases,
  createCase,
  destroyCase,
  updateCase
};
