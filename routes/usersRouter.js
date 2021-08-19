const express = require('express');
const Router = express.Router();

const controller = require('../controllers/usersController');

// http://localhost:5000/users/register
Router.post('/register', controller.register);

// http://localhost:5000/users/login
Router.post('/login', controller.login);

module.exports = Router;