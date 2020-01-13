-- phpMyAdmin SQL Dump
-- version 3.3.8.1
-- http://www.phpmyadmin.net
--
-- 主机: w.rdc.sae.sina.com.cn:3307
-- 生成日期: 2018 年 02 月 28 日 15:36
-- 服务器版本: 5.6.23
-- PHP 版本: 5.3.3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `app_jxjweb`
--

-- --------------------------------------------------------

--
-- 表的结构 `2code_code`
--

CREATE TABLE IF NOT EXISTS `2code_code` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(16) NOT NULL,
  `num` int(11) NOT NULL,
  `content` varchar(128) NOT NULL,
  `address` varchar(16) NOT NULL,
  `address_id` varchar(16) NOT NULL,
  `name` varchar(16) NOT NULL DEFAULT ' 空',
  `info` varchar(16) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=27 ;

--
-- 转存表中的数据 `2code_code`
--

INSERT INTO `2code_code` (`id`, `user`, `num`, `content`, `address`, `address_id`, `name`, `info`) VALUES
(2, 'jxj2991', 2, 'www.qq.com', '北京', '', ' 腾讯', ''),
(4, 'jxj2991', 2, 'www.hao123.com', ' 南宁', '', ' hao123', ''),
(6, 'jxj2991', 2, 'www.mi.com', ' 杭州', '', ' 小米', ''),
(7, 'jxj1992', 1, '  jxjweb.top  ', '西安', '', ' 个人空间', ''),
(8, 'jxj2991', 1, 'www.  jxjweb.top  ', '西宁', '', '个人空间', ''),
(14, 'jxj2991', 1, '   jxjweb.top  ', ' 西宁', '', '测试', ''),
(15, 'jxj2991', 2, '  jxjweb.top  ', '西宁', '', 'baiyu', ''),
(16, 'jxj2991', 6, '  jxjweb.top  ', '西宁', '', 'baiyu', ''),
(17, 'jxj2991', 2, '  jxjweb.top  ', '西宁', '', 'baiyu', ''),
(18, 'jxj2991', 6, 'www.baidu.com', ' 西雅图', '', '天猫', ''),
(19, 'jxj2991', 3, '  jxjweb.top  ', ' 西安', '', '个人空间', ''),
(20, 'jxj2991', 5, 'www.mi.com', '西安55', '', '百度 test', ''),
(21, 'jxj2991', 1, '  jxjweb.top  ', '辽宁省 丹东市 振兴区 ', '', '测试2', '测试15'),
(23, 'jxj2991', 1, '  jxjweb.top  ', '', '', '测试', 'test1552'),
(24, 'jxj2991', 0, '  jxjweb.top  ', '内蒙古自治区 乌兰察布市 察哈尔', '', '测试', 'test1634'),
(25, 'jxj2991', 6, 'http://www.nwpu.edu.cn/', '陕西省 西安市 长安区 ', '', '西北工业大学', '公诚勇毅'),
(26, 'jxj2991', 0, 'www.baidu.com', '天津 天津市 武清区 ', '', '以前的故事', '忘了');

-- --------------------------------------------------------

--
-- 表的结构 `2code_user`
--

CREATE TABLE IF NOT EXISTS `2code_user` (
  `id` int(16) NOT NULL AUTO_INCREMENT,
  `user` varchar(16) NOT NULL,
  `password` varchar(16) NOT NULL,
  `content` varchar(16) NOT NULL,
  `time` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- 转存表中的数据 `2code_user`
--

INSERT INTO `2code_user` (`id`, `user`, `password`, `content`, `time`) VALUES
(1, 'jxj1992', '888888', 'test', '0000-00-00'),
(2, 'jxj2991', '666666', 'test', '0000-00-00');
