# [vsftp添加用户及修改用户目录](https://www.cnblogs.com/xuey/p/7844543.html)

## 添加用户 ：

```bash
useradd 用户名 -s /sbin/nologin #限定用户test不能telnet，只能ftp;

usermod -s /sbin/bash 用户名 #用户恢复正常 ;该账户路径默认指向/home/ftpadmin目录

#设置ftpadmin用户密码，运行命令：”passwd ftpadmin” ; 输入两次密码，匹配成功后，就设置好了ftpadmin用户的密码了

#测试连接，您可以在“我的电脑”地址栏中输入 ftp://IP 来连接FTP服务器，根据提示输入账户密码

vi /etc/passwd #文件里能看到刚刚创建的用户名和可访问目录信息
```


## 如果需要允许用户修改密码，但是又没有telnet登录系统的权限：

```bash
usermod -s /usr/bin/passwd test #用户telnet后将直接进入改密界面
```



## 查看是否存在此用户：

```bash
cat /etc/passwd|grep username|wc -l
```



## 限制用户的权限

```bash
usermod -s /sbin/nologin test #限定用户test不能telnet，只能ftp
usermod -s /sbin/bash test #用户test恢复正常
usermod -d /test test #更改用户test的主目录为/test
```



## 限制用户只能访问/home/test，不能访问其他路径

修改`/etc/vsftpd/vsftpd.conf`如下：

```bash
chroot_list_enable=YES #限制访问自身目录
# (default follows)
chroot_list_file=/etc/vsftpd/vsftpd.chroot_list
```

如果没有`/etc/vsftpd/chroot_list`文件请新建，把用户名test写进去，每个用户名一行保存，可参见同目录下`user_list`文件格式

 

## 更改文件夹权限 

```bash
chown 用户组:用户名 -R /test 

chmod 755 -R /test 

#注意其他文件夹权限，最好也是755一下的，不能让新ftp账户修改到其他的文件夹
```



## 重启ftp服务

` service vsftpd restart`  或者 `/etc/rc.d/init.d/vsftpd restart`

问题1. 连接`ftp`出现 `553 Could not create file`

执行命令 `setsebool allow_ftpd_full_access on`

或者检查文件夹是否有可写权限

修改权限：`chmod 777 -R 文件夹  （ftp 上传目录）`

 

## 修改用户默认目录 

1、切换到root用户，直接修改`/etc/passwd`文件，找到你的用户名你一行，修改路径，然后保存即可。

2、切换到root用户，使用`usermod`命令，例如`usermod -d /tmp test `(test为你的用户名)，使用该命令请确保该用户下没有运行的软件或进程

 如果用户不能上传文件，记得`chmod -R 777 /file`

 

## 想要完全删除用户账号（也就是删除所有与该用户相关的文件），以下这两种方法个人觉得是最好的：

  （1）使用 `userdel -r xiaoluo`命令删除。

  （2）先使用`userdel xiaoluo` 删除账户和组的信息，在使用find查找所有与该用户的相关文件，在使用`rm -rf` 删除