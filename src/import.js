/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const csv = require('fast-csv');
const models = require('../models/index');

// TODO: Run in async job, and run db queries within transaction

const inputFilePath = path.join(__dirname, '..', 'db', 'lab_database.csv');
// const inputFilePath = path.join(__dirname, '..', 'db', 'lab_db_test.csv');
const errors = [];

fs.createReadStream(inputFilePath)
  .pipe(csv({ headers: true, ignoreEmpty: true }))
  .on('data', data => {
    try {
      const structuredData = _.mapValues(data, val => {
        return val || undefined;
      });

      models.Location.findOrCreate({
        where: {
          name: structuredData.location,
          latitude: structuredData.latitude,
          longitude: structuredData.longitude
        }
      }).spread(location => {
        models.Case.create({ ...structuredData, LocationId: location.dataValues.id });
      });
    } catch (err) {
      errors.push(err);
      console.log('Cant read entry');
    }
  })
  .on('end', () => {
    console.log(errors);
  });
