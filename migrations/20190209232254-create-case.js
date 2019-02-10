module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Cases', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      caseNum: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.STRING
      },
      confidence: {
        type: Sequelize.STRING
      },
      species: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.STRING
      },
      pathogen: {
        type: Sequelize.STRING
      },
      numFish: {
        type: Sequelize.INTEGER
      },
      fish: {
        type: Sequelize.BOOLEAN
      },
      numPositive: {
        type: Sequelize.INTEGER
      },
      prevalence: {
        type: Sequelize.DOUBLE
      },
      comments: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Cases');
  }
};
