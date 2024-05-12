'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mahasiswa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.applyJob, {foreignKey: 'mhsId'})
      this.hasMany(models.LaporanMagang, {foreignKey: 'mhsId'})
      this.hasMany(models.DosenPembimbing, {foreignKey: 'mhsId'})
    }
  }
  Mahasiswa.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    profile_pict: DataTypes.STRING,
    prodi: DataTypes.STRING,
    semester: DataTypes.STRING,
    tgl_lahir: DataTypes.DATE,
    alamat: DataTypes.STRING,
    no_hp: DataTypes.STRING,
    cv: DataTypes.STRING,
    linkCV: DataTypes.STRING,
    desc: DataTypes.TEXT,
    refresh_token: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Mahasiswa',
  });
  return Mahasiswa;
};