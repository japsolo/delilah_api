CREATE DATABASE delilah;
USE delilah;


-- Tabla de Usuarios
CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `userName` varchar(50) NOT NULL,
  `email` varchar(250) NOT NULL UNIQUE,
  `password` varchar(250) NOT NULL,
  `phoneNumber` varchar(50) DEFAULT NULL,
  `address` varchar(250) DEFAULT NULL,
  `admin` tinyint(1) DEFAULT 0,
  `createdAt` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL
) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `users` (`firstName`, `lastName`, `userName`, `email`, `password`, `phoneNumber`, `address`, `admin`) VALUES
('Javi', 'Her', 'thefullstackdevs', 'tfsd@gmail.com', '$2a$10$VmVSjeA26.T8bSXKbHM3uu.tF3o5cCGHUN9r9sArlY09PzXl9Vtuq', '00112233', 'Buenos Aires, Argentina', 0);

-- Tabla de Productos
CREATE TABLE `products` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(40) NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `image` varchar(200) NOT NULL,
  `description` text NOT NULL,
  `createdAt` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL
) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `products` (`name`, `price`, `image`, `description`) VALUES
('Empanada Carne', 60.50, 'empanada_carne.png', 'Riquisima empanada de Carne Suave acompañanda con una Salsa de Mondongo'),
('Ensalada de Tomate y Queso', 115.70, 'ensalada_tomate.png', 'Ensalada de Tomate con queso '),
('Empanada de Pollo', 61, 'empanada_pollo.png', 'Riquisima empanada de Pollo acompañanda con Tomate '),
('Ensalada de Lechuga y Tomate', 130, 'ensalada_lechuga.png', 'Ensalada de lechuga acompañada de Tomate fresco de la sombra'),
('Ensalada de Rucula y Pomelo', 100, 'ensalada_rucula.png', 'Inponente Ensalada de Rucula y Pomelo '),
('Milanesa Napolitana con papas Fritas', 300, 'milanesa.png', 'Tremenda Milanesa a la napolitana con Guarnicion de papas'),
('Empanada de Verdura', 64, 'empanada_verdura.png', 'Riquisima empanada de Verdura acompañanda con Servilleta de carton ');

-- Tabla de Carritos
CREATE TABLE `carts` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `userId` int(10) UNSIGNED DEFAULT NULL,
  `total` decimal(8,2) DEFAULT NULL,
  `state` enum('pedido','preparando','completado','entregado') NOT NULL,
  `createdAt` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL,
  FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `carts` (`userId`, `total`, `state`) VALUES
(2, 5000, 'pedido'),
(3, 1000, 'preparando'),
(3, 1200, 'pedido'),
(6, 1200, 'pedido');


-- Tabla de Productos en carrito

CREATE TABLE `cartProduct` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `cartId` int(10) UNSIGNED DEFAULT NULL,
  `productId` int(10) UNSIGNED DEFAULT NULL,
  `productPrice` decimal(8,2) DEFAULT NULL,
  `quantity` int(10) UNSIGNED DEFAULT NULL,
  `createdAt` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL,
  FOREIGN KEY (`productId`) REFERENCES `products` (`id`),
  FOREIGN KEY (`cartId`) REFERENCES `carts` (`id`)
) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


INSERT INTO `cartProduct` (`cartId`, `productId`, `productPrice`, `quantity`) VALUES
(1, 1, 60.50, 5),
(1, 4, 130, 1),
(1, 5, 100, 3);