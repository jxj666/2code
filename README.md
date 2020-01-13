<!--
 * @Description: 
 * @Author: jinxiaojian
 * @Email: jinxiaojian@youxin.com
 * @Date: 2019-01-25 13:29:43
 * @LastEditTime : 2020-01-13 17:01:16
 * @LastEditors  : 靳肖健
 -->
# 二维码活码管理系统 v 2.1.13

![主页](info/3.png)
## [//m.jxjweb.top/2code/dist/web/](//m.jxjweb.top/2code/dist/web/)


##### 二维码又称二维条码,常见的二维码为QR Code,QR全称Quick Response,是一个近几年来移动设备上超流行的一种编码方式,它比传统的Bar Code条形码能存更多的信息,也能表示更多的数据类型.

### 什么是活码?

![技术](info/2.png)

二维码生成后,二维码图案不变,内容可随时变更,极大提高营销效率,配合美术设计二维码能力大大提升.
并且可以做到实时统计二维码扫描数据,传播效果一目了然;根据地域/网络/设备等多维度分析数据,提升管理效率.

### 二维码的活码的技术实现本质是什么?

二维码活码团主要存储一个固定的 php 路径及码的 id,扫描二维码后,服务器根据请求内容从数据库中查找二维码的信息,作跳转并记录访问信息.

### 系统技术

![技术](info/1.png)
##### 使用需要你会以上技术

### 安装步骤

- 主要文件都存放在项目的 dist 文件中

- 导入 dist/sql 里的数据库文件至数据库

- 在 dist/php 中添加 conn_sql.php , 连接你自己的数据库 (参照 conn_sql的副本.php)

![1](info/sql.png)

- 修改 dist/web 中 custom.js 的 base_url 变量 (你预计把 2code文件 放置在服务器下的位置 , 即文件的域名位置)

![2](info/custom.png)

- 修改 jump.html 中的 url 地址

![3](info/jump.png)



- 上传修改好的 2code文件夹 到你的服务器预定位置

### 效果演示:

[//m.jxjweb.top/2code/dist/web/](//m.jxjweb.top/2code/dist/web/)


### 完整代码:

[//github.com/jxj322991/2code](//github.com/jxj322991/2code)

### TODO

1. 彩色二维码

### fix

2.1 修正新建/修改活码的上传方法

2.0 大改版,修复大量错误

