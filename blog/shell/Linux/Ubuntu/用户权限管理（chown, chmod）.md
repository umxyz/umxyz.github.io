# Ubuntu用户权限管理（chown, chmod）

#### 改变文件所有权`chown`

例如

```bash
sudo chown username myfile1
```

`myfile`文件的所有权变为`username`。

```bash
chown -R username /files/work1
```

加入参数`-R`，`work`文件夹*以及文件夹里的所有文件和子目录*所有权都变为`username`。

#### 改变文件权限`chmod`

例如

```bash
sudo chmod 777 filename1
```

或

```bash
sudo chmod -R 754 director1
```

> - **4** 可读,
> - **2** 可写,
> - **1** 可执行
> - **0** 无权限

三个数字的顺序分配代表用户、用户组、其他。第一个数字`7`表示用户的权限是读+写+执行（4+2+1=7），第二个数字`5`表示用户组的权限是读+可执行（4+0+1=5），第三个数字`4`表示其他人的权限是读（4+0+0=4）。

