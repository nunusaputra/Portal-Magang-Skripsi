'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class applyJob extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.job, {foreignKey: 'jobId'})
      this.belongsTo(models.User, {foreignKey: 'mitraId'})
      this.belongsTo(models.Mahasiswa, {foreignKey: 'mhsId'})
    }
  }
  applyJob.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    mhsId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    mitraId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    jobId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    status: {
      type: DataTypes.ENUM('applied', 'shortlisted', 'accepted', 'rejected', 'deleted', 'canceled', 'finished')
    },
    dateOfApply: DataTypes.DATE,
    dateOfJoining: DataTypes.DATE,
    sop: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'applyJob',
  });
  return applyJob;
};