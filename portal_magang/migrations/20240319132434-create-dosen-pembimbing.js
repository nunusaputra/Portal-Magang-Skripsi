'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DosenPembimbings', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      nama: {
        allowNull: false,
        type: Sequelize.STRING
      },
      npm: {
        allowNull: false,
        type: Sequelize.STRING
      },
      surat_covid: {
        allowNull: false,
        type: Sequelize.STRING
      },
      surat_balasan: {
        allowNull: false,
        type: Sequelize.STRING
      },
      tempat_magang: {
        allowNull: false,
        type: Sequelize.STRING
      },
      alamat_magang: {
        allowNull: false,
        type: Sequelize.STRING
      },
      pic: {
        allowNull: false,
        type: Sequelize.STRING
      },
      kontak_pic: {
        allowNull: false,
        type: Sequelize.STRING
      },
      latitude_magang: {
        allowNull: false,
        type: Sequelize.STRING
      },
      longitude_magang: {
        allowNull: false,
        type: Sequelize.STRING
      },
      tgl_mulai: {
        allowNull: false,
        type: Sequelize.DATE
      },
      tgl_selesai: {
        allowNull: false,
        type: Sequelize.DATE
      },
      bidang_minat: {
        allowNull: false,
        type: Sequelize.ENUM('Software Engineering', 'Computer Network', 'Data Science')
      },
      rencana_magang: {
        allowNull: false,
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('DosenPembimbings');
  }
};