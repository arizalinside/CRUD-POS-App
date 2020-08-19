-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 17, 2020 at 08:57 PM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `online_shop`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(100) NOT NULL,
  `category_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `category_updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `category_name`, `category_created_at`, `category_updated_at`) VALUES
(1, 'Food', '2020-08-11 16:45:56', '2020-08-11 16:45:56'),
(2, 'Drink', '2020-08-11 16:45:56', '2020-08-11 16:45:56'),
(3, 'Dessert', '2020-08-12 16:55:03', '2020-08-12 16:55:03');

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `history_id` int(11) NOT NULL,
  `history_invoices` varchar(100) NOT NULL,
  `history_subtotal` int(15) NOT NULL,
  `history_created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `history`
--

INSERT INTO `history` (`history_id`, `history_invoices`, `history_subtotal`, `history_created_at`) VALUES
(1, '#10928', 38000, '0000-00-00 00:00:00'),
(2, '#10929', 93000, '0000-00-00 00:00:00'),
(3, '#10930', 35000, '0000-00-00 00:00:00'),
(4, '484419', 0, '2020-08-17 04:47:25'),
(5, '149281', 0, '2020-08-17 04:58:10'),
(6, '520266', 31500, '2020-08-17 05:00:02'),
(7, '103715', 31500, '2020-08-17 05:01:42'),
(8, '323719', 94500, '2020-08-17 05:06:20');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `history_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `order_qty` int(11) NOT NULL,
  `order_subtotal` int(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `history_id`, `product_id`, `order_qty`, `order_subtotal`) VALUES
(1, 1, 2, 1, 15000),
(2, 6, 2, 2, 30000),
(3, 7, 2, 2, 30000),
(4, 8, 6, 1, 30000),
(5, 8, 7, 1, 60000);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `product_harga` int(15) NOT NULL,
  `product_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `product_updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `product_status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `category_id`, `product_name`, `product_harga`, `product_created_at`, `product_updated_at`, `product_status`) VALUES
(1, 2, 'Espresso', 10000, '2020-08-11 03:29:32', '2020-08-12 18:04:04', 1),
(2, 2, 'Coffee Latte', 15000, '2020-08-11 03:00:00', '2020-08-12 18:09:30', 1),
(3, 2, 'Cappucino', 5000, '2020-08-11 16:33:59', '2020-08-12 18:10:57', 0),
(4, 2, 'Red Velvet Latte', 33000, '2020-08-11 16:33:59', '2020-08-12 18:11:17', 1),
(5, 3, 'Choco Rum', 28000, '2020-08-11 16:33:59', '2020-08-12 18:12:24', 1),
(6, 3, 'Black Forest', 30000, '2020-08-11 16:33:59', '2020-08-12 18:12:39', 1),
(7, 1, 'Chicken Katsu Dabu-dabu', 60000, '2020-08-11 16:33:59', '2020-08-12 18:13:07', 0),
(8, 1, 'Salmon Truffle Teriyaki', 60000, '2020-08-11 16:33:59', '2020-08-12 18:13:24', 1),
(9, 1, 'Wiener Schnitzel', 69000, '2020-08-11 16:33:59', '2020-08-12 18:13:47', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`history_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `history_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
