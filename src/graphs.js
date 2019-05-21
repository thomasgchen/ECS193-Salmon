// Shared/Common Graphs
const _ = require('lodash');
const moment = require('moment');

const calculatePrevelence = arr => {
  let numFish = 0;
  let numPositive = 0;
  arr.forEach(c => {
    numFish += c.numFish;
    numPositive += c.numPositive;
  });

  return numPositive / numFish;
};

const calculateNumPositive = arr => {
  let numPositive = 0;
  arr.forEach(c => {
    numPositive += c.numPositive;
  });
  return numPositive;
};

const createGraphByTime = (data, groupBy) => {
  const filteredData = _.reject(data, c => moment(c.date).isBefore('2000-01-01'));
  const groupedByYear = _.groupBy(filteredData, item => {
    return item.date.substring(0, 4);
  });
  const labels = [];
  const groupedData = _.mapValues(groupedByYear, cases => {
    if (groupBy) {
      const grouped = _.groupBy(cases, item => {
        labels.push(item[groupBy]);
        return item[groupBy];
      });

      return _.mapValues(grouped, groupedCases => {
        return calculatePrevelence(groupedCases);
      });
    }
    labels.push('all');
    return { all: calculatePrevelence(cases) };
  });

  const structuredData = [];
  _.forEach(_.keys(groupedData), key => {
    const obj = { name: key };
    _.forEach(_.keys(groupedData[key]), k => {
      obj[k] = groupedData[key][k];
    });
    structuredData.push(obj);
  });

  return { structuredData, labels: _.uniq(labels) };
};

const createGraphByGrouping = (data, grouping) => {
  const filteredData = _.reject(data, c => moment(c.date).isBefore('2000-01-01'));
  const groupedCases = _.groupBy(filteredData, item => {
    return item[grouping];
  });

  const groupedData = _.mapValues(groupedCases, cases => {
    return calculateNumPositive(cases);
  });

  const structuredData = [];
  _.forEach(_.keys(groupedData), key => {
    if (groupedData[key] && groupedData[key] > 0) {
      const obj = { name: key, value: groupedData[key] };
      structuredData.push(obj);
    }
  });
  return _.orderBy(structuredData, ['value'], ['desc']).slice(0, 8);
};

const createBiaxialGraphByTime = (data, secondaryDataKey) => {
  const filteredData = _.reject(data, c => moment(c.date).isBefore('2000-01-01'));
  const groupedByYear = _.groupBy(filteredData, item => {
    return item.date.substring(0, 4);
  });
  const groupedData = _.mapValues(groupedByYear, cases => {
    return {
      prevalence: calculatePrevelence(cases),
      [secondaryDataKey]: cases[0][secondaryDataKey]
    };
  });

  const structuredData = [];
  _.forEach(_.keys(groupedData), key => {
    const obj = { name: key };
    _.forEach(_.keys(groupedData[key]), k => {
      obj[k] = groupedData[key][k];
    });
    structuredData.push(obj);
  });

  return { structuredData };
};

module.exports = { createGraphByTime, createGraphByGrouping, createBiaxialGraphByTime };
