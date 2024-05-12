'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DosenPembimbing extends Model {
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
  DosenPembimbing.init({
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    nama: DataTypes.STRING,
    npm: DataTypes.STRING,
    surat_covid: DataTypes.STRING,
    surat_balasan: DataTypes.STRING,
    tempat_magang: DataTypes.STRING,
    alamat_magang: DataTypes.STRING,
    pic: DataTypes.STRING,
    kontak_pic: DataTypes.STRING,
    latitude_magang: DataTypes.STRING,
    longitude_magang: DataTypes.STRING,
    tgl_mulai: DataTypes.DATE,
    tgl_selesai: DataTypes.DATE,
    bidang_minat: DataTypes.ENUM('Software Engineering', 'Computer Network', 'Data Science'),
    rencana_magang: DataTypes.TEXT,
    mhsId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DosenPembimbing',
  });
  return DosenPembimbing;
};