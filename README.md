# Crawler
一个抓取线上学习资源的爬虫网站。
## Introduction
线上的生产环境：http://crawler.aloo.cn
这是一个抓取线上学习资源的爬虫网站,通过node和cron来实现的。


## Web
这里用来展示数据,展示了读取来的全量数据。

## Requirement
### 2.3 crontab generate search index
1. 16/9/8 生成了index索引
1. 16/9/8 生成原文件json data集合

### 2.2 server render template
1. 16/9/8 express输出静态文件
1. 16/9/8 vue server render
1. 16/9/8 abolish ejs template
1. 16/9/8 生成最近搜索的tag
1. 16/8/17 更新弹出状态提示框。

### 2.1 列表热词检索
1. <del>16/9/8 时间格式</del>
1. <del>16/9/7 搜索大小写通用匹配</del>
1. <del>16/9/4 通用Tag搜索API</del>
1. <del>16/9/2 Tag倒排索引</del>
1. <del>16/9/2 Tag搜索</del>
1. <del>16/9/2 Tag搜索结果对应的tag高亮</del>

### 2.0 版本功能列表
 1. <del>16/8/17 热词分析。</del>
 1. <del>16/8/17 Word Tag Cloud。</del>
 1. <del>16/8/17 定时去重</del>。
 1. <del>16/8/17 跨分页去重。</del>
 1. <del>16/8/17 拿到记录总数-在去重页里面拿到的数据。</del>
 1. <del>16/8/17 CQL查询的应用。</del>

### 1.0 版本功能列表

 1. 16/8/11 需要自动部署到服务器上。
 1. <del>16/8/11 web数据加载不完整,需要加分页。</del>
 1. <del>16/8/15 分页抓取。</del>
 1. <del>16/8/15 放弃了在leancoud去重，因为权限控制的问题ACL。</del>
 1. <del>16/8/11 数据重复的问题还是没有解决。</del>
 1. <del>16/8/11 web数据数据完善样式文件。</del>
 1. <del>16/8/9 需要添加定时的任务。</del>
 1. <del>16/8/9 需要一个展示的Web</del>
                                                    