# bat检测程序是否运行

在批处理程序中检查指定进程是否在运行，然后根据其运行状态分别执行不同的命令：

语法：

```bat
tasklist | find /i "程序" && 程序在运行执行命令1 || 不在运行执行命令2
例子：tasklist | find /i "calc.exe" && taskkill /im calc.exe || echo 没有运行
```

