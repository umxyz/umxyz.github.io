# bat判断系统服务是否运行

以"Automatic Updates"这个服务为例，你可以自己改成你需要的服务，批处理代码如下：

```bat
@echo off
net start|findstr /i /c:"Automatic Updates">nul&&set k=1||set k=0
if %k%==0 (net start "Automatic Updates") else (
net stop "Automatic Updates"
net start "Automatic Updates")
pause
```

