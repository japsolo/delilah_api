const express = require('express');
const cors = require('cors');
const server = express();

// Para que el request pueda venir con información en formato JSON
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Middleware para el CORS
server.use(cors());

// Levantar el servidor
server.listen(5000, () => console.log('Servidor andando en el puerto 5000'));

const usersRouter = require('./routes/usersRouter');
server.use('/users', usersRouter);

const productsRouter = require('./routes/productsRouter');
server.use('/products', productsRouter);

const cartsRouter = require('./routes/cartsRouter');
server.use('/carts', cartsRouter);

server.get('*', (req, res) => {
	res.status(404).json({
		status: 404,
		message: 'not found'
	})
});