/*
MySQL Data Transfer
Source Host: localhost
Source Database: zhuge
Target Host: localhost
Target Database: zhuge
Date: 2022/11/22 10:28:46
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for city
-- ----------------------------
DROP TABLE IF EXISTS `city`;
CREATE TABLE `city` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for collection
-- ----------------------------
DROP TABLE IF EXISTS `collection`;
CREATE TABLE `collection` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fid` int(11) DEFAULT NULL,
  `sid` int(11) DEFAULT NULL,
  `hid` int(11) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for food
-- ----------------------------
DROP TABLE IF EXISTS `food`;
CREATE TABLE `food` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `introduce` varchar(255) DEFAULT NULL,
  `adress` varchar(255) DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  `foodimg1` varchar(255) DEFAULT NULL,
  `foodimg2` varchar(255) DEFAULT NULL,
  `foodimg3` varchar(255) DEFAULT NULL,
  `cid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for food-comment
-- ----------------------------
DROP TABLE IF EXISTS `food-comment`;
CREATE TABLE `food-comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comments` varchar(255) DEFAULT NULL,
  `grade` int(11) DEFAULT NULL,
  `like` int(11) DEFAULT NULL,
  `time` time DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `gnumber` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for house
-- ----------------------------
DROP TABLE IF EXISTS `house`;
CREATE TABLE `house` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `price` varchar(255) DEFAULT NULL,
  `special` varchar(255) DEFAULT NULL,
  `adress` varchar(255) DEFAULT NULL,
  `phonenumber` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for house-comment
-- ----------------------------
DROP TABLE IF EXISTS `house-comment`;
CREATE TABLE `house-comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `num` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for house-infomation
-- ----------------------------
DROP TABLE IF EXISTS `house-infomation`;
CREATE TABLE `house-infomation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `hintroduce` varchar(255) DEFAULT NULL,
  `village` varchar(255) DEFAULT NULL,
  `img1` varchar(255) DEFAULT NULL,
  `img2` varchar(255) DEFAULT NULL,
  `img3` varchar(255) DEFAULT NULL,
  `hid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for scenery
-- ----------------------------
DROP TABLE IF EXISTS `scenery`;
CREATE TABLE `scenery` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `area` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `time` time DEFAULT NULL,
  `headimg` varchar(255) DEFAULT NULL,
  `cid` int(11) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for scenery-content
-- ----------------------------
DROP TABLE IF EXISTS `scenery-content`;
CREATE TABLE `scenery-content` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `num` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) DEFAULT NULL,
  `password` int(11) DEFAULT NULL,
  `headimg` varchar(255) DEFAULT NULL,
  `dynamicthing` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records 
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'www', '123', 'https://img2.baidu.com/it/u=2015865969,3401990894&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1669222800&t=fc25ece0709c2a803cf1e460bc5795ae', null);
