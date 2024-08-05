const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../models/users');

const SECRET_KEY = 'your_secret_key'; // Gantilah dengan secret key yang aman

const register = async (req, res) => {
  const { nama, email, password } = req.body;

  try {
    const user = await Users.findOne({ where: { email } });
    if(user){
        return res.status(404).json({ message: 'email sudah ada' });
    }
    const newuser = await Users.create({ nama, email, password });
    res.status(201).json({ message: 'User registered successfully', newuser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

    // Set the token in a cookie
    res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 3600000 }); // 1 hour expiration

    res.json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logout = (req, res) => {
  // Clear the token cookie
  try {
    res.clearCookie('token', { httpOnly: true });
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};
module.exports = { login,register,logout };

