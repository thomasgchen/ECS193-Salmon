module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Cases', 'discharge', {
      type: Sequelize.DOUBLE
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Cases', // Name of the target model
      'discharge' // Key to remove
    );
  }
};
