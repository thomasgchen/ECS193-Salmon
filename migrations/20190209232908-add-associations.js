module.exports = {
  up: (queryInterface, Sequelize) => {
    // Case hasOne Location
    return queryInterface.addColumn('Cases', 'LocationId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Locations', // name of Source model
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Cases', // Name of the target model
      'LocationId' // Key to remove
    );
  }
};
