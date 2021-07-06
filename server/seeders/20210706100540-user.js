const bcrypt = require('bcrypt')
const hashStrenght = 10

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
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkInsert('users', [
      {
        fullName: 'Ikhsan',
        email: 'ikhsan@app.com',
        password: 'passoword',
        listAs: '1',
        gender: 'male',
        phone: '088238343',
        address: 'L.A',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: 'Abka',
        email: 'abka@app.com',
        password: 'passoword',
        listAs: '1',
        gender: 'male',
        phone: '08343747534',
        address: 'Depok',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: 'Chandra',
        email: 'chandra@app.com',
        password: 'passoword',
        listAs: '0',
        gender: 'female',
        phone: '09213834345',
        address: 'Salemba',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  }
};
