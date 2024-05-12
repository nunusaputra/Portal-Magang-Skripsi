'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Mahasiswas', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notEmpty: true
        }
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notEmpty: true,
          isEmail: true
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      profile_pict: {
        type: Sequelize.STRING,
        allowNull: true
      },
      prodi: {
        type: Sequelize.STRING,
        allowNull: false
      },
      semester: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tgl_lahir: {
        type: Sequelize.DATE,
        allowNull: false
      },
      alamat: {
        type: Sequelize.STRING,
        allowNull: true
      },
      no_hp: {
        type: Sequelize.STRING,
        allowNull: true
      },
      cv: {
        type: Sequelize.STRING,
        allowNull: true
      },
      linkCV: {
        type: Sequelize.STRING,
        allowNull: true
      },
      desc: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      refresh_token: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('Mahasiswas');
  }
};