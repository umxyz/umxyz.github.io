# [宝塔面板 PHP7.3/7.4 缺少 ZipArchive 模块无法解压的解决办法](https://www.dujin.org/16054.html)

## 解决办法

### 宝塔 PHP 7.3 添加 PHP ZipArchive 模块

通过SSH执行以下命令：

```shell
cd /www/server/php/73/src/ext/zip/
/www/server/php/73/bin/phpize
./configure --with-php-config=/www/server/php/73/bin/php-config
make && make install
```

然后在 PHP 7.3 管理 → 配置文件末尾处，添加：

```shell
extension = zip.so
```

最后将PHP 7.3 `重载配置`→`重启`即可。

### 宝塔 PHP 7.4 添加 PHP ZipArchive 模块

通过SSH执行以下命令：

```shell
cd /www/server/php/74/src/ext/zip/
/www/server/php/74/bin/phpize
./configure --with-php-config=/www/server/php/74/bin/php-config
make && make install
```

然后在 PHP 7.4 管理 → 配置文件末尾处，添加：

```shell
extension = zip.so
```

最后将PHP 7.4 `重载配置`→`重启`即可。

