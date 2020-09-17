# [SSH访问控制防止暴力破解封IP](http://www.linuxidc.com/Linux/2014-09/107370.htm)

一、系统：[CentOS](http://www.linuxidc.com/topicnews.aspx?tid=14) 6.3 64位

二、方法：读取/var/log/secure，查找关键字 Failed，例如（注：文中的IP地址特意做了删减）：

Sep 17 09:08:09 localhost sshd[29087]: Failed password for root from 13.7.3.6 port 44367 ssh2
Sep 17 09:08:20 localhost sshd[29087]: Failed password for root from 13.7.3.6 port 44367 ssh2
Sep 17 09:10:02 localhost sshd[29223]: Failed password for root from 13.7.3.6 port 56482 ssh2
Sep 17 09:10:14 localhost sshd[29223]: Failed password for root from 13.7.3.6 port 56482 ssh2

从这些行中提取IP地址，如果次数达到5次则将该IP写到 /etc/hosts.deny中。

三、步骤：

1、先把始终允许的IP填入 /etc/hosts.allow ，这很重要！比如：
sshd:19.16.18.1:allow
sshd:19.16.18.2:allow

2、脚本 /root/secure_ssh.sh

\#! /bin/bash
cat /var/log/secure|awk ‘/Failed/{print $(NF-3)}’|sort|uniq -c|awk ‘{print $2″=”$1;}’ > /root/black.txt
DEFINE=”5″
for i in `cat /root/black.txt`
do
IP=`echo $i |awk -F= ‘{print $1}’`
NUM=`echo $i|awk -F= ‘{print $2}’`
if [ $NUM -gt $DEFINE ];then
grep $IP /etc/hosts.deny > /dev/null
if [ $? -gt 0 ];then
echo “sshd:$IP:deny” >> /etc/hosts.deny
fi
fi
done

3、将secure_ssh.sh脚本放入cron计划任务，每1分钟执行一次。
\# crontab -e
*/1 * * * * sh /root/secure_ssh.sh

四、测试：

1、开两个终端窗口，一个ssh连上服务器，另一个用错误的密码连接服务器几次。

很快，服务器上黑名单文件里已经有记录了：
[root@ ~]# $ cat /root/black.txt
13.26.21.27=3

再看看服务器上的hosts.deny
[root@ ~]# cat /etc/hosts.deny
sshd:13.7.3.6:deny
sshd:92.4.0.4:deny
sshd:94.10.4.2:deny
sshd:94.4.1.6:deny
sshd:11.64.11.5:deny

2、从另一个终端窗口继续“暴力”连接服务器。

看看服务器上的黑名单文件：
[root@ ~]# cat black.txt
13.26.21.27=6

再看看服务器上的hosts.deny
[root@ ~]# cat /etc/hosts.deny
sshd:13.7.3.6:deny
sshd:92.4.0.4:deny
sshd:94.10.4.2:deny
sshd:94.4.1.6:deny
sshd:11.64.11.5:deny
sshd:13.26.21.27:deny

IP 已经被加入到服务器的hosts.deny，再用正确的密码连接服务器，被拒绝：
$ ssh root@myserver.mydomain.com -p 2333
ssh_exchange_identification: Connection closed by remote host