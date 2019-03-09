/* eslint-disable no-console */
// const fs = require('fs');
const AWS = require('aws-sdk');
const _ = require('lodash');
const Sequelize = require('sequelize');
const models = require('../../models');

const { Op } = Sequelize;

const groupByLocationName = (value, index, collection) => value['Location.name'];
const groupBySpecies = (value, index, collection) => value.species;
const groupByAge = (value, index, collection) => value.age;
const groupByPathogen = (value, index, collection) => value.pathogen;
const graphData = {};
// TODO: Run in async job, and run db queries within transaction

console.log('Creating GRAPH 1: Pathogens Detected per Locations');
// One data point: { location: "river", IHN: 1000, CTV: 400}
const p1 = models.Case.findAll({
  where: {
    [Op.or]: [{ pathogen: 'IHN' }, { pathogen: 'CTV' }]
  },
  attributes: { exclude: ['createdAt', 'updatedAt'] },
  include: [{ model: models.Location, attributes: ['name'] }],
  raw: true
}).then(foundCases => {
  const casesByLocation = _(foundCases)
    .groupBy(groupByLocationName)
    .map((cases, location) => ({ location, cases }))
    .value();
  const result = casesByLocation.map(singleLocation => {
    const casesByPathogen = _(singleLocation.cases)
      .groupBy(groupByPathogen)
      .mapValues(cases => cases.length)
      .value();
    return { location: singleLocation.location, ...casesByPathogen };
  });
  graphData.pathogensPerLocation = result;
});

// TODO: GRAPH 2

console.log('Creating GRAPH 3: Pathogens detected per species');
// One data point: { species: "COHO", IHN: 1000, CTV: 400}
const p3 = models.Case.findAll({
  where: {
    [Op.or]: [{ pathogen: 'IHN' }, { pathogen: 'CTV' }]
  },
  attributes: { exclude: ['createdAt', 'updatedAt'] },
  raw: true
}).then(foundCases => {
  const casesBySpecies = _(foundCases)
    .groupBy(groupBySpecies)
    .map((cases, species) => ({ species, cases }))
    .value();
  const result = casesBySpecies.map(singleSpecies => {
    const casesByPathogen = _(singleSpecies.cases)
      .groupBy(groupByPathogen)
      .mapValues(cases => cases.length)
      .value();
    return { species: singleSpecies.species, ...casesByPathogen };
  });
  graphData.pathogensPerSpecies = result;
});

console.log('Creating GRAPH 4: Pathogens detected per age');
// One data point: { age: "adult", IHN: 1000, CTV: 400}
const p4 = models.Case.findAll({
  where: {
    [Op.or]: [{ pathogen: 'IHN' }, { pathogen: 'CTV' }]
  },
  attributes: { exclude: ['createdAt', 'updatedAt'] },
  raw: true
}).then(foundCases => {
  const casesByAge = _(foundCases)
    .groupBy(groupByAge)
    .map((cases, age) => ({ age, cases }))
    .value();
  const result = casesByAge.map(singleAge => {
    const casesByPathogen = _(singleAge.cases)
      .groupBy(groupByPathogen)
      .mapValues(cases => cases.length)
      .value();
    return { age: singleAge.age, ...casesByPathogen };
  });
  graphData.pathogensPerAge = result;
});

Promise.all([p1, p3, p4]).then(() => {
  console.log('graphData', graphData);

  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  });

  // const base64data = Buffer.from(JSON.stringify(graphData)).toString('base64');

  const S3 = new AWS.S3();
  const params = {
    Bucket: process.env.AWS_BUCKET,
    Key: 'graphData.json',
    Body: JSON.stringify(graphData),
    ACL: 'public-read',
    ContentType: 'application/JSON'
  };

  S3.upload(params, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Uploaded.');
      console.log(res);
    }
  });

  // fs.writeFile('temp.txt', JSON.stringify(graphData), (err, data) => {
  //   if (err) console.log(err);
  //   console.log('Successfully Written to File.');
  // });
});
