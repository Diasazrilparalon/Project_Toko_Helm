const { Op, where } = require("sequelize");
const Helm = require("../models/helm");
// controllers/helmController.js
const path = require('path');
const multer = require('multer');



// Set storage engine
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({storage : storage});

const createHelm = async (req, res) => {
upload.single("image")(req, res, async (err) => {
  if(err) {
    return res.status(500).json({message: err.message});
}

  const { merk, ukuran, harga, } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}`: null;

  try {
    const helm = await Helm.create({
      merk: merk,
      ukuran: ukuran,
      harga: harga,
      image: image// Save filename in database
    });
    res.json({
     helm
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
})
};
const getAllHelm = async (req, res) => {
  try {
    const helm = await Helm.findAll();
    res.json(helm);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

const getByIdHelm = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const helm = await Helm.findByPk(id);
    if (helm) {
      res.json(helm);
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
  createHelm,
  getAllHelm,
  getByIdHelm,
};
