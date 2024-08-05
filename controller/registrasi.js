// const express = require('express');
// const bcrypt = require('bcryptjs');
// const Users = require('./models/users'); // Pastikan path benar

// const router = express.Router();

// router.post('/register', async (req, res) => {
//   const { nama, email, password } = req.body;

//   try {
//     const user = await Users.create({ nama, email, password });
//     res.status(201).json({ message: 'User registered successfully', user });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;
