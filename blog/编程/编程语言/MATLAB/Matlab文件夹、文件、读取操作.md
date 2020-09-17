# [Matlab文件夹、文件、读取操作（汇总）](https://www.jianshu.com/p/a56de74054e2)

# 一、 matlab对路径的操作

1. ### filesep
   
    用于返回当前平台的目录分隔符，Windows是反斜杠()，Linux是斜杠(/)。
2. ### fullfile
   
    用于将若干字符串连接成一个完整的路径。例如：

```bash
f=fullfile('D:','Matlab','example.txt') 
f=D:\Matlab\example.txt 
```

在Windows中，“D:\”表示D盘，“D:”表示目录

1. ### fileparts
   
    用于将一个完整的文件名分割成4部分：路径，文件名，扩展名。例如：

```ruby
>> f=fullfile('D:','Matlab','example.txt');
>> [pathstr,name,ext]=fileparts(f)   
    pathstr=D:\Matlab 
    name=example 
    ext=.txt      
```

1. ### pathsep
   
    返回当前平台的路径分隔符。Windows是分号(;)，Linux是冒号(:)。
2. ### exist
   
    可以用于判断目录或者文件是否存在，同时不同的返回值有不同的含义。例如：

```ruby
>> f=fullfile('D:','Matlab','example.txt'); >>exist(f)
ans=2
>>exist('D:\Matlab') ans =7
```

1. ### which
   
    可以通过一个函数或脚本名称得到它的完整路径,同时还能处理函数重载的情况，例如：

```ruby
>> which abs(0) 
C:\MATLAB7\toolbox\matlab\elfun\@double\abs.bi  % double method 
>> which abs(single(0)) 
C:\MATLAB7\toolbox\matlab\elfun\@single\abs.bi  % single method 
```

1. ### isdir
   
    判断一个路径是否代表了一个目录，例如：

```ruby
>> p='D:\Matlab';
>> f=fullfile(p,'example.txt'); 
>> isp=isdir(p) 
isp=1
>> isf=isdir(f)
isf=0
```

1. ### dir
   
    用于列出一个目录的内容，返回值为结构体数组类型，包含如下部分：name:文件或目录的名称；date:修改日期；bytes:文件大小；isdir:是否是目录。例如：

```ruby
>> p='D:\Matlab'; 
>>files=dir(p) 
files = 
8x1 struct array with fields: 
    name
    date 
    bytes
    isdir
    datenum
```

还可以查找特定后缀的文件：
 如：`dir（['fk\'，'*.jpg']）`表示查找 fk文件夹下后缀为 ' .jpg' 的文件
 若 fk 目录下存在后缀为'.jpg' 的文件，则返回文件名：
 `1260500466587.jpg 1260500472025.jpg 8673601d.jpg`
 否则返回：`fk.\*.jpg not found.`

- mkdir（' fj '）：用于创建文件夹
   如：mkdir（' fj '）, 表示在当前路径创建名为 fj 的文件夹
   mkdir（' fj\fi '）则表示在当前路径下的 fj 文件夹里创建 fi 子文件夹
- rmdir（' fl '）：用于删除文件夹
   如：rmdir（'fl'）,表示删除当前路径下名为 fl 的文件夹
- cd
   用于切换当前工作目录。例如：

```ruby
>>cd('c:/toolbox/matlab/demos') %切换当前工作目录到demos 
>>cd .. %返回上一级目录 
```

- pwd
   用于当前工作目录的路径。例如：
   `>> pwd ans =C:\MATLAB7\work`
- path
   用于对搜索路径的操作。例如：

```ruby
>>path %查询当前所有的搜索路径（MATLABPATH） 
>>p=path  %把当前的搜索路径存在字符串变量p中 
>>path(‘newpath’)  %将当前搜索路径设置为newpath 
>>path(path,’newpath’) %向路径添加一个新目录newpath 
>>path(’newpath’, path) %向当前搜索路径预加一个新目录nespath
```

- addpath和rmpath
   用于对matlab搜索路径的添加和删除。例如：

```ruby
>>addpath(‘directory’) %将完整路径directory加入到当前搜索路径的最顶端 
>>rmpath
```

- what
   用于显示出某目录下存在哪些matlab文件；若输入完整路径，可列出指定目录下的文件。例如：

