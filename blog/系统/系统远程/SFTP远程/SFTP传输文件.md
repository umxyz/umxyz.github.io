# SFTP传输文件

SFTP是在本地和远程服务器之间传输文件的安全方式。比FTP更安全，此协议使用SSH隧道建立连接并使用加密在交互式会话中传输文件。

## 什么是SFTP？

FTP或“文件传输协议”是在两个远程系统之间传输文件的常用方法。

SFTP（代表SSH文件传输协议或安全文件传输协议）是与SSH捆绑的单独协议，通过安全连接以类似方式工作。 优点是能够利用安全连接来传输文件并遍历本地和远程系统上的文件系统。

在几乎所有情况下，SFTP优于FTP，因为其基础安全功能和在SSH连接上捎带的能力。 FTP是一种不安全的协议，应仅在有限的情况下或在您信任的网络上使用。

虽然SFTP集成到许多图形工具中，但本指南将演示如何通过其交互式命令行界面使用它。

## 如何连接SFTP

默认情况下，SFTP使用SSH协议来验证和建立安全连接。 因此，SSH中存在相同的身份验证方法。

虽然默认情况下密码很容易使用和设置，但我们建议您创建SSH密钥，并将您的公钥传输到需要访问的任何系统。 这是更安全，可以节省你的时间，从长远来看。

