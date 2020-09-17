# [MySQL修改某个字段（替换关键字内容）](https://blog.csdn.net/gongqinglin/article/details/82218244?utm_medium=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.nonecase&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.nonecase)

```mysql
mysql修改某个字段（替换关键字内容），UPDATE 表名 SET 字段名= REPLACE( 替换前的字段值, '替换前关键字', '替换后关键字' ) WHERE 条件。

update user SET email= REPLACE( email, 'HUNAU_ACM.org', 'hunau.acm' ) where email like '%HUNAU_ACM.org%';
```

