const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const upload = require('../config/multer');

// Route for uploading image
router.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.status(200).json({ message: 'Image uploaded successfully!', file: req.file });
  });
});

// Route for serving uploaded images
router.get('/uploads/:filename', (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, '..', 'uploads', filename);
  res.sendFile(filepath);
});

// Route for deleting image
router.delete('/uploads/:filename', (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, '..', 'uploads', filename);

  fs.unlink(filepath, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to delete image', error: err.message });
    }
    res.status(200).json({ message: 'Image deleted successfully!' });
  });
});

module.exports = router;
