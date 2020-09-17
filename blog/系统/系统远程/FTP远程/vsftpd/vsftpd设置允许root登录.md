# vsftpd设置允许root登录

## 背景

通过查找资料，并反复尝试修改/etc/vsftpd.ftpusers与/etc/vsftpd.user_list，均无法实现root登录ftp。

## 原因分析

```shell
root@debian:~# apt-get install vsftpd
root@debian:~# dpkg -L vsftpd
...
/etc/ftpusers
...
/etc/pam.d/vsftpd
...

root@www:/tmp# cat /etc/pam.d/vsftpd 
# Standard behaviour for ftpd(8).
auth	required	pam_listfile.so item=user sense=deny file=/etc/ftpusers onerr=succeed

# Note: vsftpd handles anonymous logins on its own. Do not enable pam_ftp.so.

# Standard pam includes
@include common-account
@include common-session
@include common-auth
auth	required	pam_shells.so


root@debian:~# cat /etc/ftpusers 
# /etc/ftpusers: list of users disallowed FTP access. See ftpusers(5).

root
daemon
bin
sys
sync
games
man
lp
mail
news
uucp
nobody
```

## 解决办法

/etc/ftpusers文件中的root前加#。