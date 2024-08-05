const { Op, where } = require("sequelize");
const Users = require("../models/users");

const createUsers = async (req, res) => {
  const { nama, email, password } = req.body;
  try {
    const users = await Users.create({
      nama: nama,
      email: email,
      password: password,
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await Users.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getByIdUsers = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const users = await Users.findByPk(id);
    if (users) {
      res.json(users);
    } else {
      res.status(4004).json({
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
  createUsers,
  getAllUsers,
  getByIdUsers,
};
