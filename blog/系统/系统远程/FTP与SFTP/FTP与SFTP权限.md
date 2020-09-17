# FTP与SFTP权限设置

## FTP基本命令

```shell
#which vsftpd
/usr/sbin/vsftpd
#service vsftpd status
#service vsftpd start
#service vsftpd restart
```

## FTP权限设置

是否允许切换到上级目录

```shell
# 设置是否启用chroot_list_file配置项指定的用户列表文件。默认值为NO。
# chroot_list_enable为NO时，理解成配置的用户列表为空，直接控制所有用户。
chroot_list_enable=YES/NO（NO）
# 用于指定用户列表文件，该文件用于控制哪些用户可以切换到用户家目录的上级目录。
chroot_list_file=/etc/chroot_list
# 用于指定用户列表文件中的用户是否允许切换到上级目录。默认值为NO。
# NOTE:chroot_local_user为NO时，list中配置的用户不能切换到其他目录。为YES时表示列出的用户可以切换到其他目录。
chroot_local_user=YES/NO（NO）
```

控制用户访问

```shell
# 控制用户访问FTP的文件，里面写着用户名称
userlist_file=/etc/vsftpd/user_list
# 是否启用vsftpd.user_list文件
userlist_enable=YES/NO（NO）
# 决定vsftpd.user_list文件中的用户是否能够访问FTP服务器。若设置为YES，则vsftpd.user_list文件中的用户不允许访问FTP，若设置为NO，则只有vsftpd.user_list文件中的用户才能访问FTP。
userlist_deny=YES/NO（YES）
# 文件专门用于定义不允许访问FTP服务器的用户列表,优先级比以上配置规则要高。
/etc/vsftpd/ftpusers
```

## SFTP 关闭与开启

vsftpd是专门针对ftp协议进行配置的，使用中注意区分sftp，`sftp是ssh内含的协议，只要sshd服务器启动了，它就可用，它本身不需要ftp服务器启动。但ssh可配置是否开启sftp功能，ssh目前主要功能远程登录+ftp功能`。

```shell
vi /etc/ssh/sshd_config
Subsystem sftp /usr/libexec/openssh/sftp-server //注释此处
service sshd restart //重启生效
```

## SFTP设置可访问路径

按群组控制，修改/etc/ssh/sshd_config文件

```shell
# 需要注释掉Subsystem，UsePAM，添加如下代码：
Subsystem sftp internal-sftp  #指定使用sftp服务使用系统自带的internal-sftp
Match Group sftpusers  #匹配用户，如果要匹配多个组，多个组之间用逗号分割
ChrootDirectory %h #ChrootDirectory则为允许访问的sftp目录，%h是用户主目录，也可以写指定路径；
```

控制单一用户

```shell
Subsystem sftp internal-sftp  
Match User ftpuser  
ChrootDirectory %h
```

注意

```shell
ChrootDirectory目录权限设置上要遵循2点：
ChrootDirectory设置的目录权限及其所有的上级文件夹权限，属主和属组必须是root；
ChrootDirectory设置的目录权限及其所有的上级文件夹权限，只有属主能拥有写权限，权限最大设置只能是755。
针对多个用户或者用户组，设置不同的访问路径，可以设置多个Match和ChrootDirectory。如果设置相同的Match，只有第一个生效。ChrootDirectory不能设置多个。
```

