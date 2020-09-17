# [ssh限制和允许IP登陆](https://www.cnblogs.com/EasonJim/p/8334122.html)

说明：一般要实现这种功能时，先安装VPN，然后客户端登录VPN，然后通过内网IP登录SSH。

**搭建OpenVPN：**

参考：http://www.cnblogs.com/EasonJim/p/8333836.html

**配置服务器的SSH：**

## 1、限制用户SSH登录

只允许指定用户进行登录（白名单）：

在/etc/ssh/sshd_config配置文件中设置AllowUsers选项，（配置完成需要重启 SSHD 服务）格式如下：

```shell
AllowUsers    aliyun test@192.168.1.1            
# 允许 aliyun 和从 192.168.1.1 登录的 test 帐户通过 SSH 登录系统。
```

只拒绝指定用户进行登录（黑名单）：

在/etc/ssh/sshd_config配置文件中设置DenyUsers选项，（配置完成需要重启SSHD服务）格式如下：  

```shell
DenyUsers    zhangsan aliyun    #Linux系统账户        
# 拒绝 zhangsan、aliyun 帐户通过 SSH 登录系统
```

重启SSH

```shell
service sshd restart
```

## 2、限制IP SSH登录

**说明：这里的IP是指客户端IP，不是服务器IP，下面的例子使用了hosts.allow文件的配置方式，目的是快，但也有不灵活的，建议改成iptables的方案。

**

除了可以禁止某个用户登录，我们还可以针对**固定的IP进行禁止登录**，linux 服务器通过设置**/etc/hosts.allow**和**/etc/hosts.deny**这个两个文件，hosts.allow许可大于hosts.deny可以限制或者允许某个或者某段IP地址远程 SSH 登录服务器，方法比较简单，且设置后立即生效，不需要重启SSHD服务，具体如下：

/etc/hosts.allow添加

```shell
sshd:192.168.0.1:allow  #允许 192.168.0.1 这个IP地址SSH登录
sshd:192.168.0.:allow #允许192.168.0.1/24这段IP地址的用户登录，多个网段可以以逗号隔开，比如192.168.0.,192.168.1.:allow
```

/etc/hosts.allow添加

```shell
sshd:ALL #允许全部的ssh登录 
```

hosts.allow和hosts.deny两个文件同时设置规则的时候，**hosts.allow文件中的规则优先级高**，按照此方法设置后服务器只允许192.168.0.1这个IP地址的SSH登录，其它的IP都会拒绝。

/etc/hosts.deny添加

```shell
sshd:ALL #拒绝全部IP
```

针对hosts.deny的参考：http://www.cnblogs.com/EasonJim/p/8338931.html

**iptables方案：**

还在学着，学会再来。 

 

参考：

http://blog.itpub.net/26937943/viewspace-1756999/

https://www.cnblogs.com/xiaochina/p/5920057.html

http://blog.csdn.net/chinalinuxzend/article/details/1849412

http://blog.csdn.net/god123209/article/details/17683939javascript:void(0))