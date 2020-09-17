# win10 Ubuntu wsl SSH

```shell
apt-get install openssh-server
sudo apt-get install openssl
sudo apt-get install libssl-dev
```

继续修改配置，下面以密码登录的配置作说明：

```shell
nano /etc/ssh/sshd_config
Port = 22 # 默认是22端口，如果和windows端口冲突或你想换成其他的否则不用动
#ListenAddress 0.0.0.0 # 如果需要指定监听的IP则去除最左侧的井号，并配置对应IP，默认即监听PC所有IP
PermitRootLogin no # 如果你需要用 root 直接登录系统则此处改为 yes
PasswordAuthentication no # 将 no 改为 yes 表示使用帐号密码方式登录1234
```

主要配置以上几项即可
然后启动 ssh 服务

```bash
service ssh restart
```

如果提示 `sshd error: could not load host key` 则需要重新生成 key

```shell
dpkg-reconfigure openssh-server1
```

查看服务状态

```bash
service ssh status
# * sshd is running  显示此内容则表示启动正常12
passwd root # 设置下密码
```