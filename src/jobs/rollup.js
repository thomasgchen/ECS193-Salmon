/* eslint-disable no-loop-func */
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
const countNumPositive = cases => _.reduce(cases, (sum, c) => sum + c.numPositive, 0);
const meanPrevalence = cases => {
  const totalNumFish = _.sumBy(cases, 'numFish');
  const totalNumPositive = _.sumBy(cases, 'numPositive');
  return totalNumPositive / totalNumFish;
};

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
      .mapValues(cases => countNumPositive(cases))
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
      .mapValues(cases => countNumPositive(cases))
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
      .mapValues(cases => countNumPositive(cases))
      .value();
    return { age: singleAge.age, ...casesByPathogen };
  });
  graphData.pathogensPerAge = result;
});

console.log('Creating GRAPH 5: Prevalence of Pathogens Detected per Locations');
// One data point: { location: "river", IHN: .3, CTV: .2}
const p5 = models.Case.findAll({
  where: {
    [Op.or]: [{ pathogen: 'IHN' }, { pathogen: 'CTV' }, { pathogen: null }]
  },
  attributes: { exclude: ['createdAt', 'updatedAt'] },
  include: [{ model: models.Location, attributes: ['name'] }],
  raw: true
}).then(foundCases => {
  let casesByLocation = _(_.reject(foundCases, c => c.pathogen === null && c.numPositive > 0))
    .groupBy(groupByLocationName)
    .map((cases, location) => ({ location, cases }))
    .value();
  casesByLocation = _.reject(casesByLocation, singleLocation => singleLocation.cases.length < 5);
  const result = casesByLocation.map(singleLocation => {
    let casesByPathogen = _(singleLocation.cases)
      .groupBy(groupByPathogen)
      .value();
    if (casesByPathogen.IHN && casesByPathogen.null)
      casesByPathogen.IHN = [...casesByPathogen.IHN, ...casesByPathogen.null];
    if (casesByPathogen.CTV && casesByPathogen.null)
      casesByPathogen.CTV = [...casesByPathogen.CTV, ...casesByPathogen.null];
    casesByPathogen = _.pick(casesByPathogen, ['IHN', 'CTV']);
    casesByPathogen = _.mapValues(casesByPathogen, cases => meanPrevalence(cases));
    return { location: singleLocation.location, ...casesByPathogen };
  });

  graphData.prevalencePerLocation = _.reject(result, loc => _.size(loc) === 1).map(singleLocation =>
    _.defaults(singleLocation, { IHN: 0 }, { CTV: 0 })
  );
});

console.log('Creating GRAPH 6: Prevalence of Pathogens Detected per Species');
// One data point: { species: "RT", IHN: .3, CTV: .2}
const p6 = models.Case.findAll({
  where: {
    [Op.or]: [{ pathogen: 'IHN' }, { pathogen: 'CTV' }, { pathogen: null }]
  },
  attributes: { exclude: ['createdAt', 'updatedAt'] },
  include: [{ model: models.Location, attributes: ['name'] }],
  raw: true
}).then(foundCases => {
  let casesBySpecies = _(_.reject(foundCases, c => c.pathogen === null && c.numPositive > 0))
    .groupBy(groupBySpecies)
    .map((cases, species) => ({ species, cases }))
    .value();
  casesBySpecies = _.reject(casesBySpecies, singleSpecies => singleSpecies.cases.length < 5);
  const result = casesBySpecies.map(singleSpecies => {
    let casesByPathogen = _(singleSpecies.cases)
      .groupBy(groupByPathogen)
      .value();
    if (casesByPathogen.IHN && casesByPathogen.null)
      casesByPathogen.IHN = [...casesByPathogen.IHN, ...casesByPathogen.null];
    if (casesByPathogen.CTV && casesByPathogen.null)
      casesByPathogen.CTV = [...casesByPathogen.CTV, ...casesByPathogen.null];
    casesByPathogen = _.pick(casesByPathogen, ['IHN', 'CTV']);
    casesByPathogen = _.mapValues(casesByPathogen, cases => meanPrevalence(cases));
    return { species: singleSpecies.species, ...casesByPathogen };
  });

  graphData.prevalencePerSpecies = _.reject(result, loc => _.size(loc) === 1).map(singleSpecies =>
    _.defaults(singleSpecies, { IHN: 0 }, { CTV: 0 })
  );
});

console.log('Creating GRAPH 7: Prevalence of Pathogens Detected per Age');
// One data point: { age: "0", IHN: .3, CTV: .2}
const p7 = models.Case.findAll({
  where: {
    [Op.or]: [{ pathogen: 'IHN' }, { pathogen: 'CTV' }, { pathogen: null }]
  },
  attributes: { exclude: ['createdAt', 'updatedAt'] },
  include: [{ model: models.Location, attributes: ['name'] }],
  raw: true
}).then(foundCases => {
  let casesByAge = _(_.reject(foundCases, c => c.pathogen === null && c.numPositive > 0))
    .groupBy(groupByAge)
    .map((cases, age) => ({ age, cases }))
    .value();
  casesByAge = _.reject(casesByAge, singleAge => singleAge.cases.length < 5);
  const result = casesByAge.map(singleAge => {
    let casesByPathogen = _(singleAge.cases)
      .groupBy(groupByPathogen)
      .value();
    if (casesByPathogen.IHN && casesByPathogen.null)
      casesByPathogen.IHN = [...casesByPathogen.IHN, ...casesByPathogen.null];
    if (casesByPathogen.CTV && casesByPathogen.null)
      casesByPathogen.CTV = [...casesByPathogen.CTV, ...casesByPathogen.null];
    casesByPathogen = _.pick(casesByPathogen, ['IHN', 'CTV']);
    casesByPathogen = _.mapValues(casesByPathogen, cases => meanPrevalence(cases));
    return { age: singleAge.age, ...casesByPathogen };
  });

  graphData.prevalencePerAge = _.reject(result, loc => _.size(loc) === 1).map(singleAge =>
    _.defaults(singleAge, { IHN: 0 }, { CTV: 0 })
  );
});

