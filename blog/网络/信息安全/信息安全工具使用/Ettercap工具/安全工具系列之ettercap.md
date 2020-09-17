# [安全工具系列之ettercap](https://blog.flytrap.top/2018/06/10/tech/hacker/ettercap/)

简单介绍一下，挺早就想写一下这一系列比较好用的工具了，只是太懒了。
现在抽周末，慢慢地完成这一想法吧，算是一个系列.
主要以一些功能介绍，是常用命令为主，原理层面的话，可能不会特别深。毕竟还是需要比较专业的术语来说明，就太复杂了。

回到正题，就从内网渗透神器ettercap开始吧，最近用到了这个工具。也是我众多喜爱工具中感觉比较好用的一款。

简单介绍一下ettercap这款工具，内网渗透，这款工具用好了，差不多内网你就可以横着走了。

什么叫内网？通俗一点，就是局域网，连的同一个路由器。这样说我觉得挺通俗了，如果觉得不好，欢迎随意批评订正。

## 安装

安装比较简单

```shell
apt-get install ettercap  # debian/ubuntu系列
pacman -S ettercap  # arch 系
dnf install ettercap  # centos系列
brew install ettercap  # mac
```



### 配置文件

一般在以下几个，找找看咯

- /etc/ettercap
- /usr/local/etc/ettercap

如有遗漏，欢迎补充

## 功能介绍

官方文档如是说:

```shell
Ettercap is a comprehensive suite for man in the middle attacks.
It features sniffing of live connections, content filtering on the fly and many other interesting tricks. 
It supports active and passive dissection of many protocols and includes many features for network and host analysis.
```

解释一下，就是说这是一个很牛逼的中间人攻击套件，嗅探监听修改过滤分析内网数据包等等.

## 常见用法

废话终于说完了，到正题了，来看看怎么个牛逼法、

```shell
ettercap -Tq -i en0 -M arp /// ///
```

解释一下

```shell
-T text  文本模式，对应的另外一个-G，图形界面模式(不推荐，体验不好，给你两个理由，一个是可能会卡死，第二个，没有命令行酷，哈哈),当然还有一个C，终端里的界面比图形化好不少。
-q 安静模式，不然很多没必要的信息会被输出。可以用空格切换。
-i 指定网卡接口
-M MITM attack 中间人攻击，就是干这个得，选项(arp|icmp|dhcp|port|ndp)等等，常用的就是arp咯
-P 加载插件
-F 加载过滤器自带了一些，可以自己写，这才是杀手锏
///  分割mac, ip, port  要欺骗的ip，不写就是所有的
```

### more-还是文档说的好，自行参考咯

```shell
ettercap -Tp

       Use the console interface and do not put the interface in promisc mode. You will see only your traffic.

ettercap -Tzq

       Use  the  console  interface,  do not ARP scan the net and be quiet. The packet content will not be displayed, but user and passwords, as well as other messages, will be displayed.

ettercap -T -j /tmp/victims -M arp /10.0.0.1-7/ /10.0.0.10-20/

       Will load the hosts list from /tmp/victims and perform an ARP poisoning attack against the two target. The list will be joined with the target and the resulting list  is used for ARP poisoning.

ettercap -T -M arp // //

       Perform the ARP poisoning attack against all the hosts in the LAN. BE CAREFUL !!

ettercap -T -M arp:remote /192.168.1.1/ /192.168.1.2-10/

       Perform  the  ARP  poisoning against the gateway and the host in the lan between 2 and 10. The 'remote' option is needed to be able to sniff the remote traffic the hosts make through the gateway.

ettercap -Tzq //110

       Sniff only the pop3 protocol from every hosts.

ettercap -Tzq /10.0.0.1/21,22,23

       Sniff telnet, ftp and ssh connections to 10.0.0.1.

ettercap -P list

       Prints the list of all available plugins
```

## 关于插件

看看都有哪些插件:

```shell
-> ettercap -P list
Available plugins :

         arp_cop  1.1  Report suspicious ARP activity
         autoadd  1.2  Automatically add new victims in the target range
      chk_poison  1.1  Check if the poisoning had success
       dns_spoof  1.2  Sends spoofed dns replies
      dos_attack  1.0  Run a d.o.s. attack against an IP address
           dummy  3.0  A plugin template (for developers)
       find_conn  1.0  Search connections on a switched LAN
   find_ettercap  2.0  Try to find ettercap activity
         find_ip  1.0  Search an unused IP address in the subnet
          finger  1.6  Fingerprint a remote host
   finger_submit  1.0  Submit a fingerprint to ettercap's website
  fraggle_attack  1.0  Run a fraggle attack against hosts of target one
       gre_relay  1.0  Tunnel broker for redirected GRE tunnels
     gw_discover  1.0  Try to find the LAN gateway
         isolate  1.0  Isolate an host from the lan
       link_type  1.0  Check the link type (hub/switch)
      mdns_spoof  1.0  Sends spoofed mDNS replies
      nbns_spoof  1.1  Sends spoof NBNS replies & sends SMB challenges with custom challenge
    pptp_chapms1  1.0  PPTP: Forces chapms-v1 from chapms-v2
      pptp_clear  1.0  PPTP: Tries to force cleartext tunnel
        pptp_pap  1.0  PPTP: Forces PAP authentication
      pptp_reneg  1.0  PPTP: Forces tunnel re-negotiation
      rand_flood  1.0  Flood the LAN with random MAC addresses
  remote_browser  1.2  Sends visited URLs to the browser
       reply_arp  1.0  Simple arp responder
    repoison_arp  1.0  Repoison after broadcast ARP
   scan_poisoner  1.0  Actively search other poisoners
  search_promisc  1.2  Search promisc NICs in the LAN
       smb_clear  1.0  Tries to force SMB cleartext auth
        smb_down  1.0  Tries to force SMB to not use NTLM2 key auth
    smurf_attack  1.0  Run a smurf attack against specified hosts
        sslstrip  1.1  SSLStrip plugin
     stp_mangler  1.0  Become root of a switches spanning tree
```

