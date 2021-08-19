const express = require('express');
const Router = express.Router();

const authToken = require('../middlewares/authToken');

const controller = require('../controllers/cartsController');

// POST http://localhost:5000/carts
Router.post('/', authToken, controller.store);

// GET http://localhost:5000/carts/status
// (http://localhost:5000/carts/status?state=___) <== hay que estar logueado
Router.get('/status', authToken, controller.status);

// POST http://localhost:5000/carts/change-status/:cartId
// (http://localhost:5000/carts/change-status/:cartId?newState=___) <== hay que estar logueado
Router.post('/change-status/:cartId', authToken, controller.changeStatus);

module.exports = Router