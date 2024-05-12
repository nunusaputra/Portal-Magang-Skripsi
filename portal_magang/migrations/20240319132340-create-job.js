'use strict';

const { DATE } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('jobs', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      jobTitle: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      maxApplicants: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      maxPositions: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      acceptedCandidates: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        validate: {
          isInt: {
            msg: "acceptedCandidates should be an integer"
          },
          min: {
            args: [0],
            msg: "acceptedCandidates should be grather than equal to 0"
          }
        }
      },
      jobType: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      salary: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      skillSet: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      duration: {
        type: Sequelize.STRING,
        allowNull: false
      },
      jobPost: {
        type: Sequelize.DATE,
        default: Date.now,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      deadline: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      desc: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: true,
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
    await queryInterface.dropTable('jobs');
  }
};