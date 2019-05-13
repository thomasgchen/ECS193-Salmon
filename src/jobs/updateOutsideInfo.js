/* eslint-disable no-loop-func */
/* eslint-disable no-console */
// const fs = require('fs');
const Sequelize = require('sequelize');
const _ = require('lodash');
const axios = require('axios');
const models = require('../../models');

const { Op } = Sequelize;

const getData = (c, params, buffer, lat, lng) => {
  console.log(`Attempting to find data w/ buffer: ${buffer}`);
  return axios
    .get('https://waterservices.usgs.gov/nwis/dv/', {
      params: {
        ...params,
        bBox: `${_.round(lng - buffer, 7)},${_.round(lat - buffer, 7)},${_.round(
          lng + buffer,
          7
        )},${_.round(lat + buffer, 7)}`
      }
    })
    .then(response => {
      if (response.data.value.timeSeries.length < 1) getData(c, params, buffer + 0.01, lat, lng);
      else {
        try {
          const discharge = response.data.value.timeSeries[0].values[0].value[0].value;
          console.log(`${discharge} ft3/s`);
          console.log(c);
          c.update({ discharge }).then(updatedCase => {
            console.log('Updated entry', JSON.stringify(updatedCase));
          });
        } catch (error) {
          console.error('Error on discharge update'.error);
        }
      }
    })
    .catch(error => {
      console.log(error);
      console.log(error.response);
      console.log(`id: ${c.id}, date: ${c.date}, ${lat}, ${lng}`);
    });
};

const populateDischarge = c => {
  const buffer = 0.05;
  const lng = c.Location.dataValues.longitude;
  const lat = c.Location.dataValues.latitude;
  const params = {
    format: 'json',
    siteStatus: 'all',
    startDT: c.dataValues.date,
    endDT: c.dataValues.date,
    parameterCd: '00060',
    statCd: '00003',
    bBox: `${_.round(lng - buffer, 7)},${_.round(lat - buffer, 7)},${_.round(
      lng + buffer,
      7
    )},${_.round(lat + buffer, 7)}`
  };
  getData(c, params, buffer, lat, lng);
};

const handleEndOfRun = (interval, promises) => {
  clearInterval(interval);
  console.log('Awaiting promises...');
  Promise.all(promises).then(() => {
    console.log('Cleaning up...');
    models.Case.count({ where: { discharge: null } }).then(count => {
      console.log(`Remaining cases to populate: ${count}`);
    });
  });
};

module.exports = {
  populateDischarge
};

// models.Case.findById(2, {}).then(c => {
//   console.log(c);
//   process.exit();
//   // populateDischarge(c);
// });

models.Case.count({ where: { discharge: null } }).then(count =>
  console.log(`Remaining cases to populate: ${count}`)
);

const promises = [];

models.Case.findAll({
  include: [{ model: models.Location, attributes: ['latitude', 'longitude'] }],
  where: {
    discharge: null
  }
}).then(cases => {
  let i = 0;
  const interval = setInterval(() => {
    const c = cases[i];
    console.log(typeof c);
    if (c === undefined) handleEndOfRun(interval, promises);
    else {
      console.log('ID:', c.id);
      promises.push(populateDischarge(c));
      i += 1;
    }
  }, 500);
});
