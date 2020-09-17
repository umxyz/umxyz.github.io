# Notepad++批量去掉或替换文本中的换行符

特别注意：换行可能是\"\n"（此居多）或者"\r"或者\"\r\n"

![image-20200720185026573](../../../#ImageAssets/image-20200720185026573.png)

额外技能：匹配包含某字符串

一、包含“hello word”的行

`^.*hello word.*`

二、以“hello word”开始的行

`^hello word.*$`

三、以“hello word”结尾的行

`.*hello word$`