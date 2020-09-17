# ubuntu wifi 容易断开 不稳定

```shell
/etc/NetworkManager/conf.d/default-wifi-powersave-on.conf
```

找到下面的
[connection]
wifi.powersave = 3
把3换成2并**重新启动**。然后运行iwconfig，应该看到Power Management:off

