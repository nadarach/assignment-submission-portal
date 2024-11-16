const express = require('express');
const authenticate = require('../middleware/authenticate');
const { fetchAllAdmins, register, login, logout } = require('../controllers/userController');
const User = require("../models/user");

const router = new express.Router();

//route for registering a new user
router.post('/register', register);

//route for user login
router.post('/login', login);

//route for user logout
router.post('/logout', authenticate, logout);

//route for fetching all admins
router.get("/admins", authenticate, fetchAllAdmins);

module.exports = router