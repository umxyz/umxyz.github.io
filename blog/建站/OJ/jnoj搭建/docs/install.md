环境需求
------------

在 Linux 环境下安装。判题机是在 Linux 环境下写的，Windows 下无法运行判题机。

搭建 LAMP (或 LANP) 环境：PHP 7.x、MySQL、Apache2 / Nginx

可以参考：[LAMP 环境搭建](environment.md)

安装过程
------------
1. 下载　`jnoj`
    运行命令：
    ~~~
    git clone https://github.com/yuuxeun/HUNAU_ACM_OJ_jnoj.git
    ~~~

2. 配置 Web 端
    1. 配置数据库信息
    
        在 `config/db.php` 文件中配置数据库信息，例如:
        
        ```php
        return [
            'class' => 'yii\db\Connection',
            'dsn' => 'mysql:host=localhost;dbname=jnoj',
            'username' => 'root',
            'password' => '123456',
            'charset' => 'utf8',
        ];
        ```
        
        **注意：** Web 程序不会为你创建数据库，需要你自己手动创建该数据库（创建方法：运行`mysql -u root -p`登录MySQL，然后 `create database jnoj;`,执行`quit;`可退出MySQL）。

    2. 执行安装命令
    
        进入 jnoj 目录，在命令行运行 `./yii install` 来安装。安装过程会自动导入所需的 SQL 数据，并且需要你根据提示输入管理员的账号密码。
    
    做好以上步骤后便可以使用 Web 端：
    
    ~~~
    http://localhost/jnoj/web/
    ~~~
    
    此时还不能进行判题，需配置判题机才能判题。
    
3. 配置判题机
    1. 安装编译的依赖，运行命令：`sudo apt install libmysqlclient-dev libmysql++-dev`
    2. 创建一个用于判题的用户，运行命令：`sudo useradd -m -u 1536 judge`
    3. 将控制台切换到 `judge` 目录（即运行 `cd judge`命令），然后运行 `make` 命令
    4. 运行 `sudo ./dispatcher` 命令

4. 配置配置多边形出题系统
    
    1. 将控制台切换到 `polygon` 目录（即运行 `cd polygon`命令），然后运行 `make` 命令
    2. 运行 `sudo ./polygon` 命令

安装过程执行命令如下：
~~~
$ cd /var/www/html
$ git clone https://github.com/shi-yang/jnoj.git
$ cd jnoj
$ vim config/db.php
$ ./yii install
$ sudo useradd -m -u 1536 judge
$ vim judge/config.ini
$ cd judge
$ sudo apt install libmysqlclient-dev libmysql++-dev
$ make
$ sudo ./dispatcher
$ cd ../polygon
$ vim config.ini
$ make
$ sudo ./polygon
~~~
