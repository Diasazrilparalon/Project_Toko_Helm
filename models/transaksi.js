const { DataTypes } = require("sequelize");
const sequelize = require("../config/koneksi");
const Helm = require("./helm");
const Users = require("./users");

const Transaksi = sequelize.define(
  "transaksi",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_users: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Users,
        key: "id",
      },
    },
    id_helm: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Helm,
        key: "id",
      },
    },
    tanggal_transaksi: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    jumlah_barang: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_harga: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    diskon: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    harga_setelah_diskon: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Users.hasMany(Transaksi, { foreignKey: "id_users" });
Helm.hasMany(Transaksi, { foreignKey: "id_helm" });
Transaksi.belongsTo(Users, { foreignKey: "id_users" });
Transaksi.belongsTo(Helm, { foreignKey: "id_helm" });

module.exports = Transaksi;
