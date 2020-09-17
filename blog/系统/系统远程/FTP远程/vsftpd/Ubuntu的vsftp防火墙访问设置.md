# Ubuntu的vsftp防火墙访问设置

安装 vsftp.

```shell
sudo apt-get update
sudo apt-get install vsftpd
```



设置 vsftp 的 pasv 模式访问

```shell
sudo vi /etc/vsftpd.conf
```



打开配置文件, 添加以下几行 pasv 端口, 可以自己定义范围.

```shell
# add by Mason to allow PASV
pasv_enable=YES
pasv_min_port=20000
pasv_max_port=20200
```



重启 ftp服务.

```shell
sudo service vsftpd restart
```



修改 Ubuntu 防火墙打开访问端口.

```shell
sudo ufw allow 21/tcp
sudo ufw allow 2000:20200/tcp
sudo ufw reload
```



查看端口状态.

```shell
sudo ufw status numbered
Status: active
To Action From
-- ------ ----
[ 1] 22/tcp ALLOW IN Anywhere
[ 2] 80/tcp ALLOW IN Anywhere
[ 3] 443/tcp ALLOW IN Anywhere
[ 4] 21/tcp ALLOW IN Anywhere
[ 5] 20000:20200/tcp ALLOW IN Anywhere
[ 6] 22/tcp (v6) ALLOW IN Anywhere (v6)
[ 7] 80/tcp (v6) ALLOW IN Anywhere (v6)
[ 8] 443/tcp (v6) ALLOW IN Anywhere (v6)
[ 9] 21/tcp (v6) ALLOW IN Anywhere (v6)
[10] 20000:20200/tcp (v6) ALLOW IN Anywhere (v6)
```



使用 ftp 客户端访问服务器, 测试正常.