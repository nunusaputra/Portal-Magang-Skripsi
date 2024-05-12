'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [3, 100]
        }
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          isEmail: true
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      profile: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      alamat: {
        type: Sequelize.STRING,
        allowNull: true
      },
      no_telpon: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          isIndonesiaPhoneNumber (value) {
            if (!/\+62\d{9,12}/.test(value)) {
              throw new Error('Invalid Indonesian Phone Number Format')
            }
          }
        }
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      desc: {
        type: Sequelize.TEXT,
        allowNull: true
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
    await queryInterface.dropTable('Users');
  }
};