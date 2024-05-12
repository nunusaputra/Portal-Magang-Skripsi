'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {foreignKey: 'userId'})
      this.hasMany(models.applyJob, {foreignKey: 'jobId'})
    }
  }
  job.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    jobTitle: DataTypes.STRING,
    maxApplicants: DataTypes.INTEGER,
    maxPositions: DataTypes.INTEGER,
    acceptedCandidates: DataTypes.INTEGER,
    jobType: DataTypes.STRING,
    salary: DataTypes.INTEGER,
    skillSet: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    jobPost: DataTypes.DATE,
    deadline: DataTypes.DATE,
    desc: DataTypes.TEXT,
    userId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'job',
  });
  return job;
};