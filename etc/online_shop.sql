-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 07, 2020 at 03:36 PM
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
(8, '323719', 94500, '2020-08-17 05:06:20'),
(9, '908405', 21000, '2020-08-17 20:48:29'),
(10, '413926', 21000, '2020-08-18 07:53:50'),
(11, '900148', 21000, '2020-08-18 07:57:00');

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
(5, 8, 7, 1, 60000),
(6, 9, 3, 1, 5000),
(7, 9, 2, 1, 15000),
(8, 10, 3, 1, 5000),
(9, 10, 2, 1, 15000),
(10, 11, 3, 1, 5000),
(11, 11, 2, 1, 15000);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `product_price` int(15) NOT NULL,
  `product_image` varchar(255) NOT NULL,
  `product_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `product_updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `product_status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `category_id`, `product_name`, `product_price`, `product_image`, `product_created_at`, `product_updated_at`, `product_status`) VALUES
(1, 2, 'Espresso', 12000, '2020-09-02T18-31-40.982Z-espresso.png', '2020-08-11 03:29:32', '2020-09-02 18:31:41', 1),
(3, 2, 'Cappucino', 10000, '2020-09-02T18-33-08.418Z-cappucino.png', '2020-08-11 16:33:59', '2020-09-02 18:33:08', 1),
(4, 2, 'Red Velvet Latte', 33000, '2020-09-02T18-34-13.931Z-red-velvet.png', '2020-08-11 16:33:59', '2020-09-02 18:34:13', 1),
(5, 3, 'Choco Rum', 28000, '2020-09-02T18-35-01.962Z-chocorum.png', '2020-08-11 16:33:59', '2020-09-02 18:35:01', 0),
(6, 3, 'Black Forest', 30000, '2020-09-02T18-35-38.076Z-black-forest.png', '2020-08-11 16:33:59', '2020-09-02 18:35:38', 1),
(7, 1, 'Chicken Katsu Dabu-dabu', 60000, '2020-09-02T18-36-49.954Z-chichken-katsu.png', '2020-08-11 16:33:59', '2020-09-02 18:36:49', 1),
(8, 1, 'Salmon Truffle Teriyaki', 60000, '2020-09-02T18-37-22.272Z-salmon.png', '2020-08-11 16:33:59', '2020-09-02 18:37:22', 0),
(9, 1, 'Wiener Schnitzel', 69000, '2020-09-07T02-38-34.652Z-jwt.png', '2020-08-11 16:33:59', '2020-09-07 02:38:34', 1),
(28, 2, 'Lemon Tea', 12000, '2020-09-01T08-32-09.328Z-cat pict.png', '2020-09-01 08:32:09', '2020-09-01 08:32:09', 1),
(29, 2, 'Thai Tea', 21000, '2020-09-03T17-15-33.508Z-Untitled-2-512.ico', '2020-09-03 17:15:33', '2020-09-03 17:15:33', 1),
(30, 2, 'Thai Tea', 21000, '2020-09-03T17-18-37.572Z-Altay.phar', '2020-09-03 17:18:37', '2020-09-03 17:18:37', 1),
(31, 2, 'Thai Tea', 21000, '2020-09-07T02-37-24.954Z-thai-tea.jpg', '2020-09-07 02:37:24', '2020-09-07 02:37:24', 1),
(32, 2, 'Thai Tea', 21000, '2020-09-07T02-47-23.944Z-jwt2.png', '2020-09-07 02:47:23', '2020-09-07 02:47:24', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `user_email` varchar(150) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `user_role` int(1) NOT NULL,
  `user_status` int(1) NOT NULL,
  `user_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_email`, `user_password`, `user_name`, `user_role`, `user_status`, `user_created_at`, `user_updated_at`) VALUES
(8, 'arizalinside@gmail.com', '$2b$10$fv8dd2OAlgfpqsRKL07YEO47NI//.jsi8rA9Y8JY5XgLeCNXGGZrC', 'arizal', 1, 1, '2020-09-03 17:10:12', '2020-09-03 17:10:12'),
(9, 'arizalinsidee@gmail.com', '$2b$10$8Uu/42X19SeN22A48ideveEqUsbRyRWp32BJoevKakVrHMiN.roxy', 'arizal', 2, 0, '2020-09-07 02:28:13', '2020-09-07 02:28:13');

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
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `history_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
