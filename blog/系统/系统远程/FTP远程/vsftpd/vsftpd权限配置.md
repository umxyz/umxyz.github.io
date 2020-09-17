# vsftpd权限配置

## chroot_local_user与chroot_list_enable详解

很多情况下，我们希望限制ftp用户只能在其主目录下（root dir）下活动，不允许他们跳出主目录之外浏览服务器上的其他目录，这时候我就需要使用到chroot_local_user,chroot_list_enable,chroot_list_file这三个选项了。以下是对三个配置项的解释：

> - **chroot_local_use**r #是否将所有用户限制在主目录,YES为启用 NO禁用.(该项默认值是NO,即在安装vsftpd后不做配置的话，ftp用户是可以向上切换到要目录之外的)
>
> - **chroot_list_enable** #是否启动限制用户的名单 YES为启用 NO禁用(包括注释掉也为禁用)
>
> - **chroot_list_file=/etc/vsftpd/chroot_list** #是否限制在主目录下的用户名单，至于是限制名单还是排除名单，这取决于chroot_local_user的值，我们可以这样记忆： chroot_local_user总是一个**全局性**的设定，其为YES时，全部用户被锁定于主目录，其为NO时，全部用户不被锁定于主目录。那么我们势必需要在全局设定下能做出一些“**微调**”，即，我们总是需要一种“**例外机制**"，所以当chroot_list_enable=YES时，表示我们“需要例外”。而”例外“的含义总是有一个上下文的，即，当”全部用户被锁定于主目录“时（即chroot_local_user=YES），"例外"就是：不被锁定的用户是哪些；当"全部用户不被锁定于主目录"时（即chroot_local_user=NO），"例外"“就是：要被锁定的用户是哪些。这样解释和记忆两者之间的关系就很清晰了！

 对于chroot_local_user与chroot_list_enable的组合效果，可以参考下表：

|                        | chroot_local_user=YES                                        | chroot_local_user=NO                                         |
| ---------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| chroot_list_enable=YES | 1.所有用户都被限制在其主目录下 2.使用chroot_list_file指定的用户列表，这些用户作为“例外”，不受限制 | 1.所有用户都不被限制其主目录下 2.使用chroot_list_file指定的用户列表，这些用户作为“例外”，受到限制 |
| chroot_list_enable=NO  | 1.所有用户都被限制在其主目录下 2.不使用chroot_list_file指定的用户列表，没有任何“例外”用户 | 1.所有用户都不被限制其主目录下 2.不使用chroot_list_file指定的用户列表，没有任何“例外”用户 |


让我们举个例子:

假设有ftp1, ftp2两个ftp用户, 计划让ftp1用户锁定在主目录下，不允许切换到其他目录, 但是允许ftp2用户自由切换目录，则可以分如下两种方式实现：

方式一:

```bash
chroot_local_user=YES
chroot_list_enable=YES
/etc/vsftpd/chroot_list名单列表为:
ftp2
```



解释：chroot_local_user=YES将所有用户限定在主目录内，chroot_list_enable=YES表示要启用chroot_list_file, 因为chroot_local_user=YES，即全体用户都被“限定在主目录内”,所以总是作为“例外列表”的chroot_list_file这时列出的是那些“不会被限制在主目录下”的用户。

方式二:

```shell
chroot_local_user=NO
chroot_list_enable=YES
/etc/vsftpd/chroot_list名单列表为:
ftp1
```

解释：chroot_local_user=NO则所有用户不被限定在主目录内，chroot_list_enable=YES表示要启用chroot_list_file, 因为chroot_local_user=NO，即全体用户都“不被限定在主目录内”,所以总是作为“例外列表”的chroot_list_file这时列出的是那些“会被限制在主目录下”的用户。



其他情况：

对于chroot_local_user和chroot_list_enable的组合还有这样两种情况：

```shell
chroot_local_user=YES
chroot_list_enable=NO
和
chroot_local_user=NO
chroot_list_enable=NO
```

当chroot_list_enable=NO时，就不再启用chroot_list_file，此时就是单纯的把全部用户限定或不限定在主目录下了！



补充：

- 关于chroot_local_user的设置，通常我们倾向于：全局禁止跳出主目录，使用chroot_list添加例外！即：使用Case 1的设置！

- 匿名用户默认的root是/var/ftp