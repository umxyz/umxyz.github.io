# [图片捕获工具driftnet](https://www.cnblogs.com/lingerhk/p/4065956.html)

driftnet是一款简单而使用的图片捕获工具，可以很方便的在网络数据包中抓取图片。该工具可以实时和离线捕获指定数据包中是图片，当然在kali里是有的。

在我之前的一篇博文《[kali下搭建WiFi钓鱼热点](http://www.cnblogs.com/lingerhk/p/3755583.html)》中用到了一下，现在做一个简单的小结，算是备忘靶。

 

**语法**： driftnet  [options]  [filter code]

**主要参数：**

```shell
-b   捕获到新的图片时发出嘟嘟声

-i interface   选择监听接口

-f file  读取一个指定pcap数据包中的图片

-p 不让所监听的接口使用混杂模式

-a 后台模式：将捕获的图片保存到目录中（不会显示在屏幕上）

-m number 指定保存图片数的数目

-d directory 指定保存图片的路径

-x prefix 指定保存图片的前缀名
```

**使用举例：**

1.实时监听： driftnet -i wlan0

2.读取一个指定pcap数据包中的图片： driftnet -f /home/linger/backup/ap.pcapng -a -d /root/drifnet/