```ruby
>>what
>>what dirname 
>>what(‘dirname’)
```

其中dirname是要查找的路径的名字，路径在matlab的搜索路径内时，没有必要输入全名，只输入最后或最后两级就够了。

- path2rc
   保存当前matlab的搜索路径到pathdef.m文件中。

# 二、对文件夹内文件操作

# 三、对文件的操作

## 1 文件的打开和关闭

### 1.1 文件的打开

`fopen ('filename', 'mode')`
 mode格式有：

```shell
 ‘r’：只读方式打开文件（默认的方式），该文件必须已存在。
 ‘r+’：读写方式打开文件，打开后先读后写。该文件必须已存在。
 ‘w’：打开后写入数据。该文件已存在则更新；不存在则创建。
 ‘w+’：读写方式打开文件。先读后写。该文件已存在则更新；不存在则创建。
 ‘a’：在打开的文件末端添加数据。文件不存在则创建。
 ‘a+’：打开文件后，先读入数据再添加数据。文件不存在则创建。  如果rt表示该文件以文本方式打开，如果添加的是“b”，则以二进制格式打开，这也是fopen函数默认的打开方式。
```

Fopen函数两个返回值:

- 一个是返回一个文件标识(file Identifier)，它会作为参数被传入其他对文件进 行读写操作的命令，通常是一个非负的整数，可用此标识来对此文件进行各种处理。

> 如果返回的文件标识是–1，则代表fopen无法打开文件，其原因可能是文件不存在，或是用户无法打开此文件权限

- 另一个返回值就是message，用于返回无法打开文件的原因；

### 1.2 文件的关闭

fclose(f)
 f为打开文件的标志，若fclose函数返回值为0，则表示成功关闭f标志的文件；若返回值为–1，则表示无法成功关闭该文件。

> 打开和关闭文件比较耗时，最好不要在循环体内使用文件

若要一次关闭打开的所有文件，可以使用下面的命令：fclose all

### 1.3 从文本文件中读取数据

MATLAB自带的MAT文件为二进制文件，但为了便于和外部程序进行交换以及方便查看文件中的数据，也常常采用文本数据格式（数据采用ASCII码格式，可以表示字母和数字字符）与外界进行数据交换。

1. 使用导入模板来读取数据
2. 使用函数来读取文本数据

函    数 | csvread| dlmread| fscanf| load| textread|
 -|-|-
 数 据 类 型| 数值数据| 数值数据| 字母和数值| 数值数据| 字母和数值|
 分  隔  符|  仅cooma| 任何字符| 任何字符| 仅space| 任何字符|
 返  回  值| 1| 1| 1| 1| 多返回值

如：`A=load('my_data.txt');`

1. 读取有分隔符的ASCII数据文件  如果数据文件不使用空格符而是使用逗号或是其他符号作为分隔符，用户可以选择多个可用的导入数据函数。最简单的便是使用函数`dlmread`。

```bash
lcode.dat  
0.3445,0.8433,0.7865 
0.7562,0.4233,0  
A=dlmread('lcode.dat',',')  
```

> 分隔符只能选取单个字符，不能用字符串来作为分隔符

1. 使用文本头读取数值数据
    要读取一个包含文本头的ASCII码数据文件，可以使用`textread`函数，并指定头行参数。Textread既能处理有固定格式的文件，也可以处理无格式的文件，还可以对文件中每行数据按列逐个读取。
    textread函数常见的调用方法有如下几种：

```csharp
[A,B,C...]=textread('filename', 'format') 
[A,B,C...]=textread('filename', 'format',N)
```

1. 读取字母数值混合的数据
    例:
    文件my_exam.dat包含的混合的字母和数值如下：

```css
Joe    gradeA  4.9  pass 
susan  gradeD  2.0  fail  
```

如果想把4列数据全部读取出放在4个变量中，则使用如下命令：
 `>> [name gra grades answer]=textread('my_exam.dat','%s %s %f %s')`

> textread 函数按格式字符串中指定的格式处理文件中的某个数据项，并把值放在输出变量中。输出变量的数目必须和格式字符串中指定的变换数目项匹配，在该例中，函数按格式字符串来读取文件。

## 2. 文件的存储

