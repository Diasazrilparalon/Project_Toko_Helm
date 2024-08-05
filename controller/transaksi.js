const { Op, where } = require("sequelize");
const Transaksi = require("../models/transaksi");
const users = require("../models/users");
const helm = require("../models/helm");
const createTransaksi = async (req, res) => {
  const {
    tanggal_transaksi,
    items, // Array of items with id_helm, jumlah_barang, and diskon
  } = req.body;

  try {
    const transaksiItems = [];
    let grandTotal = 0;
    const id_users = req.user.id;
    const email = req.user.email;  // Dapatkan ID pengguna dari middleware

    for (const item of items) {
      const { id_helm, jumlah_barang, diskon } = item;
      
      // Fetch helm data
      const dataHelm = await helm.findByPk(id_helm);
      if (dataHelm) {
        // Calculate total price
        const total_harga = dataHelm.harga * jumlah_barang;

        // Calculate total price after discount
        const total_harga_setelah_diskon = total_harga - (total_harga * (diskon / 100));

        // Create transaksi entry
        const transaksi = await Transaksi.create({
          id_users: id_users,
          id_helm: id_helm,
          tanggal_transaksi: tanggal_transaksi,
          jumlah_barang: jumlah_barang,
          total_harga: total_harga,
          diskon: diskon,
          harga_setelah_diskon: total_harga_setelah_diskon,
        });

        transaksiItems.push(transaksi);
        grandTotal += total_harga_setelah_diskon;
      } else {
        return res.status(404).json({ message: `helm with id ${id_helm} not found` });
      }
    }

    res.json({
      message: 'Transaksi created successfully',
      transaksiItems: transaksiItems,
      grandTotal: grandTotal,
      email:email
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllTransaksi = async (req, res) => {
  try {
    const transaksi = await Transaksi.findAll();
    res.json(transaksi);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getByIdTransaksi = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const transaksi = await Transaksi.findByPk(id, {
      include: [{ model: users }, { model: helm }],
    });
    if (transaksi) {
      res.json(transaksi);
    } else {
      res.status(404).json({
        message: "tidak ditemukan",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTransaksi,
  getAllTransaksi,
  getByIdTransaksi,
};
