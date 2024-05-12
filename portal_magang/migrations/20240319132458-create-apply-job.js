'use strict';

const { DATE } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('applyJobs', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      mhsId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      mitraId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      jobId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      status: {
        type: Sequelize.ENUM('applied', 'shortlisted', 'accepted', 'rejected', 'deleted', 'canceled', 'finished'),
        defaultValue: 'applied',
        allowNull: false
      },
      dateOfApply: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      dateOfJoining: {
        type: Sequelize.DATE,
        validate: {
          isAfterDateOfApply(value) {
            if (value < this.dateOfApply) {
              throw new Error('dateOfJoining should be grather then or equal to dateOfApply')
            }
          }
        }
      },
      sop: {
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
    await queryInterface.dropTable('applyJobs');
  }
};