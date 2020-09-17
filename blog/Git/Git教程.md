# Git教程

```shell
git config --global http.postBuffer 157286400
git init
git add .
git commit -m "sync"
git remote add origin https://github.com/用户名/仓库名
git push -u origin master
```

```shell
git remote -v
git remote rm origin
#ssh
git remote add origin git@github.com:yuuxeun/X.git
#https
git remote add origin https://github.com/yuuxeun/x.git
```

## SSH版

1. Linux中安装git:`sudo apt-get install git`
2. `git config --global user.name "yuuxeun" git config --global user.email "229781766@qq.com"`
   这里用github的账号名和邮箱
3. 生成SSH 并在github上设置
   终端里cd 进入.ssh文件夹`cd ~/.ssh`并`ssh-keygen -t rsa -C "email@example.com"`生成SSH密匙，保存在.ssh/id_rsa.pub文件中。把生成的密匙复制粘贴到github–>settings–>SSH and GPG keys–>new SSH key中，保存
   不进行这一步会出现：

```
The authenticity of host 'github.com (192.30.255.112)' can't be established.
RSA key fingerprint is SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added 'github.com,192.30.255.112' (RSA) to the list of known hosts.
Permission denied (publickey).
fatal: 无法读取远程仓库。
请确认您有正确的访问权限并且仓库存在。1234567
```

1. cd进入要建为仓库的文件夹，
   - `git init` ——初始化
   - `git add .`——添加所有文件进入仓库
   - `git commit -m "wrote a readme file"`——提交至仓库
2. 从本地添加至云端仓库
   - `git remote add origin git@github.com:××/××.git`——××/××是你的账号名/仓库名，云端仓库名一定要和本地仓库名相同
   - `git push origin master`——把本地master分支的最新修改推送至GitHub
     上一步可能出现报错如下

```
Warning: Permanently added the RSA host key for IP address '192.30.255.113' to the list of known hosts.
To github.com:61305/spiderWeb.git
 ! [rejected]        master -> master (fetch first)
error: 无法推送一些引用到 'git@github.com:61305/spiderWeb.git'
提示：更新被拒绝，因为远程仓库包含您本地尚不存在的提交。这通常是因为另外
提示：一个仓库已向该引用进行了推送。再次推送前，您可能需要先整合远程变更
提示：（如 'git pull ...'）。
提示：详见 'git push --help' 中的 'Note about fast-forwards' 小节。12345678
```

那么安装提示输入`git pull`，出现

```
warning: 没有共同的提交
remote: Counting objects: 3, done.
remote: Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
展开对象中: 100% (3/3), 完成.
来自 github.com:61305/spiderWeb
 * [新分支]          master     -> origin/master
当前分支没有跟踪信息。
请指定您要合并哪一个分支。
详见 git-pull(1)。

    git pull <远程> <分支>

如果您想要为此分支创建跟踪信息，您可以执行：

    git branch --set-upstream-to=origin/<分支> master
```

接着执行`git pull git@github.com:××/××.git master`
若出现报错

```
 * branch            master     -> FETCH_HEAD
fatal: 拒绝合并无关的历史
```

就输入`git pull git@github.com:××/××.git master --allow-unrelated-histories`
成功则提示

```
 * branch            master     -> FETCH_HEAD
Merge made by the 'recursive' strategy.
 README.md | 2 ++
 1 file changed, 2 insertions(+)
 create mode 100644 README.md
123456
```

那么继续输入`git push -u origin master`
可以打开登录github发现你的项目已经同步上去了

## [从现有仓库克隆](https://git-scm.com/book/zh/v1/Git-基础-取得项目的-Git-仓库#从现有仓库克隆)

如果想对某个开源项目出一份力，可以先把该项目的 Git 仓库复制一份出来，这就需要用到 `git clone` 命令。如果你熟悉其他的 VCS 比如 Subversion，你可能已经注意到这里使用的是 `clone` 而不是 `checkout`。这是个非常重要的差别，Git 收取的是项目历史的所有数据（每一个文件的每一个版本），服务器上有的数据克隆之后本地也都有了。实际上，即便服务器的磁盘发生故障，用任何一个克隆出来的客户端都可以重建服务器上的仓库，回到当初克隆时的状态（虽然可能会丢失某些服务器端的挂钩设置，但所有版本的数据仍旧还在，有关细节请参考第四章）。

克隆仓库的命令格式为 `git clone [url]`。比如，要克隆 Ruby 语言的 Git 代码仓库 Grit，可以用下面的命令：

```
$ git clone git://github.com/schacon/grit.git
```

这会在当前目录下创建一个名为`grit`的目录，其中包含一个 `.git` 的目录，用于保存下载下来的所有版本记录，然后从中取出最新版本的文件拷贝。如果进入这个新建的 `grit` 目录，你会看到项目中的所有文件已经在里边了，准备好后续的开发和使用。如果希望在克隆的时候，自己定义要新建的项目目录名称，可以在上面的命令末尾指定新的名字：

```
$ git clone git://github.com/schacon/grit.git mygrit
```

唯一的差别就是，现在新建的目录成了 `mygrit`，其他的都和上边的一样。

Git 支持许多数据传输协议。之前的例子使用的是 `git://` 协议，不过你也可以用 `http(s)://` 或者 `user@server:/path.git` 表示的 SSH 传输协议。我们会在第四章详细介绍所有这些协议在服务器端该如何配置使用，以及各种方式之间的利弊。

## git 初始化相关操作

你在安装 Git 之后想要做的第一件事是告诉它你的名字和邮箱，个性化一些默认设置。一般初始的设置过程看上去是这样的：

 `git config --list `

```shell
# 告诉Git你是谁

git config --global user.name "yuuxeun"

git config --global user.email xxx@xx.com

# 选择你喜欢的文本编辑器

git config --global core.editor vim

# 添加一些快捷方式(别名)

git config --global alias.st status

git config --global alias.co checkout

git config --global alias.br branch

git config --global alias.up rebase

git config --global alias.ci commit
```

## git commit

```shell
git add hello.py
git commit
```

它会打开一个文件编辑器（可以通过 git config 设置) 询问提交信息，同时列出将被提交的文件。

```bash
# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
# On branch master
# Changes to be committed:
# (use "git reset HEAD <file>..." to unstage)
#
#modified: hello.py
```

Git 对提交信息没有特定的格式限制，但约定俗成的格式是：在第一行用 50 个以内的字符总结这个提交，留一空行，然后详细阐述具体的更改。比如：

```shell
Change the message displayed by hello.py

- Update the sayHello() function to output the user's name
- Change the sayGoodbye() function to a friendlier message
```

注意，很多开发者倾向于在提交信息中使用一般现在时态。这样看起来更像是对仓库进行的操作，让很多改写历史的操作更加符合直觉。

## git log

用法 一节提供了 git log 很多的栗子，但请记住，你可以将很多选项用在同一个命令中：

`git log --author="John Smith" -p hello.py`
这个命令会显示 John Smith 作者对 hello.py 文件所做的所有更改的差异比较（diff）。

..句法是比较分支很有用的工具。下面的栗子显示了在 some-feature 分支而不在 master 分支的所有提交的概览。

```shell
git log --oneline master..some-feature
```

> You can undo git add before commit with
>
> git reset <file>
> which will remove it from the current index (the "about to be committed" list) without changing anything else.
>
> You can use
>
> git reset
> without any file name to unstage all due changes. This can come in handy when there are too many files to be listed one by one in a reasonable amount of time.


