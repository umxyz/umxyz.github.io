# Git常见错误与操作

## **1. 出现错误 error:src refspec master does not match any**

原因分析：

引起该错误的原因是目录中没有文件，空目录是不能提交上去的

解决办法：

```
$ touch README
$ git add README
$ git commit –m’first commit’
$ git push origin master
```

(来自：http://www.open-open.com/lib/view/open1366080269265.html)
实际上

```html
$ git init
```

这一步之后创建了一个名为.git的文件夹，不过它在默认状态下是隐藏的，系统将隐藏文件夹显示出来，可以看到有这样一个文件夹。
github上传项目方法：
http://www.oschina.net/question/159132_86728
在你的电脑上装好git

大致流程是：

>1、 在github上创建项目
>2、 使用$ git clone https://github/xx账号/xx项目.git克隆到本地
>3、 编辑项目
>4、 $ git add .(将改动添加到暂存区)
>5、 $ git commit –m”提交说明”
>6、 $ git push origin 将本地更改推送到远程master分支

这样你就完成了向远程仓库的推送

如果在github的remote上已经有了文件，会出现错误。此时应当先pull一下，即：

```bash
git pull origin master
```

然后再进行：

```bash
git push origin master
```

## 2. 如果输入$ git remoteadd origin [**git@github.com:djqiang（github帐号名）/gitdemo（项目名）.git**](mailto:git@github.com:djqiang/gitdemo.git) 

  **提示出错信息：fatal: remoteorigin already exists.**

  解决办法如下：

>   1、先输入$ git remote rmorigin
>
>   2、再输入$ git remote addorigin git@github.com:djqiang/gitdemo.git 就不会报错了！
>
>   3、如果输入$ git remote rmorigin 还是报错的话，error: Could not remove config section'remote.origin'. 我们需要修改gitconfig文件的内容
>
>   4、找到你的github的安装路径
>
>   5、找到一个名为gitconfig的文件，打开它把里面的`[remote "origin"]``那一行`删掉就好了！

## 3. 如果输入$ ssh -T[**git@github.com**](mailto:git@github.com)

  出现错误提示：Permissiondenied (publickey).因为新生成的key不能加入ssh就会导致连接不上github。**

  解决办法如下：

> 1、先输入`$ ssh-agent`，再输入`$ ssh-add ~/.ssh/id_key`，这样就可以了。
>
>  2、如果还是不行的话，输入ssh-add~/.ssh/id_key 命令后出现报错Could not open a connection toyour authentication agent.解决方法是key用Git Gui的ssh工具生成，这样生成的时候key就直接保存在ssh中了，不需要再ssh-add命令加入了，其它的user，token等配置都用命令行来做。
>
>   3、最好检查一下在你复制id_rsa.pub文件的内容时有没有产生多余的空格或空行，有些编辑器会帮你添加这些的。

## 4. 如果输入$ git push origin master

  **提示出错信息：error:failedto push som refs to .......**

  **解决办法如下：**

```html
1. 先输入$ git pullorigin master //先把远程服务器github上面的文件拉下来
2. 再输入$ git pushorigin master
3. 如果出现报错 fatal:Couldn't find remote ref master或者fatal: 'origin' doesnot appear to be a git repository以及fatal: Could notread from remote repository.
4. 则需要重新输入$ git remoteadd yuuxeun@github.com:yuuxeun/xxx.git
```

## 5. Permission denied (publickey)

 https://help.github.com/cn/articles/error-permission-denied-publickey 

在linux装完git，然后clone github的项目时出问题，报以下错误。

```
  Permission denied (publickey).
  fatal: Could not read from remote repository.

  Please make sure you have the correct access rights

  Permission denied (publickey).
  fatal: Could not read from remote repository.

  Please make sure you have the correct access rights
```

出现这个错误很显然是ssh key的问题。我们只需要跟github官方的配置ssh的流程走一遍就行了。 考虑到一些童鞋看不懂，俺还是把流程描述一遍(当年俺也是不懂英文，没 有中文资料那个痛苦啊…)。

### 1.生成SSH Keys

如果已经生存了ssh key,那就可以跳过这一步了。可以用以下命令查看
ls -l ~/.ssh

如果出现id_rsa 和 id_rsa_pub 那就说明已经生成。

如果没有，按一下步骤生成
ssh-keygen -t rsa -C “229781766@qq.com”

下面的步骤，可以一直都敲回车，如果对安全性要求很高，就自己输入密码吧。成功后，你会看到下面的提示:

```
# Your public key has been saved in /Users/you/.ssh/id_rsa.pub.
# The key fingerprint is:
# 01:0f:f4:3b:ca:85:d6:17:a1:7d:f0:68:9d:f0:a2:db your_email@example.com    
Your identification has been saved in /Users/you/.ssh/id_rsa.
# Your public key has been saved in /Users/you/.ssh/id_rsa.pub.
# The key fingerprint is:
# 01:0f:f4:3b:ca:85:d6:17:a1:7d:f0:68:9d:f0:a2:db your_email@example.com

Your identification has been saved in /Users/you/.ssh/id_rsa.123456789
```

### 2.Key 添加到ssh-agent

ssh-agent 貌似是对解密的专用密钥进行高速缓存。在windows 没有这一步，linux还需要手动添加到ssh-agent。首先确定ssh-agent是否启用

```
ssh-agent -s1
```

如果看到Agent pid xxxxx 那就说明已经启用

然后把私钥添加到ssh-agent就可以了。

```
ssh-add ~/.ssh/id_rsa1
```

1. `cat ~/.ssh/id_rsa.pub`
2. 把公钥添加到自己的github

这个过程很简单，我简略写一下。依次进入settings–>ssh keys–>add ssh key 然后把你的公钥添加进这里就ok了。

找了许多解决方法都搞不定，最终还是按照github 官方的流程走通了。git 不是linux的亲儿子么，怎么在linux配置比其他平台还麻烦,不得不吐槽啊。。

## 6.warning: LF will be replaced by CRLF in whitelist.pac.

​	The file will have its original line endings in your working directory

在Unix系统中，行尾用换行（LF）表示。在窗口中，用回车（CR）和换行（LF）（CRLF）表示一行。当您从unix系统上载的git中获取代码时，它们将只有LF。

如果您是在Windows机器上工作的单个开发人员，并且不关心git自动将LF替换为CRLF，则可以通过在git命令行中键入以下内容来关闭此警告

```
git config core.autocrlf true
```

## 7. error: failed to push some refs to 'https://github.com/xxxx.git'

**解决办法**：错误信息中可以看出本地和远程匹配不完整, 在网上也查找了下, 总结为本地仓库和远程仓库有冲突所致 .

总结的几种解决办法:

1: 进行push前先将远程仓库pull到本地仓库

```shell
git pull origin master    #git pull --rebase origin master
git push -u origin master
```

2: 强制push本地仓库到远程 (这种情况不会进行merge, 强制push后远程文件可能会丢失 不建议使用此方法)

```shell
git push -u origin master -f
```

3: 避开解决冲突, 将本地文件暂时提交到远程新建的分支中

```shell
git branch [name]
# 创建完branch后, 再进行push
git push -u origin [name]
```

## 8. failed to execute git

在vscoad中选择全部提交时候提示 Git:failed to execute git

在git日志中会看到这么一行错误信息 empty ident name (for <XXXXXX.com>) not allowed  (XXXXXX为你的邮箱)

出现这个错误的原因是：git没有设置用户信息

设置user.email和user.name

```shell
git config --global user.email "229781766@qq.com"
git config --global user.name "yuuxeun"
```

重新提交

## 9.Host key verification failed

```shell
ssh -t git@github.com
```



## 10.[fatal: read error: Connection reset by peer](https://stackoverflow.com/questions/17977206/fatal-read-error-connection-reset-by-peer)

If internet connection is also fine, just run

```shell
git gc 
```