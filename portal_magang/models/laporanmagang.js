'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LaporanMagang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Mahasiswa, {foreignKey: 'mhsId'})
    }
  }
  LaporanMagang.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    nama: DataTypes.STRING,
    npm: DataTypes.STRING,
    dosen_pembimbing: DataTypes.STRING,
    tempat_magang: DataTypes.STRING,
    alamat_magang: DataTypes.STRING,
    longitude_magang: DataTypes.STRING,
    latitude_magang: DataTypes.STRING,
    lembar_pengesahan: DataTypes.STRING,
    laporan_magang: DataTypes.STRING,
    dokumentasi: DataTypes.STRING,
    mhsId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'LaporanMagang',
  });
  return LaporanMagang;
};