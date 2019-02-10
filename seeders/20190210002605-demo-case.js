module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Cases',
      [
        {
          id: 1,
          caseNum: 'AAA1234',
          date: '12/12/2018',
          confidence: 'High',
          species: 'CHIN',
          age: 'Adult',
          pathogen: 'HIV',
          numFish: 69,
          fish: true,
          numPositive: 420,
          prevalence: 0.69,
          comments: 'Hi',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Cases', null, {});
  }
};
