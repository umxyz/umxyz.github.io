# pure-ftpd创建只读虚拟账户

## 一、FTP只读权限设置：

打开 `/usr/local/pureftpd/etc/pureftpd.passwd` 修改UID值1001(www)为其他UID(必须大于MinUID=100)，比如9999(不存在的用户ID)：

```shell
sanxing:$6$1iHVhLYDFs3bP:1001:1001::/storage/wwwroot/sanxing.abc.net/./::::::::::::
```

修改为

```shell
sanxing:$6$1iHVhLYDFs3bP:9999:1001::/storage/wwwroot/sanxing.abc.net/./::::::::::::
```

或者直接命令行修改：

```shell
/usr/local/pureftpd/bin/pure-pw usermod sanxing -u 9999 -g 1001
```

## 二、生成索引文件，立即生效：

```shell
/usr/local/pureftpd/bin/pure-pw mkdb
```

## 三、修改目录的权限（其他用户other给读权限，删除写权限）：

```shell
chmod -R o-w /storage/wwwroot/sanxing.abc.net/
chmod -R o+r /storage/wwwroot/sanxing.abc.net/
```

注意，有些程序，比如 laravel 需要一些目录有 执行 权限（x）：

现在登录FTP，用户就只有查看的权限了。

## 补充：

pure-pw的使用方法：

```shell
Usage :

pure-pw useradd <login> [-f <passwd file>] -u <uid> [-g <gid>]
                -D/-d <home directory> [-c <gecos>]
                [-t <download bandwidth>] [-T <upload bandwidth>]
                [-n <max number of files>] [-N <max Mbytes>]
                [-q <upload ratio>] [-Q <download ratio>]
                [-r <allow client ip>/<mask>] [-R <deny client ip>/<mask>]
                [-i <allow local ip>/<mask>] [-I <deny local ip>/<mask>]
                [-y <max number of concurrent sessions>]
                [-z <hhmm>-<hhmm>] [-m]

pure-pw usermod <login> -f <passwd file> -u <uid> [-g <gid>]
                -D/-d <home directory> -[c <gecos>]
                [-t <download bandwidth>] [-T <upload bandwidth>]
                [-n <max number of files>] [-N <max Mbytes>]
                [-q <upload ratio>] [-Q <download ratio>]
                [-r <allow client ip>/<mask>] [-R <deny client ip>/<mask>]
                [-i <allow local ip>/<mask>] [-I <deny local ip>/<mask>]
                [-y <max number of concurrent sessions>]
                [-z <hhmm>-<hhmm>] [-m]

pure-pw userdel <login> [-f <passwd file>] [-m]

pure-pw passwd  <login> [-f <passwd file>] [-m]

pure-pw show    <login> [-f <passwd file>]

pure-pw mkdb    [<puredb database file> [-f <passwd file>]]
                [-F <puredb file>]

pure-pw list    [-f <passwd file>]
```