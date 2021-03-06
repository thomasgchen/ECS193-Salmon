/* eslint-disable no-loop-func */
/* eslint-disable no-console */
// const fs = require('fs');
const AWS = require('aws-sdk');
const _ = require('lodash');
const models = require('../../models');
const graphs = require('../graphs');

// LOCATION ROLLUP DATA
const rollup = () => {
  return models.Case.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'comments', 'confidence', 'fish', 'id']
    },
    include: [{ model: models.Location, attributes: ['name', 'latitude', 'longitude'] }],
    raw: true
  }).then(foundCases => {
    const casesByLocation = _.groupBy(foundCases, item => {
      return item.LocationId;
    });

    const structuredData = _.mapValues(casesByLocation, (cases, location) => {
      if (cases.length === 0) return null;

      const locData = {
        name: cases[0]['Location.name'],
        id: location,
        location: {
          latitude: cases[0]['Location.latitude'],
          longitude: cases[0]['Location.longitude']
        },
        casesCount: cases.length,
        graphs: {
          prevalenceOverTime: graphs.createGraphByTime(cases, 'pathogen'),
          graphBySpecies: graphs.createGraphByGrouping(cases, 'species'),
          graphByPathogen: graphs.createGraphByGrouping(cases, 'pathogen'),
          graphByAge: graphs.createGraphByGrouping(cases, 'age'),
          prevalenceAndPrecipitationOverTime: graphs.createBiaxialGraphByTime(
            cases,
            'precipitationYearly'
          )
        }
      };

      return locData;
    });
    return structuredData;
  });
};

/*
  { 
    name: Location.name,
    location: {
      lat: x,
      lng: y
    },
    casesCount: 0,
    graphs: {
      prevelanceOverTime: {},
      ...
    }
  }
*/

module.exports = {
  rollup
};
