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
    await queryInterface.bulkInsert('musics', [
      {
        artist: 1,
        title: 'Hymn For The Weekend',
        year: '2011',
        thumbnail: 'hymn-for-the-weekend.jpg',
        attache: 'hymn-for-the-weekend.mp3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        artist: 1,
        title: 'Adventure Of A Lifetime',
        year: '2015',
        thumbnail: 'advanture-of-a-lifetime.jpg',
        attache: 'advanture-of-a-lifetime.mp3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        artist: 2,
        title: '7 Years',
        year: '2014',
        thumbnail: 'seven-years.jpg',
        attache: 'seven-years.mp3',
        createdAt: new Date(),
        updatedAt: new Date()
      }
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
