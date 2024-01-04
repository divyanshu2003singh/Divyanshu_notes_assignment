// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      console.error(error);
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const isMatch = await user.comparePassword(password);
    if (isMatch) {
      const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
      res.json({ token });
    } else {
      console.error(error);
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  signup,
  login,
};
