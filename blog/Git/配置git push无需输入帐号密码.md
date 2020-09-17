## 编辑.git-credentials配置文件

在用户根目录下,编辑 .git-credentials 文件(没有则创建一个)

```bash
gaoyisheng@kali:~$ vi .git-credentials
```

添加一行内容：

```shell
https://{username}:{password}@github.com
```

ps：当用户名为邮箱时，需要把用户名的@转义为%40

## 配置储存模式

- 默认所有都不缓存。 每一次连接都会询问你的用户名和密码。
- “cache” 模式会将凭证存放在内存中一段时间。 密码永远不会被存储在磁盘中，并且在15分钟后从内存中清除。
- “store” 模式会将凭证用明文的形式存放在磁盘中，并且永不过期。 这意味着除非你修改了你在 Git 服务器上的密码，否则你永远不需要再次输入你的凭证信息。 这种方式的缺点是你的密码是用明文的方式存放在你的 home 目录下。

```shell
git config --global credential.helper store
```

所以,用 store 参数以为着永不过期.
这时，我们可以去 ~/.gitconfig中看到追加的配置。至此，免密启用。