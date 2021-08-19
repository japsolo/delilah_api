const express = require('express');
const Router = express.Router();

const authToken = require('../middlewares/authToken');

const controller = require('../controllers/productsController');

// GET - http://localhost:5000/products
Router.get('/', controller.root);

// POST - http://localhost:5000/products
Router.post('/', authToken, controller.store);

// PATCH - http://localhost:5000/products
Router.patch('/:id', authToken, controller.edit);

// DELETE - http://localhost:5000/products
Router.delete('/:id', authToken, controller.delete);

// http://localhost:5000/products/:id
Router.get('/:id', controller.detail);

module.exports = Router;