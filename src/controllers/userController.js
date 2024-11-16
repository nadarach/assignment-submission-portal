const User = require('../models/user');

//Register a new user
const register = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send({
      errorMessage: "Error registering user",
      details: error,
    });
  }
};

//User login
const login = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send({
      errorMessage: "Error logging in user",
      details: error,
    });
  }
};

//User logout
const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send({
      errorMessage: "Error logging out",
      details: error,
    });
  }
};

//Fetch all admins
const fetchAllAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" });
    res.send(admins);
  } catch (error) {
    res.status(500).send({
      errorMessage: "Error fetching all admins",
      details: error,
    });
  }
}

module.exports = {
  register,
  login,
  logout,
  fetchAllAdmins
}