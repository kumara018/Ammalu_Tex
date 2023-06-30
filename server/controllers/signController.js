const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/sign');

// User sign-up
const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // Generate a JWT token
    const token = jwt.sign({ userId: newUser._id }, 'mySuperSecretKey123!');

    // Return the token as a response
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Sign-up failed' });
  }
};

// User sign-in
const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, 'mySuperSecretKey123!');

    // Return the token as a response
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Sign-in failed' });
  }
};

module.exports = {
  signUp,
  signIn
};
