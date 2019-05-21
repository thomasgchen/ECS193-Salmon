'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Cases', 'precipitationYearly', Sequelize.DOUBLE),
      queryInterface.addColumn('Cases', 'temperatureMax', Sequelize.DOUBLE)
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Cases', 'precipitationYearly'),
      queryInterface.removeColumn('Cases', 'temperatureMax')
    ]);
  }
};
