'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LaporanMagangs', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      nama: {
        type: Sequelize.STRING
      },
      npm: {
        type: Sequelize.STRING
      },
      dosen_pembimbing: {
        type: Sequelize.STRING
      },
      tempat_magang: {
        type: Sequelize.STRING
      },
      alamat_magang: {
        type: Sequelize.STRING
      },
      longitude_magang: {
        type: Sequelize.STRING
      },
      latitude_magang: {
        type: Sequelize.STRING
      },
      lembar_pengesahan: {
        type: Sequelize.STRING
      },
      laporan_magang: {
        type: Sequelize.STRING
      },
      dokumentasi: {
        type: Sequelize.STRING
      },
      mhsId: {
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('LaporanMagangs');
  }
};