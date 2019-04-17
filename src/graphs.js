// Shared/Common Graphs
const _ = require('lodash');

const calculatePrevelence = arr => {
  let numFish = 0;
  let numPositive = 0;
  arr.forEach(c => {
    numFish += c.numFish;
    numPositive += c.numPositive;
  });

  return numPositive / numFish;
};

const createGraphByTime = (data, groupBy) => {
  const groupedByYear = _.groupBy(data, item => {
    return item.date.substring(0, 4);
  });

  const groupedData = _.mapValues(groupedByYear, cases => {
    if (groupBy) {
      const grouped = _.groupBy(cases, item => {
        return item[groupBy];
      });

      return _.mapValues(grouped, groupedCases => {
        return calculatePrevelence(groupedCases);
      });
    }

    return { all: calculatePrevelence(cases) };
  });

  const structuredData = [];
  _.forEach(_.keys(groupedData), key => {
    const obj = { name: key };
    _.forEach(_.keys(groupedData[key]), k => {
      if (String(groupedData[key][k]) !== '0') obj[k] = groupedData[key][k];
    });
    structuredData.push(obj);
  });

  return structuredData;
};

module.exports = { createGraphByTime };
