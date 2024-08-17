const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id, role, email) => {
  return jwt.sign({ _id: _id, role: role, email: email }, process.env.SECRET, { expiresIn: '3d' })
}

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.login(email, password)
    console.log(user)

    //create a token
    const token = createToken(user._id, user.role, user.email)

    console.log(token)

    res.status(200).json({ email, token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }

}

//signup user
const registerUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.signup(email, password)

    //create a token
    const token = createToken(user._id, user.role, user.email)

    res.status(200).json({ email, token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all users with role attribute as 'Faculty'
const getAllFaculties = async (req, res) => {
  try {
    const faculties = await User.find({ role: 'Faculty' });
    res.json(faculties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



module.exports = { loginUser, registerUser, getAllUsers, getUserById, updateUser, deleteUser, getAllFaculties }