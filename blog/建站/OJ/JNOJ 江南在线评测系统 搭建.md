# JNOJ 江南在线评测系统 搭建

[江南在线评测系统](https://www.jnoj.org/)（Jiangnan Online Judge），是一个在线的判题系统。 用户可以在线提交程序多种程序（如C、C++、Java）源代码，系统对源代码进行编译和执行，并通过预先设计的测试数据来检验程序源代码的正确性。
GitHub项目介绍：[https://www.jnoj.org](https://www.jnoj.org/)
GitHub项目地址：https://github.com/shi-yang/jnoj
在线Demo：[https://oj.umxyz.com](https://oj.umxyz.com/)

## 环境需求

- 在 Linux 环境下安装。判题机是在 Linux 环境下写的，Windows 下无法运行判题机。
- 搭建 LAMP (或 LANP) 环境：PHP 7.x、MySQL、Apache2 / Nginx
- 可以参考：[LAMP 环境搭建](https://github.com/shi-yang/jnoj/blob/master/docs/environment.md)

## 安装过程

### sudo apt update && apt upgrade

- 1.下载　jnoj 运行命令：

  ```shell
  cd /www/wwwroot
  git clone https://github.com/shi-yang/jnoj.git
  chmod -R 777 /www/wwwroot/jnoj/*
  ./yii migrate
  sudo rm -rf /www/wwwroot/jnoj/runtime/*
  ```

- 2.配置 Web 端

  i.配置数据库信息

  在 `config/db.php`文件中配置数据库信息，例如:

  ```php
  return [
      'class' => 'yii\db\Connection',
      'dsn' => 'mysql:host=localhost;dbname=jnoj',
      'username' => 'root',
      'password' => '123456',
      'charset' => 'utf8',
  ];
  1234567
  ```

  注意： Web 程序不会为你创建数据库，需要你自己手动创建该数据库（创建方法：运行`mysql -u root -p`登录MySQL，然后 `create database jnoj;`，执行`quit;`可退出MySQL）。

  ii.执行安装命令

  进入 jnoj 目录，在命令行运行 ./yii install 来安装。安装过程会自动导入所需的 SQL 数据，并且需要你根据提示输入管理员的账号密码。

  修改 `/etc/nginx/sites-enabled/default` 文件，需要修改的配置：

  ```shell
  location / {
  	try_files $uri $uri/ /index.php?$args;
  }
  ```

  修改后使用 `sudo nginx -s reload` 重现加载配置 做好以上步骤后便可以使用 Web 端：

做好以上步骤后便可以使用 Web 端：

```
http://localhost/jnoj/web/
```

此时还不能进行判题，需配置判题机才能判题。

- 3.配置判题机

  i.安装编译的依赖，运行命令：`sudo apt install libmysqlclient-dev libmysql++-dev`
  ii.创建一个用于判题的用户，运行命令：`sudo useradd -m -u 1536 judge`
  iii.将控制台切换到 `judge`目录（即运行 `cd judge`命令），然后运行 `make`命令
  iiii.运行 `sudo ./dispatcher`命令

- 4.配置配置多边形出题系统
  `sudo useradd -m -u 1536 judge`#添加判题用户

  i.将控制台切换到 `polygon`目录（即运行 `cd polygon`命令），然后运行 `make`命令
  ii.运行 `sudo ./polygon`命令
  安装过程执行命令如下：

  ```shell
  cd /var/www/html
  git clone https://github.com/shi-yang/jnoj.git
  cd jnoj
  vim config/db.php
  ./yii install
  sudo useradd -m -u 1536 judge
  vim judge/config.ini
  cd judge
  sudo apt install libmysqlclient-dev libmysql++-dev
  make
  sudo ./dispatcher
  cd ../polygon
  vim config.ini
  make
  sudo ./polygon
  ```

## 创建开机自启判题服务脚本

```shell
#cd /usr/bin
#nano /usr/bin/ServiceStart.sh
#或
cd /etc/init.d
nano /etc/init.d/ServiceStart.sh
```

```shell
#!/bin/sh
### BEGIN INIT INFO
# Provides:          land.sh
# Required-start:    $local_fs $remote_fs $network $syslog
# Required-Stop:     $local_fs $remote_fs $network $syslog
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: starts the svnd.sh daemon
# Description:       starts svnd.sh using start-stop-daemon
### END INIT INFO

# 服务启动
sudo pkill -9 dispatcher
make
sudo ./dispatcher -o
cd ../polygon
sudo pkill -9 polygon
make
sudo ./polygon
```

```shell
#chmod +x ServiceStart.sh
#cp ServiceStart.sh /etc/init.d
chmod 755 /etc/init.d/ServiceStart.sh
cd /etc/init.d
sudo update-rc.d ServiceStart.sh defaults 95
reboot
```

## 所有要安装的服务

```shell
sudo apt install nginx -y
sudo apt install mysql-server mysql-client
nano /etc/mysql/mysql.conf.d/mysqld.cnf
#找到字段“bind-address = 127.0.0.1”，将其注释掉
service mysql restart
mysql -u debian-sys-maint -p
#密码在 /etc/mysql/debian.cnf
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';
quit;
sudo apt install php-fpm php-mysql php-common php-gd php-zip php-mbstring php-xml
sudo apt install libmysqlclient-dev
sudo apt install libmysql++-dev
sudo apt install git
sudo apt install make
sudo apt install gcc
sudo apt install g++
sudo apt install openjdk-11-jdk
```

### 一键脚本

```shell
wget https://raw.githubusercontent.com/shi-yang/jnoj/master/docs/install.sh
sudo bash /home/install.sh
```

