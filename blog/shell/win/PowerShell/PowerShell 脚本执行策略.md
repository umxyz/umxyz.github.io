# PowerShell 脚本执行策略

```powershell
Set-ExecutionPolicy Unrestricted
```

Powershell 默认是不允许执行 PS1 脚本的，这就需要我们自己使用`Set-ExecutionPolicy`来修改默认策略。

使用`Get-ExecutionPolicy`可以获取当前的策略:

```powershell
PS C:\Users\lightless> Get-ExecutionPolicy
Unrestricted
```

如果想看更详细的，针对每个 scope 设置的策略，可以使用如下命令：

```powershell
PS C:\Users\lightless> Get-ExecutionPolicy -List | Format-Table -AutoSize
 
        Scope ExecutionPolicy
        ----- ---------------
MachinePolicy       Undefined
   UserPolicy       Undefined
      Process       Undefined
  CurrentUser    Unrestricted
 LocalMachine       Undefined
```

一共有 6 种策略，分别是：Undefined, Bypass, Unrestricted, Remotesigned, Allsigned, Restricted.
默认情况下是 Restricted 策略，更详细的可以参考：https://technet.microsoft.com/library/hh847748.aspx

这里简单的说下六种策略的区别：

- Restricted.
  不读取任何配置文件、不运行任何脚本，这个是默认策略。
- AllSigned.
  所有的脚本和配置文件必须有受信任的的发布者的签名，就算是自己写的脚本也同样如此，否则无法执行。
- RemoteSigned.
  和上面的类似，但是针对的是从网上下载下来的脚本，这些脚本同样也需要可信的签名。
- Unrestricted.
  可以运行脚本或者读取配置文件，如果执行的是从网上下载的脚本，那么会有一个申请权限的提示。
- Bypass.
  不阻止任何脚本或配置文件，也不会显示警告或者提示。
- Undefined.
  把当前 scope 的所有策略全部都删除，但是不会删除 Group Policy scope 中的策略。如果你想删除某个设置好的策略，用这个就行了。

上面说到了 scope，这个可以理解为作用域，针对不同的作用域设置不同的策略。
主要有三种 scope：

- process
  设置的策略只影响当前的 powershell 进程。
- CurrentUser:
  设置的策略只影响当前用户。
- LocalMachine:
  设置的策略影响这台计算机上的所有用户。

那么设置方法就是使用`Set-ExecutionPolicy`命令，具体格式如下：

```powershell
Set-ExecutionPolicy [-ExecutionPolicy] <ExecutionPolicy> [[-Scope] <ExecutionPolicyScope> ] [-Force] [-Confirm] [-WhatIf] [ <CommonParameters>]
```

- -Force 的作用是禁止所有的提示输出，当你更改执行策略的时候，默认情况下是会显示警告的，这个选项可以让他不显示警告。
- -Confirm 会在你执行这个 cmdlet 之前再确认一次，以免打错命令。
- -WhatIf 会显示执行完这条 cmdlet 之后会发生什么事情，但是并不执行当前的 cmdlet。

这个策略其实也是可以绕过的，详细的可以参考这篇文章：
https://blog.netspi.com/15-ways-to-bypass-the-powershell-execution-policy/