module.exports = {
  up: (queryInterface, Sequelize) => {
    // Case hasOne Location
    return queryInterface
      .addColumn('Locations', 'CaseId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Cases', // name of Source model
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      })
      .then(() => {
        return queryInterface.addColumn('Cases', 'LocationId', {
          type: Sequelize.INTEGER,
          references: {
            model: 'Locations', // name of Source model
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        });
      });
  },

  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => {
    return queryInterface
      .removeColumn(
        'Locations', // Name of the target model
        'CaseId' // Key to remove
      )
      .then(() => {
        return queryInterface.removeColumn(
          'Cases', // Name of the target model
          'LocationId' // Key to remove
        );
      });
  }
};
