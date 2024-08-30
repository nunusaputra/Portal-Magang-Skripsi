'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        name: 'Official Fasilkom',
        email: 'Official_fasilkom@gmail.com',
        password: 'Fasilkom12345',
        profile: null,
        alamat: null,
        no_telpon: '083815499134',
        role: 'admin',
        desc: 'lorem ipsum color sit amet',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {})
  }
};
