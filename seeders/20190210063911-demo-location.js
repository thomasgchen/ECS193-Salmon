module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Locations',
      [
        {
          id: 1,
          name: 'Trinity River, California',
          latitude: 41.184532,
          longitude: -123.706795,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Locations', null, {});
  }
};
