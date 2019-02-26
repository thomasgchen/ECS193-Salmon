/* eslint-disable no-console */
const Sequelize = require('sequelize');
// eslint-disable-next-line no-unused-vars
const models = require('../models/index');

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

const getLocations = () => {
  return models.Location.findAll({
    raw: true
  });
};

const getCases = (page, query) => {
  const limit = 50;
  return models.Case.findAll({
    where: query,
    order: [['id', 'ASC']],
    limit,
    offset: limit * (page || 0),
    attributes: { exclude: ['createdAt', 'updatedAt', 'LocationId'] },
    include: [{ model: models.Location, attributes: ['name'] }],
    raw: true
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
          res.status(200).json({ message: 'Case destroyed', id: req.body.id });
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
          models.Case.findOne({
            where: { id: updatedCase.id },
            attributes: { exclude: ['createdAt', 'updatedAt', 'LocationId'] },
            include: [{ model: models.Location, attributes: ['name'] }],
            raw: true
          }).then(caseObj => {
            res.status(200).json(caseObj);
          });
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
  getLocations,
  getCases,
  createCase,
  destroyCase,
  updateCase
};