这是我所安装的版本所带的插件

### 说点儿常用的

- dns_spoof : dns洪水攻击，配置文件”etter.dn”，配置一下IP和域名对应关系即可，不知道dns？那自行解决吧，不再赘述；
- sslstrip : ssl 剥除攻击，降维打击，告诉服务器你需要http请求而非https；
- dos_attack：dos攻击，这个懂点儿安全应该都知道，就不科普了，自行度娘；
- find_ettercap: 检测是否有人开启ettercap，用于行为检测

这里就简单介绍介个，更多详细内容，请找男人吧

```
-> man 8 ettercap_plugins
```

## 过滤器

```shell
if (ip.proto == TCP && tcp.dst == 80) {
   if (search(DATA.data, "Accept-Encoding")) {
      replace("Accept-Encoding", "Accept-Rubbish!");
      msg("[*] Sucked Accept-Encoding!\n");
   }
}

# log all traffic except http
if (ip.proto == TCP && tcp.src != 80 && tcp.dst != 80) {
   log(DATA.data, "./logfile.log");
}
```

逻辑比较简单，就是一些简单的条件判断，然后就是数据包内容的替换

举个例子：

- 正则匹配数据包中的用户名密码，然后存储下来，对应的网站也存储下来。
- 不同协议，正则不同，替换包中数据，插入js，执行脚本。杀伤力自行脑补。

使用过滤脚本

```shell
-> etterfilter test.filter -o test.ef    ## 编译(filter文件是源文件，ef是目标文件)
-> ettercap -F test.ef  ## 引用
```

### 文档

```shell
-> man etterfilter
	The  etterfilter  utility is used to compile source filter files into binary filter
       files that can be interpreted by the JIT  interpreter  in  the  ettercap(8)  filter
       engine.  You  have to compile your filter scripts in order to use them in ettercap.
       All syntax/parse errors will be checked at compile time, so you  will  be  sure  to
       produce a correct binary filter for ettercap.
...
```

## 简单说一下攻防原理

简单说一下，现在通用局域网组织架构：
简单来说，你连接这个网络的原理：

- 需要一个网卡，网卡有一个标志，我们叫他mac 地址，不是mac电脑的mac哈。
- 但是呢，都知道我们上网是通过ip的，所以，就需要分配一个ip，ip哪儿来的？DHCP服务可以帮你。当然本质上，其实就是维护了一个”mac-ip”对应表（路由表）。
- 还有一个叫做网关的东西，当然了，也会一个ip，就特殊在它是路由器的ip，网络数据包需要通过他才能找到服务器。
- 怎么找到服务器？DNS，就是一个域名和ip对应的列表维护者。
- OK，梳理一下: 本机mac获取一个ip，通过ip连接路由ip，然后路由器把你的数据转运出去
- 问题来了，你怎么确定路由器的身份，而路由器又如何确定你的身份呢？对咯，就是靠路由表(mac-ip对应表)
- 聪明的你，应该知道我们要做什么了。

### DNS欺骗

DNS解析，原理就是ip-域名列表伪造

### ARP 欺骗

说白了，就是伪造arp路由表.

每个可以访问的ip都必须匹配一个mac地址，更多的时候呢，匹配到路由器就找到目标了。
具体还是参考一下内网图谱图和通信原理图吧。

内网ip确认都是靠的广播来传播数据的，不然确认目标受到没有，就只能不停的广播，当然会有很多隐患。所以就给了攻击者机会。

```shell
arp -a  # 查看一下本机缓存的arp表
```



真有兴趣甚至可以去读一下《TCP/IP详解》

## 题外话

说了半天都没有说，这东西牛逼哪儿了。
你可以修改局域网的任意包，监听任意包。

### 高级用法

- metsploit: 配合使用，提取主机最高权限，各种exp
- beef: 浏览器里的王者
- …

## 更多参考

```shell
SEE ALSO
       etter.conf(5) ettercap_curses(8) ettercap_plugins(8) etterlog(8) etterfilter(8) ettercap-pkexec(8)
```

解释一下, 需要点儿Linux基础知识

```shell
man 5 etter.conf
man 8 ettercap_curses
man 8 ettercap_plugins
man 8 etterlog
...
```

