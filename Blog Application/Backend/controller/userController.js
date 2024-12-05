const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({ name, email, password });
  const u =   await user.save();
    res.status(201).json({ status:true, user:u ,message: 'Register Succefully'});
  } catch (error) {
    res.status(500).json({ status:false, message: 'Server error' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({status:false, message: 'USER NOT FOUND' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({status:false , message: 'WRONG PASSWORD' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({status:true , token ,message: 'Login Succefully',user:{name :user.name,email:user.email,id:user._id }});
  } catch (error) {
    res.status(500).json({status:false , message: 'Server error' });
  }
};

module.exports = { registerUser, loginUser };
