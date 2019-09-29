-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 23, 2019 at 01:49 AM
-- Server version: 5.7.24-log
-- PHP Version: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ntavasso_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `contactId` int(11) NOT NULL,
  `fName` varchar(20) NOT NULL,
  `lName` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `comment` varchar(300) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `speakers`
--

CREATE TABLE `speakers` (
  `id` int(11) NOT NULL,
  `firstName` varchar(20) NOT NULL,
  `lastName` varchar(20) NOT NULL,
  `suffix` varchar(10) NOT NULL,
  `age` int(11) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `photo` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `speakers`
--

INSERT INTO `speakers` (`id`, `firstName`, `lastName`, `suffix`, `age`, `description`, `photo`) VALUES
(1, 'Rachel', 'Green', 'Ms.', 35, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed egestas egestas fringilla phasellus. Libero enim sed faucibus turpis in eu. Eu consequat ac felis donec et odio pellentesque. Tincidunt dui ut ornare lectus sit amet est placerat. Massa massa ultricies mi quis hendrerit dolor magna eget. Praesent semper feugiat nibh sed pulvinar proin. Ut ornare lectus sit amet. Eget sit amet tellus cras adipiscing enim eu. Non quam lacus suspendisse faucibus interdum posuere. Egestas sed sed risus pretium quam vulputate dignissim. Fermentum posuere urna nec tincidunt praesent semper. Quis enim lobortis scelerisque fermentum.\r\n\r\n', 'C:\\Users\\tavan\\Projects\\n423\\speakerListHW\\images\\Rachel Green.jpg'),
(2, 'Joey ', 'Tribbiani', 'Mr.', 36, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed egestas egestas fringilla phasellus. Libero enim sed faucibus turpis in eu. Eu consequat ac felis donec et odio pellentesque. Tincidunt dui ut ornare lectus sit amet est placerat. Massa massa ultricies mi quis hendrerit dolor magna eget. Praesent semper feugiat nibh sed pulvinar proin. Ut ornare lectus sit amet. Eget sit amet tellus cras adipiscing enim eu. Non quam lacus suspendisse faucibus interdum posuere. Egestas sed sed risus pretium quam vulputate dignissim. Fermentum posuere urna nec tincidunt praesent semper. Quis enim lobortis scelerisque fermentum.', 'C:\\Users\\tavan\\Projects\\n423\\speakerListHW\\images\\Joey Tribbiani.jpg'),
(3, 'Phoebe ', 'Buffay', 'Ms.', 34, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed egestas egestas fringilla phasellus. Libero enim sed faucibus turpis in eu. Eu consequat ac felis donec et odio pellentesque. Tincidunt dui ut ornare lectus sit amet est placerat. Massa massa ultricies mi quis hendrerit dolor magna eget. Praesent semper feugiat nibh sed pulvinar proin. Ut ornare lectus sit amet. Eget sit amet tellus cras adipiscing enim eu. Non quam lacus suspendisse faucibus interdum posuere. Egestas sed sed risus pretium quam vulputate dignissim. Fermentum posuere urna nec tincidunt praesent semper. Quis enim lobortis scelerisque fermentum.', 'C:\\Users\\tavan\\Projects\\n423\\speakerListHW\\images\\Phoebe Buffay.jpg'),
(4, 'Chandler ', 'Bing', 'Mr.', 36, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed egestas egestas fringilla phasellus. Libero enim sed faucibus turpis in eu. Eu consequat ac felis donec et odio pellentesque. Tincidunt dui ut ornare lectus sit amet est placerat. Massa massa ultricies mi quis hendrerit dolor magna eget. Praesent semper feugiat nibh sed pulvinar proin. Ut ornare lectus sit amet. Eget sit amet tellus cras adipiscing enim eu. Non quam lacus suspendisse faucibus interdum posuere. Egestas sed sed risus pretium quam vulputate dignissim. Fermentum posuere urna nec tincidunt praesent semper. Quis enim lobortis scelerisque fermentum.', 'C:\\Users\\tavan\\Projects\\n423\\speakerListHW\\images\\Chandler Bing.jpg'),
(5, 'Monica ', 'Geller', 'Ms.', 34, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed egestas egestas fringilla phasellus. Libero enim sed faucibus turpis in eu. Eu consequat ac felis donec et odio pellentesque. Tincidunt dui ut ornare lectus sit amet est placerat. Massa massa ultricies mi quis hendrerit dolor magna eget. Praesent semper feugiat nibh sed pulvinar proin. Ut ornare lectus sit amet. Eget sit amet tellus cras adipiscing enim eu. Non quam lacus suspendisse faucibus interdum posuere. Egestas sed sed risus pretium quam vulputate dignissim. Fermentum posuere urna nec tincidunt praesent semper. Quis enim lobortis scelerisque fermentum.', 'C:\\Users\\tavan\\Projects\\n423\\speakerListHW\\images\\Monica Geller.jpg'),
(6, 'Ross', 'Geller', 'Mr.', 36, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed egestas egestas fringilla phasellus. Libero enim sed faucibus turpis in eu. Eu consequat ac felis donec et odio pellentesque. Tincidunt dui ut ornare lectus sit amet est placerat. Massa massa ultricies mi quis hendrerit dolor magna eget. Praesent semper feugiat nibh sed pulvinar proin. Ut ornare lectus sit amet. Eget sit amet tellus cras adipiscing enim eu. Non quam lacus suspendisse faucibus interdum posuere. Egestas sed sed risus pretium quam vulputate dignissim. Fermentum posuere urna nec tincidunt praesent semper. Quis enim lobortis scelerisque fermentum.', 'C:\\Users\\tavan\\Projects\\n423\\speakerListHW\\images\\Ross Geller.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`contactId`);

--
-- Indexes for table `speakers`
--
ALTER TABLE `speakers`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `contactId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `speakers`
--
ALTER TABLE `speakers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
