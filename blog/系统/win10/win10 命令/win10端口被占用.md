# win10端口被占用

```shell
列出所有端口的情况，找到被占用的端口
netstat -ano

找对应的PID
netstat -aon|findstr "8080"

taskkill /f /t /im 进程名
```

