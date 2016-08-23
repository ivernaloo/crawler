--
-- 数据库: `sina_blog`
--

-- --------------------------------------------------------

--
-- 表的结构 `article_list`
--

CREATE TABLE IF NOT EXISTS `article_list` (
  `id` varchar(20) NOT NULL DEFAULT 0,
  `title` varchar(255) NOT NULL,
  `url` text NOT NULL，
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------
