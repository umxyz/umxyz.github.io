# MySQL 创建和删除用户

## 1.远程登录mysql

`mysql -h ip -u root -p`

## 2.创建用户

 格式：grant 权限 on 数据库.* to 用户名@登录主机 identified by "密码"；

  例1：增加一个test1用户，密码为123456，可以在任何主机上登录，并对所有数据库有查询，增加，修改和删除的功能。需要在mysql的root用户下进行

```shell
mysql>grant select,insert,update,delete on *.* to test1@"%" identified by "123456"；
mysql>flush privileges;
```

   例2：增加一个test2用户，密码为123456，只能在192.168.2.12上登录，并对数据库student有查询，增加，修改和删除的功能。需要在mysql的root用户下进行

```shell
mysql>grant select,insert,update,delete on student.* to test2@192.168.2.12 identified by "123456";
mysql>flush privileges;
```

   例3：授权用户test3拥有数据库student的所有权限

```shell
mysql>grant all privileges on student.* to [test3@localhost](mailto:test3@localhost) identified by '123456';
mysql>flush privileges;
```

## 3.修改用户密码

```shell
mysql>update mysql.user set password=password('123456') where User='test1' and Host='localhost';
mysql>flush privileges;
```

## 4.删除用户

```shell
mysql>delete from user where user='test2' and host='localhost';
mysql>flush privileges;
```

## 5.删除数据库和删除表

```shell
mysql>drop database 数据库名;
mysql>drop table 表名；
```

## 6.删除账户及权限

```shell
drop user 用户名@'%'
drop user 用户名@localhost
```

