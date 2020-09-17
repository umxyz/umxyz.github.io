# win10去掉Chrome恢复页面 Chrome未正确关闭

## Linux上的Chrome未正确关闭

1、将`sudo chmod 444 /home/username/.config/chromium/Default/Preferences`文件权限设置读权限。

2、使用`sudo chattr +i /home/username/.config/chromium/Default/Preferences`忽略所有对该文件设置成只读。

3、在每次启动前`rm /home/username/.config/chromium/Default/Preferences`文件删除。

这样在异常关闭之后，异常关闭状态不会写入到Preferences文件中，下次启动浏览器也会正常启动。

## Windows上的Chrome未正确关闭

> `C:\Users\用户名\AppData\Local\Google\Chrome\User Data\Default\Preferences` 删除即可

1、打开`C:\Users\用户名\AppData\Local\Google\Chrome\User Data\Default\Preferences` 文件，将"exit_type":“crash” 改为"Normal"。

2、将`C:\Users\用户名\AppData\Local\Google\Chrome\User Data\Default\Preferences` 改为“只读”

