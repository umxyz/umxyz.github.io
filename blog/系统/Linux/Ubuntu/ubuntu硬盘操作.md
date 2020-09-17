# ubuntu硬盘操作

## 1 查看设备列表和信息，防止误操作

`df -h`

## 2 设置需要挂载到的位置
`sudo mkdir /home/disk1`

## 3 获取要自动挂载的分区的UUID和分区类型TYPE

`sudo blkid`

## 4 挂载

```
/dev/sda1: UUID="16a223b6-bfc3-4e44-a092-d44eeda017b8" TYPE="ext4" PARTUUID="714176cb-01"
/dev/sdb1: LABEL="fold1" UUID="bb80912d-d816-4975-9a42-ace2d6bcdfa0" TYPE="ext4" PARTUUID="b8876a64-01"
/dev/sdc1: LABEL="Data" UUID="BAD65432D653ECDF" TYPE="ntfs" PARTUUID="bd5c47a6-01"
```

## nfs挂载错误wrong fs type, bad option, bad superblock

```shell
apt-get install nfs-common
fdisk -l
fsck /dev/sda1
```

## 格式化硬盘

```bash
umount /dev/sdd1
sudo mkfs.xfs -f /dev/sdd1
df -Th /storage
```

