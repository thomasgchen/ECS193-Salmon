/* eslint-disable no-console */
const Sequelize = require('sequelize');
const _ = require('lodash');
// eslint-disable-next-line no-unused-vars
const hash = require('object-hash');
const models = require('../models/index');

const connectionString = process.env.DATABASE_URL;
const sequelize = new Sequelize(connectionString);
const graphs = require('./graphs');
const saveFileToAWS = require('./jobs/saveFileToAWS');

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
    attributes: { exclude: ['createdAt', 'updatedAt', 'precipitationYearly', 'temperatureMax'] },
    include: [{ model: models.Location, attributes: ['name'] }],
    raw: true
  });
};

const downloadCases = query => {
  return models.Case.findAll({
    where: query,
    order: [['id', 'ASC']],
    attributes: { exclude: ['createdAt', 'updatedAt', 'id'] },
    include: [{ model: models.Location, attributes: ['name', 'latitude', 'longitude'] }],
    raw: true
  });
};

const getDataExplorerCasesRaw = query => {
  const structuredQuery = _.mapValues(query, attr => _.split(attr, '~'));
  return models.Case.findAll({
    where: structuredQuery,
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'comments', 'confidence', 'fish', 'id']
    },
    include: [{ model: models.Location, attributes: ['name'] }],
    raw: true
  });
};

const getDataExplorerCases = (query, groupBy) => {
  return models.Case.findAll({
    limit: 1,
    order: [['createdAt', 'DESC']]
  }).then(newestEntry => {
    // Generate Explorer Hash (query values into hash - last updated case date.json)
    const queryHash = hash(query);
    const versionHash = hash(newestEntry[0].dataValues.updatedAt);
    const dataHash = `${queryHash}-${versionHash}`;
    console.log('GETing data for: ', dataHash);
    // TODO: Check AWS (lookup queryHash.json)
    // TODO: If found is it valid? (check if hashIdentifier == dataHash)
    // --> Return valid AWS
    // Else Create new
    return getDataExplorerCasesRaw(query).then(rawData => {
      console.log('Length', rawData.length);
      // Create All Graphs
      const graphData = {
        hashIdentifier: dataHash,
        dataLength: rawData.length,
        graphs: {
          prevalenceOverTime: graphs.createGraphByTime(rawData, groupBy),
          graphBySpecies: graphs.createGraphByGrouping(rawData, 'species'),
          graphByPathogen: graphs.createGraphByGrouping(rawData, 'pathogen'),
          graphByAge: graphs.createGraphByGrouping(rawData, 'age')
        }
      };
      console.log('graphdata', graphData);
      // Save to AWS
      saveFileToAWS.uploadFile(graphData, `explorerData-${dataHash}.json`);
      return graphData;
    });
  });
};

const createCase = (req, res) => {
  models.Case.create(req.body)
    .then(newCase => {
      models.Case.findOne({
        where: { id: newCase.id },
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'precipitationYearly', 'temperatureMax']
        },
        include: [{ model: models.Location, attributes: ['name'] }],
        raw: true
      })
        .then(foundCase => {
          res.status(201).json(foundCase);
        })
        .catch(err => {
          res.status(500).send(err);
        });
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
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'precipitationYearly', 'temperatureMax']
            },
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
  updateCase,
  getDataExplorerCases,
  downloadCases
};
