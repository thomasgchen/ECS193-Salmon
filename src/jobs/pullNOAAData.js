/* eslint-disable prefer-template */
/* eslint-disable no-console */
const _ = require('lodash');
const axios = require('axios');
const Sequelize = require('sequelize');
const args = require('minimist')(process.argv.slice(2));
const models = require('../../models');

const { Op } = Sequelize;
const MAX_RANGE = 50;
const MILE_STEP = 5;
const START_RANGE = 5;
let token = process.env.NOAA_TOKEN;

const BASE_URL = 'https://www.ncdc.noaa.gov/cdo-web/api/v2/';

const defaultStationParams = {
  sortfield: 'datacoverage',
  sortorder: 'desc'
};

const calculateBoundingBox = (miles, lat, lng) => {
  const df = miles / 69; // North-south distance in degrees
  const dl = df / Math.cos(lat); // East-west distance in degrees
  const slat = lat - df;
  const nlat = lat + df;
  const wlng = lng - dl;
  const elng = lng + dl;
  // console.log(`${slat},${elng},${nlat},${wlng}`);

  return `${slat},${elng},${nlat},${wlng}`;
};

const retrieveCaseData = (params, stationid) => {
  if (!stationid) return null;
  return axios
    .get(`${BASE_URL}/data`, {
      headers: {
        token
      },
      params: {
        ...params,
        stationid
      }
    })
    .then(response => {
      if (_.isEmpty(response.data)) return null;
      return response.data.results[0].value;
    })
    .catch(error => console.log(error));
};

const populatePrcp = (c, stationid) => {
  if (c.dataValues.precipitationYearly !== null) return Promise.resolve(c);

  const date = new Date(c.dataValues.date);
  const baseParams = {
    startdate: `${date.getFullYear()}-01-01`,
    enddate: `${date.getFullYear()}-01-01`,
    datasetid: 'GSOY',
    datatypeid: 'PRCP',
    units: 'metric'
  };

  return retrieveCaseData(baseParams, stationid, 0).then(prcp => {
    if (prcp !== null) console.log(`PRCP: ${prcp} mm`);
    return c.update({ precipitationYearly: prcp });
  });
};

const populateTemp = (c, stationid) => {
  if (c.dataValues.temperatureMax !== null) return Promise.resolve(c);
  const date = new Date(c.dataValues.date);
  const baseParams = {
    startdate: `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${(
      '0' + date.getDate()
    ).slice(-2)}`,
    enddate: `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${(
      '0' + date.getDate()
    ).slice(-2)}`,
    datasetid: 'GHCND',
    datatypeid: 'TMAX',
    units: 'metric'
  };

  return retrieveCaseData(baseParams, stationid, 0).then(tmax => {
    if (tmax !== null) console.log(`TMAX: ${tmax} deg c`);
    return c.update({ temperatureMax: tmax });
  });
};

const fillCaseInfo = (c, stationIds, index) => {
  if (!stationIds[index]) return Promise.resolve(false);
  return populatePrcp(c, stationIds[index]).then(() => {
    return populateTemp(c, stationIds[index]).then(updatedCase => {
      if (
        updatedCase.dataValues.precipitationYearly === null ||
        updatedCase.dataValues.temperatureMax === null
      )
        return fillCaseInfo(updatedCase, stationIds, index + 1);
      console.log(
        `${updatedCase.Location.name} - ${updatedCase.dataValues.caseNum}:\n TMAX: ${
          updatedCase.dataValues.temperatureMax
        }\n PRCP: ${updatedCase.dataValues.precipitationYearly}`
      );
      return Promise.resolve(true);
    });
  });
};

const populateCase = (c, mileRange, blacklist) => {
  if (mileRange > MAX_RANGE / 2) return Promise.resolve(false);
  const lng = c.Location.longitude;
  const lat = c.Location.latitude;
  const extent = calculateBoundingBox(mileRange, lat, lng);
  return axios
    .get(`${BASE_URL}/stations`, {
      headers: {
        token
      },
      params: {
        ...defaultStationParams,
        extent
      }
    })
    .then(response => {
      if (_.isEmpty(response.data)) {
        console.log(`No stations found... expanding range to ~${(mileRange + MILE_STEP) * 2}mi`);
        return populateCase(c, mileRange + MILE_STEP, []);
      }
      let results = response.data.results.map(obj => obj.id);
      results = _.reject(results, o => blacklist.includes(o));
      return fillCaseInfo(c, results, 0).then(allValuesFilled => {
        if (allValuesFilled) return Promise.resolve(true);
        console.log(`Not all data filled... expanding range to ~${(mileRange + MILE_STEP) * 2}mi`);
        return populateCase(c, mileRange + MILE_STEP, _.uniq(blacklist.concat(results)));
      });
    })
    .catch(error => {
      console.log(error);
    });
};

const iterateOverCasesSync = (cases, caseId) => {
  if (cases[caseId]) {
    console.log(`-----FINDING (${caseId} / ${cases.length}) ${cases[caseId].Location.name}-----`);
    console.log(`Starting station search at ~${START_RANGE * 2} mi`);
    return populateCase(cases[caseId], START_RANGE, []).then(() => {
      return iterateOverCasesSync(cases, caseId + 1);
    });
  }
  console.log('ALL CASES HANDLED');
  return true;
};

const populateCases = () => {
  return models.Case.findAll({
    where: {
      [Op.or]: {
        precipitationYearly: null,
        temperatureMax: null
      }
    },
    order: [[Sequelize.literal('RANDOM()')]],
    include: [{ model: models.Location }],
    limit: 100
  }).then(cases => {
    if (args.split) {
      if (args.i === 1) {
        return iterateOverCasesSync(cases.slice(0, cases.length / 2), 0);
      }
      return iterateOverCasesSync(cases.slice(cases.length / 2), 0);
    }
    return iterateOverCasesSync(cases, 0);
  });
};

if (args.noaaToken) {
  console.log(args.noaaToken);
  token = args.noaaToken;
}
populateCases();

// Loop through cases
// Expand out one mile at a time and try to populate the case data from given stations
// If found both stop searching for stations

module.exports = {
  populateCases
};