#### 2.1 文件存写函数

函    数|  csvwrite| diary| dlmwrite| fprintf| save
 -|-|-
 数 据 类 型|  数值数据| 数值数据或单元阵列| 数值数据|  字母和数值数据|  数值数据
 分  隔  符| 逗号| 空格|  任何字符| 任何字符| 制表符或空格符

存写有分隔符的ASCII码数据文件  若要将当前的MATLAB工作空间的一个或多个变量写到一个有分隔符的ASCII码文件中，可以使用save命令或dlmwrite函数。在默认情况下，save命令是以 MAT 格式存写数据的。

#### * fprintf函数功能

```cpp
fprintf(fileID, format, A)   
count = fprintf(...)   %fprintf写入返回数字的字节。
```

- Format:使用单引号的字符串，它描述了输出字段的格式。可以包括下列组合：百分号后 跟一个转换字符，如'％s的为字符串'。

![img](../../../#ImageAssets/5816703-ac882587ef3d1f4f.webp)

![img](../../../#ImageAssets/5816703-eb2689db5aef2101.webp)

| 转义字符 | 作用                    |
| -------- | ----------------------- |
| ''       | 单引号                  |
| ％％     | 百分比字符              |
| \\       | 反斜杠                  |
| \a       | 报警book.iLoveMatlab.cn |
| \b       | 退格                    |
| \f       | 换页                    |
| \n       | 新行                    |
| \ṛ       | 回车                    |
| \t       | 水平制表符              |
| \ v      | 垂直制表                |
| \xN      | 十六进制数N             |
| \N       | 八进制数N               |

作用 | 标志 | 例子
 -|-
 左对齐 |  ' - ' |  %-5.2f
 打印符号字符(+或 - ) |  '+' |  %+5.2f
 插入空格| ' '  | % 5.2f
 垫零 |  '0'  |  %05.2f
```shell
 对%o, %x,  %X, 打印 0，0x，0X的前缀。
 对%f, %e, %E, 打印小数点，即使是0。
 对％g, ％G，不删除或尾部的零或小数点。 | '#' |  %#5.0f
```



#### 2.2 使用文件I/O函数

##### 2.2.1格式化写入文本数据

例:  创建一个2×2的魔方矩阵，然后打开一文件，写入数据。

```ruby
>> clear all; 
>> x=magic(2);  
>> fid=fopen('exam4.txt','w');  
>> fprintf(fid,'%4.2f  %8.4f\n',x); 
>> fclose(fid);
>> x  
  x =        1     3      4     2   
>> type exam4.txt   
  1.00    4.0000 
  3.00    2.0000
```

> fprintf函数存储的时候按行读取，然后按列存写

##### 2.2.2 控制文件位置指针

fseek                    frewind
 设定指针位置重设指针到文件起始位置
 ftell                    feof
 获得指针位置测试指针是否在文件结束位置

1. fseek函数用法
    fseek 函数用于指定文件指针的位置，调用方式如下： `status=fseek(fid,offset,origin)`  fid是指定的文件标识符。offset为整数型变量，表示相对于指定位置需要的偏移字节数，正数表示向文件末尾偏移，负数表示向文件开头偏移。Origin可以是特定字符串，也可以是整数，表示文件中的参考位置。

> 参考位置说明：
>  `'bof'`或者 -1文件开头
>  `'cof '`或者 0文件中当前位置
>  `'eof '`或者 1文件末尾

1. ftell函数用法
    ftell 函数用来获得当前文件指针的位置，调用方式如下： `position=ftell(fid)`  fid是指定的文件标识符。Position为返回值，表示当前指针的位置。position是以相对于文件开头的字节数来表示的。如果返回值为–1，表示未能成功调用。这是可以通过调用feeeor(fid)的具体的错误信息。
2. frewind函数用法
    frewind 函数用来把文件指针重新复位到文件开头。调用方式如下： `frewind(fid)` 其中fid为指定的文件标识符，其作用和fseek(fid,0,-1)是等效的。
3. feof函数用法
    feof 函数用来判断是否到达文件末尾。调用方式如下： `eofstat=feof(fid)` 其中fid为指定的文件标识符。eofstat是返回值，当到达文件末尾时，eofstat为1；否则为0。