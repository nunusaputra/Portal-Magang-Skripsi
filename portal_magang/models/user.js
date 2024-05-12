'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.job, {foreignKey: 'userId'})
      this.hasMany(models.applyJob, {foreignKey: 'mitraId'})
      this.hasMany(models.Logbook, {foreignKey: 'userId'})
    }
  }
  User.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    profile: DataTypes.STRING,
    alamat: DataTypes.STRING,
    no_telpon: DataTypes.STRING,
    role: DataTypes.STRING,
    desc: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};