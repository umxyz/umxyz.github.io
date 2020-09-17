# 如何在Ubuntu 18.04上使用mdadm创建RAID阵列

**介绍**

该`mdadm`实用程序可用于使用Linux的软件RAID功能创建和管理存储阵列。管理员可以非常灵活地协调各自的存储设备，并创建具有更高性能或冗余特性的逻辑存储设备。

在本指南中，我们将介绍可以使用Ubuntu 18.04服务器设置的多种不同RAID配置。

## **准备**

要完成本指南中的步骤，您应该：

- **sudo具有Ubuntu 16.04服务器权限的非root用户**：你需要一台已经设置好可以使用`sudo`命令的非root账号的Ubuntu**服务器**，并且已开启防火墙。没有服务器的同学可以在[这里购买](https://cloud.tencent.com/product/cvm?from=10680)，不过我个人更推荐您使用**免费**的腾讯云[开发者实验室](https://cloud.tencent.com/developer/labs?from=10680)进行试验，学会安装后再[购买服务器](https://cloud.tencent.com/product/cvm?from=10680)。
- **对RAID术语和概念的基本了解**：虽然本指南将逐步介绍一些RAID术语，但更完整的理解非常有用。要了解有关RAID的更多信息并更好地了解适合您的RAID级别。
- **您的服务器上有多个原始存储设备**：我们将演示如何在服务器上配置各种类型的阵列。根据阵列类型，您至少需要**两到四个存储设备**。在遵循本指南之前，不需要格式化这些驱动器。您也可以使用[腾讯云容器服务](https://console.cloud.tencent.com/ccs)，他提供了比较完整的[日志](https://console.cloud.tencent.com/ccs/log?rid=1&clusterId=)分析系统。腾讯云[容器服务](https://cloud.tencent.com/product/tke?from=10680)基于原生 kubernetes 提供以容器为核心的、高度可扩展的高性能容器管理服务。腾讯云容器服务完全兼容原生 kubernetes API ，扩展了腾讯云的 [CBS](https://cloud.tencent.com/product/cbs?from=10680)、CLB 等 kubernetes 插件，为容器化的应用提供高效部署、资源调度、服务发现和动态伸缩等一系列完整功能，解决用户开发、测试及运维过程的环境一致性问题，提高了大规模容器集群管理的便捷性，帮助用户降低成本，提高效率。容器服务提供免费使用，涉及的其他云产品另外单独计费。

## **重置现有RAID设备**

在本指南中，我们将介绍创建许多不同RAID级别的步骤。如果您希望继续操作，则可能需要在每个部分后重复使用存储设备。可以参考本节以了解如何在测试新RAID级别之前快速重置组件存储设备。如果尚未设置任何数组，请暂时跳过此部分。

**警告：**此过程将完全销毁数组以及写入其中的任何数据。确保您正在使用正确的阵列，并且在销毁阵列之前复制了需要保留的所有数据。

键入以下内容在`/proc/mdstat`文件中查找活动数组：

```javascript
cat /proc/mdstat
Personalities : [raid0] [linear] [multipath] [raid1] [raid6] [raid5] [raid4] [raid10] 
md0 : active raid0 sdc[1] sdd[0]
      209584128 blocks super 1.2 512k chunks

            unused devices: <none>
```

从文件系统中卸载数组：

```javascript
sudo umount /dev/md0
```

然后，键入以下命令停止并删除数组：

```javascript
sudo mdadm --stop /dev/md0
```

使用以下命令查找用于构建阵列的设备：

**警告：**请记住，重新启动时`/dev/sd*`的名称可能会发生变化！每次检查它们以确保您使用正确的设备。

```javascript
lsblk -o NAME,SIZE,FSTYPE,TYPE,MOUNTPOINT
NAME     SIZE FSTYPE            TYPE MOUNTPOINT
sda      100G                   disk 
sdb      100G                   disk 
sdc      100G linux_raid_member disk 
sdd      100G linux_raid_member disk 
vda       25G                   disk 
├─vda1  24.9G ext4              part /
├─vda14    4M                   part 
└─vda15  106M vfat              part /boot/efi
```

在发现用于创建阵列的设备后，将其超级块清零以删除RAID元数据并将其重置为正常：

```javascript
sudo mdadm --zero-superblock /dev/sdc
sudo mdadm --zero-superblock /dev/sdd
```

您应该删除对该数组的任何持久引用。编辑`/etc/fstab`文件并注释掉或删除对数组的引用：

```javascript
sudo nano /etc/fstab
. . .
# /dev/md0 /mnt/md0 ext4 defaults,nofail,discard 0 0
```

另外，注释掉或从`/etc/mdadm/mdadm.conf`文件中删除数组定义：

```javascript
sudo nano /etc/mdadm/mdadm.conf
. . .
# ARRAY /dev/md0 metadata=1.2 name=mdadmwrite:0 UUID=7261fb9c:976d0d97:30bc63ce:85e76e91
```

最后，`initramfs`再次更新，以便早期启动过程不会尝试将不可用的阵列联机。

```javascript
sudo update-initramfs -u
```

此时，您应该准备单独重用存储设备，或者作为不同阵列的组件。

## **创建RAID 0阵列**

RAID 0阵列的工作原理是将数据分解为块并在可用磁盘上对其进行条带化。这意味着每个磁盘包含一部分数据，并且在检索信息时将引用多个磁盘。

- 要求：至少**2个存储设备**
- 主要好处：表现
- 要记住的事项：确保您有功能备份。单个设备故障将破坏阵列中的所有数据。

### **识别组件设备**

要开始使用，请找到您将使用的原始磁盘的标识符：

```javascript
lsblk -o NAME,SIZE,FSTYPE,TYPE,MOUNTPOINT
NAME     SIZE FSTYPE TYPE MOUNTPOINT
sda      100G        disk
sdb      100G        disk
vda       25G        disk 
├─vda1  24.9G ext4   part /
├─vda14    4M        part 
└─vda15  106M vfat   part /boot/efi
```

如上所示，我们有两个没有文件系统的磁盘，每个磁盘大小为100G。在此示例中，已为这些设备提供了此会话的标识符`/dev/sda`和`/dev/sdb`标识符。这些将是我们用于构建阵列的原始组件。

### **创建数组**

要使用这些组件创建RAID 0阵列，请将它们传递给`mdadm --create`命令。您必须指定要创建的设备名称（在我们的示例中是`/dev/md0`），RAID级别和设备数量：

```javascript
sudo mdadm --create --verbose /dev/md0 --level=0 --raid-devices=2 /dev/sda /dev/sdb
```

您可以通过检查`/proc/mdstat`文件来确保成功创建RAID ：

```javascript
cat /proc/mdstat
Personalities : [linear] [multipath] [raid0] [raid1] [raid6] [raid5] [raid4] [raid10] 
md0 : active raid0 sdb[1] sda[0]
      209584128 blocks super 1.2 512k chunks

            unused devices: <none>
```

正如您在突出显示的行中所看到的，已使用`/dev/sda`和`/dev/sdb`设备在在RAID 0配置中创建了`/dev/md0`设备。

### **创建和挂载文件系统**

接下来，在数组上创建一个文件系统：

```javascript
sudo mkfs.ext4 -F /dev/md0
```

创建挂载点以附加新文件系统：

```javascript
sudo mkdir -p /mnt/md0
```

您可以键入以下命令来挂载文件系统：

```javascript
sudo mount /dev/md0 /mnt/md0
```

键入以下命令检查新空间是否可用：

```javascript
df -h -x devtmpfs -x tmpfs
Filesystem      Size  Used Avail Use% Mounted on
/dev/vda1        25G  1.4G   23G   6% /
/dev/vda15      105M  3.4M  102M   4% /boot/efi
/dev/md0        196G   61M  186G   1% /mnt/md0
```

新文件系统已安装并可访问。

### **保存数组布局**

为了确保在引导时自动重新组装阵列，我们将不得不调整`/etc/mdadm/mdadm.conf`文件。您可以通过键入以下内容自动扫描活动数组并附加文件：

```javascript
sudo mdadm --detail --scan | sudo tee -a /etc/mdadm/mdadm.conf
```

之后，您可以更新initramfs或初始RAM文件系统，以便在早期启动过程中阵列可用：

```javascript
sudo update-initramfs -u
```

将新的文件系统挂载选项添加到`/etc/fstab`文件中以便在引导时自动挂载：

```javascript
echo '/dev/md0 /mnt/md0 ext4 defaults,nofail,discard 0 0' | sudo tee -a /etc/fstab
```

现在，您的RAID 0阵列应自动组装并在每次启动时安装。