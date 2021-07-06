'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('artists', [
      {
        name: 'Coldplay',
        old: 30,
        type: 'Band',
        startCareer: '2005',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Lukas Graham',
        old: 33,
        type: 'Band',
        startCareer: '2007',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Perridaren',
        old: 35,
        type: 'Band',
        startCareer: '2009',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
