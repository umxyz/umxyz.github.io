# [ubuntu python版ssr](https://cndaqiang.github.io/tag/#python)

------

## 参考

[github-shadowsocksr-backup/shadowsocksr](https://github.com/shadowsocksr-backup/shadowsocksr)

[SSR配置config.json配置文件各项说明](http://www.zhouxuanyu.com/381.html)

## 环境

Ubuntu 16.04 LTS (GNU/Linux 2.6.32-042stab116.2 x86_64)

Ubuntu 16.04.2 LTS (GNU/Linux 4.4.0-62-generic x86_64)

python版本 python 2.7

## 操作

### 安装python

```bash
$ sudo apt-get update
$ sudo apt-get install python
```

### 下载ssr

```bash
$ mkdir shadowsocksr
$ cd shadowsocksr/
$ wget https://github.com/cndaqiang/shadowsocksr/archive/manyuser.zip
```

### 配置ssr

```bash
$ sudo apt-get install unzip
$ unzip manyuser.zip 
cd shadowsocksr-manyuser/
```

配置文件shadowsocksr-manyuser/config.json

配置文件内容解释可参考[SSR配置config.json配置文件各项说明](http://www.zhouxuanyu.com/381.html)

主要参数和示例

```bash
"server_port":8388,        //端口
"password":"password",     //密码
"protocol":"origin",       //协议插件
"obfs":"http_simple",      //混淆插件
"method":"aes-256-cfb",    //加密方式
```

#### 配置示例

多用户，不同用户不同端口 **修改** ` vi config.json ` **删除以下内容**

```bash
    "server_port": 8388,
    "password": "m",
```

添加，不同端口和密码

```bash
"port_password":{
        "端口1":"密码1",
        "端口2":"密码2"
         },
```

其他参数可自定义

```bash
"protocol":"origin",       //协议插件
"obfs":"http_simple",      //混淆插件
"method":"aes-256-cfb",    //加密方式
```

### 启动服务

```bash
$ python ./shadowsocks/server.py -c config.json
```

会显示连接等信息 其他启动方式

```bash
sudo  python ./shadowsocks/server.py -c config.json -d start
```

停止

```bash
sudo  python ./shadowsocks/server.py -c config.json -d stop
```

帮助

```bash
python ./shadowsocks/server.py -h
```

## 客户端

IOS： Potatso Lite（支持的参数更多） </br> Wingy 其他平台自行搜索

### linux端

与服务器端使用相同软件

```bash
$ wget https://github.com/cndaqiang/shadowsocksr/archive/manyuser.zip
```

过程同服务器安装 config.json修改为

```bash
"server": "服务器密码ipv4地址",
    "server_ipv6": "::",

    "local_address": "127.0.0.1", 本地地址
    "local_port": xxx, 本地socks端口
    "server_port": xxx, 服务器端口
    "password": "密码", 服务器密码
```

其他参数同服务器一样就可以
使用方式

```bash
sudo python ./shadowsocks/local.py -c config.json -d start|stop
```

## 遇到的问题

如果安装防火墙，请允许对应端口通过