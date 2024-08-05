const { DataTypes } = require("sequelize");
const sequelize = require("../config/koneksi");

const Helm = sequelize.define(
  "helm",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    merk: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ukuran: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    harga: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true, // Set to true if it's optional
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Helm;