console.log('Creating GRAPH 8: Prevalence of IHN over time');

const queriesIHN = [];
let casesByYearIHN = {};
const startYear = 1998;
const endYear = new Date().getFullYear();

for (let i = startYear; i <= endYear; i += 1) {
  queriesIHN.push(
    models.Case.findAll({
      where: {
        date: {
          $between: [new Date(`${i}-01-01`), new Date(`${i}-12-31`)]
        },
        [Op.or]: [{ pathogen: 'IHN' }, { pathogen: null }]
      },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [{ model: models.Location, attributes: ['name'] }],
      raw: true,
      order: [['date', 'DESC']]
    }).then(cases => {
      casesByYearIHN[i] = cases;
    })
  );
}
const p8 = Promise.all(queriesIHN).then(() => {
  casesByYearIHN = _.mapValues(casesByYearIHN, singleYear => {
    let casesByLocation = _(_.reject(singleYear, c => c.pathogen === null && c.numPositive > 0))
      .groupBy(groupByLocationName)
      .map((cases, location) => ({ location, cases }))
      .value();
    casesByLocation = _.reject(casesByLocation, singleLocation => singleLocation.cases.length < 5);
    let result = casesByLocation.map(singleLocation => {
      let casesByPathogen = _(singleLocation.cases)
        .groupBy(groupByPathogen)
        .value();
      if (casesByPathogen.IHN && casesByPathogen.null)
        casesByPathogen.IHN = [...casesByPathogen.IHN, ...casesByPathogen.null];
      casesByPathogen = _.pick(casesByPathogen, ['IHN']);
      casesByPathogen = _.mapValues(casesByPathogen, cases => meanPrevalence(cases));
      return { location: singleLocation.location, ...casesByPathogen };
    });
    result = _.reject(result, loc => _.size(loc) === 1).map(singleLocation =>
      _.defaults(singleLocation, { IHN: 0 })
    );
    return result;
  });
  casesByYearIHN = _.values(
    _.mapValues(casesByYearIHN, (value, key) => {
      const year = { name: key };
      let sum = 0;
      _.forEach(value, loc => {
        year[loc.location] = loc.IHN;
        sum += loc.IHN;
      });
      if (value.length === 0) year.avg = 0;
      else year.avg = sum / value.length;
      return year;
    })
  );
  const data = { locations: [], averages: [] };
  _.map(casesByYearIHN, year => {
    const { name, avg } = year;
    data.averages.push({ x: name, y: avg, z: 'average' });
    _.mapValues(year, (v, k) => {
      if (k !== 'name' && k !== 'avg') data.locations.push({ x: name, y: v, z: k });
    });
  });

  graphData.IHNPrevalenceOverTime = data;
});

console.log('Creating GRAPH 9: Prevalence of CTV over time');

const queriesCTV = [];
let casesByYearCTV = {};

for (let i = startYear; i <= endYear; i += 1) {
  queriesCTV.push(
    models.Case.findAll({
      where: {
        date: {
          $between: [new Date(`${i}-01-01`), new Date(`${i}-12-31`)]
        },
        [Op.or]: [{ pathogen: 'CTV' }, { pathogen: null }]
      },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [{ model: models.Location, attributes: ['name'] }],
      raw: true,
      order: [['date', 'DESC']]
    }).then(cases => {
      casesByYearCTV[i] = cases;
    })
  );
}
const p9 = Promise.all(queriesCTV).then(() => {
  casesByYearCTV = _.mapValues(casesByYearCTV, singleYear => {
    let casesByLocation = _(_.reject(singleYear, c => c.pathogen === null && c.numPositive > 0))
      .groupBy(groupByLocationName)
      .map((cases, location) => ({ location, cases }))
      .value();
    casesByLocation = _.reject(casesByLocation, singleLocation => singleLocation.cases.length < 5);
    let result = casesByLocation.map(singleLocation => {
      let casesByPathogen = _(singleLocation.cases)
        .groupBy(groupByPathogen)
        .value();
      if (casesByPathogen.CTV && casesByPathogen.null)
        casesByPathogen.CTV = [...casesByPathogen.CTV, ...casesByPathogen.null];
      casesByPathogen = _.pick(casesByPathogen, ['CTV']);
      casesByPathogen = _.mapValues(casesByPathogen, cases => meanPrevalence(cases));
      return { location: singleLocation.location, ...casesByPathogen };
    });
    result = _.reject(result, loc => _.size(loc) === 1).map(singleLocation =>
      _.defaults(singleLocation, { CTV: 0 })
    );
    return result;
  });
  casesByYearCTV = _.values(
    _.mapValues(casesByYearCTV, (value, key) => {
      const year = { name: key };
      let sum = 0;
      _.forEach(value, loc => {
        year[loc.location] = loc.CTV;
        sum += loc.CTV;
      });
      if (value.length === 0) year.avg = 0;
      else year.avg = sum / value.length;
      return year;
    })
  );
  const data = { locations: [], averages: [] };
  _.map(casesByYearCTV, year => {
    const { name, avg } = year;
    data.averages.push({ x: name, y: avg, z: 'average' });
    _.mapValues(year, (v, k) => {
      if (k !== 'name' && k !== 'avg') data.locations.push({ x: name, y: v, z: k });
    });
  });

  graphData.CTVPrevalenceOverTime = data;
});

// REPORT TO AWS

Promise.all([p1, p3, p4, p5, p6, p7, p8, p9]).then(() => {
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
