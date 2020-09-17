# win10删除电脑中FTP保存的密码和历史记录

windows登录FTP的用户名密码保存在注册表里

具体位置``HKEY_CURRENT_USER\Software\Microsoft\FTP\Accounts`

在Accounts里面子项，名称就是你的FTP地址，

一、清除登录框里的用户名记录的方法：
    1 、开始-> 运行-> regedit；
    2 、找到`HKEY_CURRENT_USERSoftwareMicrosoftFTPAccounts`项
    3 、将其下面的子项（一般以FTP的地址或IP命名）删除即可。

登录FTP是记住密码，用这个方法也可以完全将用户信息清除。

二、删除地址栏中的FTP记录:

在注册表里面：`HKEY_CURRENT_UESR\SOFTWEAR\MICROSOFT\INTERNET EXPLORER\TYPEDURLS,`

删除右侧框内的记录项即可。