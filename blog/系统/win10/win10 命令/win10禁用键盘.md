# win10禁用键盘

```powershell
sc config i8042prt start=disabled
sc config i8042prt start=demand
对应的注册表位置：
[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\i8042prt]

"Start"=dword:00000003 // 对应start= demand，服务类型：手动

"Start"=dword:00000004 // 对应start= disabled，服务类型：禁用
```