请参阅本指南， [设置SSH密钥](https://www.howtoing.com/how-to-set-up-ssh-keys--2/)才能访问您的服务器，如果你还没有这样做的话。

如果您可以使用SSH连接到计算机，那么您已经完成了使用SFTP管理文件所需的所有必要的要求。 使用以下命令测试SSH访问：

```shell
ssh username@remote_hostname_or_IP
```

如果有效，请通过键入退出：

```shell
exit
```

我们可以建立SSH连接，然后通过发出以下命令使用该连接打开SFTP会话：

```shell
sftp username@remote_hostname_or_IP
```

您将连接远程系统，您的提示将更改为SFTP提示。

## 在SFTP中获取帮助

最先学习的最有用的命令是help命令。 这使您可以访问SFTP帮助的摘要。 您可以通过在提示中键入以下命令来调用它：

```shell
help
?
```

这将显示可用命令的列表：

```shell
Available commands:
bye                                Quit sftp
cd path                            Change remote directory to 'path'
chgrp grp path                     Change group of file 'path' to 'grp'
chmod mode path                    Change permissions of file 'path' to 'mode'
chown own path                     Change owner of file 'path' to 'own'
df [-hi] [path]                    Display statistics for current directory or
                                   filesystem containing 'path'
exit                               Quit sftp
get [-Ppr] remote [local]          Download file
help                               Display this help text
lcd path                           Change local directory to 'path'
. . .
```

我们将探索在以下部分中看到的一些命令。

## 使用SFTP导航

我们可以使用许多与它们的shell对应函数类似的命令来浏览远程系统的文件层次结构。

首先，让我们通过找到当前在远程系统上的目录来定位自己。 就像在一个典型的shell会话，我们可以键入以下获取当前目录：

```shell
pwd
Remote working directory: /home/demouser
```

我们可以使用另一个熟悉的命令查看远程系统的当前目录的内容：

```shell
ls
Summary.txt     info.html       temp.txt        testDirectory
```

请注意，SFTP接口中的命令不是正常的shell命令，并且不是功能丰富的，但它们实现了一些更重要的可选标志：

```shell
ls -la
drwxr-xr-x    5 demouser   demouser       4096 Aug 13 15:11 .
drwxr-xr-x    3 root     root         4096 Aug 13 15:02 ..
-rw-------    1 demouser   demouser          5 Aug 13 15:04 .bash_history
-rw-r--r--    1 demouser   demouser        220 Aug 13 15:02 .bash_logout
-rw-r--r--    1 demouser   demouser       3486 Aug 13 15:02 .bashrc
drwx------    2 demouser   demouser       4096 Aug 13 15:04 .cache
-rw-r--r--    1 demouser   demouser        675 Aug 13 15:02 .profile
. . .
```

要进入另一个目录，我们可以发出以下命令：

```shell
cd testDirectory
```

我们现在可以遍历远程文件系统，但如果我们需要访问本地文件系统怎么办？ 我们可以通过在本地文件系统前面使用“l”为本地文件系统指向命令。

到目前为止讨论的所有命令都具有本地等价物。 我们可以打印本地工作目录：

```shell
pwd
Local working directory: /Users/demouser
```

我们可以在本地机器上列出当前目录的内容：

```shell
ls
Desktop			local.txt		test.html
Documents		analysis.rtf		zebra.html
```

我们还可以更改我们希望在本地系统上进行交互的目录：

```shell
cd Desktop
```

## 使用SFTP传输文件

浏览远程和本地文件系统的有用性有限，无法在两者之间传输文件。

### 将远程文件传输到本地系统

如果我们希望从远程主机下载文件，我们可以通过发出以下命令：

```shell
get remoteFile
Fetching /home/demouser/remoteFile to remoteFile
/home/demouser/remoteFile                       100%   37KB  36.8KB/s   00:01
```

如您所见，默认情况下，“get”命令将远程文件下载到本地文件系统上具有相同名称的文件。

我们可以通过以后指定名称将远程文件复制到不同的名称：

```shell
get remoteFile localFile
```

“get”命令也需要一些选项标志。 例如，我们可以通过指定递归选项来复制目录及其所有内容：

```shell
get -r someDirectory
```

我们可以通过使用“-P”或“-p”标志告诉SFTP维护适当的权限和访问时间：

```shell
get -Pr someDirectory
```

### 将本地文件传输到远程系统

使用相应命名的“put”命令可以轻松完成将文件传输到远程系统：

```shell
put localFile
Uploading localFile to /home/demouser/localFile
localFile                                     100% 7607     7.4KB/s   00:00
```

使用“get”的相同标志适用于“put”。 所以要复制整个本地目录，您可以发出：

```shell
put -r localDirectory
```

注意

目前一个[错误](https://bugzilla.mindrot.org/show_bug.cgi?id=2150)在随电流的Ubuntu版本（至少14.04至15.10）OpenSSH的版本，以防止上面的命令正确操作。 一旦发出上述命令将内容传送到使用OpenSSH的越野车版本的服务器，将得到下面的错误： `Couldn't canonicalise: No such file or directory` 。

要解决此问题，首先键入创建远端目标目录`mkdir localDirectory` 。 之后，上面的命令应该没有错误地完成。

在下载和上传文件时非常有用的一个常用工具是“df”命令，其工作方式类似于命令行版本。 使用此功能，您可以检查您是否有足够的空间来完成感兴趣的传输：

```shell
df -h
    Size     Used    Avail   (root)    %Capacity
  19.9GB   1016MB   17.9GB   18.9GB           4%
```

请注意，这个命令没有本地变体，但是我们可以通过发出“！ 命令。

“！” 命令将我们放到本地shell中，在这里我们可以运行本地系统上可用的任何命令。 我们可以通过键入以下内容检查磁盘使用情况

```shell
!
df -h
Filesystem      Size   Used  Avail Capacity  Mounted on
/dev/disk0s2   595Gi   52Gi  544Gi     9%    /
devfs          181Ki  181Ki    0Bi   100%    /dev
map -hosts       0Bi    0Bi    0Bi   100%    /net
map auto_home    0Bi    0Bi    0Bi   100%    /home
```

任何其他本地命令将按预期工作。 要返回到SFTP会话，请键入：

```shell
exit
```

您现在应该看到SFTP提示返回。

## 使用SFTP的简单文件操作

SFTP允许您执行在使用文件层次结构时有用的基本文件维护类型。

例如，您可以使用以下命令更改远程系统上文件的所有者：

```shell
chown userID file
```

请注意，与系统“chmod”命令不同，SFTP命令不接受用户名，而是使用UID。 不幸的是，没有简单的方法从SFTP接口内知道适当的UID。

有关的工作可以用以下方式完成：

```shell
get /etc/passwd
!less passwd
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/bin/sh
bin:x:2:2:bin:/bin:/bin/sh
sys:x:3:3:sys:/dev:/bin/sh
sync:x:4:65534:sync:/bin:/bin/sync
games:x:5:60:games:/usr/games:/bin/sh
man:x:6:12:man:/var/cache/man:/bin/sh
. . .
```

注意如何而不是给出“！ 命令本身，我们使用它作为本地shell命令的前缀。 这工作以运行在本地机器上可用的任何命令，并且可以早先已经与本地“df”命令一起使用。

UID将位于文件的第三列，由冒号字符描绘。

同样，我们可以更改文件的组所有者：

```shell
chgrp groupID file
```

同样，没有简单的方法来获得远程系统组的列表。 我们可以使用以下命令解决它：

```shell
get /etc/group
!less group
root:x:0:
daemon:x:1:
bin:x:2:
sys:x:3:
adm:x:4:
tty:x:5:
disk:x:6:
lp:x:7:
. . .
```

第三列包含与第一列中的名称相关联的组的ID。 这是我们正在寻找的。

幸运的是，“chmod”命令在远程文件系统上按预期工作：

```shell
chmod 777 publicFile
Changing mode on /home/demouser/publicFile
```

没有用于操作本地文件权限的命令，但是您可以设置本地umask，以便任何复制到本地系统的文件都将具有相应的权限。

这可以通过“lumask”命令完成：

```shell
lumask 022
Local umask: 022
```

现在所有常规文件下载（只要“-p”标志不使用）将有644权限。

SFTP允许您分别使用“lmkdir”和“mkdir”在本地和远程系统上创建目录。 这些工作按预期。

其余的文件命令仅目标为远程文件系统：

```shell
ln
rm
rmdir
```

这些命令复制shell版本的基本行为。 如果需要在本地文件系统上执行这些操作，请记住，您可以通过发出以下命令进入shell：

```shell
!
```

或者在本地系统上执行单个命令，将命令前面加上“！” 像这样：

```shell
!chmod 644 somefile
```

完成SFTP会话后，使用“exit”或“bye”关闭连接。

```shell
bye
```

## 结论

虽然SFTP是一个简单的工具，但它对于管理服务器和在它们之间传输文件非常有用。

如果你习惯使用FTP或SCP来完成你的转移，SFTP是一个很好的方法来利用两者的优势。 虽然它不适合每一种情况，它是一个灵活的工具，在你的剧目。