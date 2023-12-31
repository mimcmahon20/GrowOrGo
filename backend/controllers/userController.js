const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');




// Register a new user
exports.registerUser = async (req, res) => {
  try {
    // Check if user already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create a new user
    user = new User(req.body);

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    // Save the user in the database
    await user.save();

    res.json({ msg: `User registered successfully` });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// Login a user
exports.loginUser = async (req, res) => {
  try {
    // Check if user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid. Email not in database." });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid. Password is incorrect." });
    }

    // Create JWT
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.cookie('token', token, { httpOnly: true });
      res.json({ token });
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// Get user information
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.user.id,
      req.body,
      { new: true, runValidators: true }
    )
    res.json({ msg: 'User information updated.' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

//delete the user
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.json({ msg: 'User deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};