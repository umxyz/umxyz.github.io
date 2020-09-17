# Java局部变量初始化

> 我们经常被告知：在`Java`语言规定，局部变量必须要先初始化，然后才能使用。为什么呢？
>
> 首先 `Java` 语言就是这么规定的。其实无论成员变量还是局部变量都要初始化。只是`JVM`帮我们初始化了成员变量。

## 第一种解释：

当我们新建一个对象时，Java会在堆中申请一块内存区域用以存放对象，这个对象包含了成员变量。`JVM`在初始化该对象时即可初始化成员变量。（还有一种解释：`java`对象在分配内存时会统一将这块内存清零，这样包括全局变量在内的数据被自动初始化为`0`或`null`）。
而对于方法中的局部变量，是在线程栈中，是线程私有的，如果每个线程栈都初始化局部变量会影响`JVM`性能，而且对于有些局部变量，在方法的一开始是没有的，在循环中的局部变量是要反复的声明多次的，如果`JVM`对这些局部变量进行初始化，也会带来性能问题。例如下面代码中的`int n`这个局部变量，若每次都对其进行初始化，会影响`JVM`性能。

![img](https://img-blog.csdnimg.cn/20181031092241801.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI3MTI3MTQ1,size_16,color_FFFFFF,t_70)

## 第二种解释：

>  Bruce Eckel在《Thinking in Java》中的话：
>
> 编译器当然可以为局部变量附一个默认值，但是未初始化的局部变量更有可能是程序员的疏忽，所以采用默认值范围会掩盖这种失误。因此强制程序员提供一个初始值，往往能够帮助找出程序里的缺陷。

## 第三种解释：

### 1. 主内存和工作内存

`Java`内存模型规定了所有的变量都存储在主内存中，每条线程都有自己的工作内存。线程的工作内存中保存了被该线程使用到的变量的主内存拷贝，线程对变量的所有操作（读取、赋值等）都必须在工作内存中进行，而不能直接读写主内存中的变量。

### 2. 内存间交互操作

实际上就是两个方向：一个变量如何从主内存拷贝到工作内存；又如何从工作内存拷贝到主内存。

在Java内存模型中定义了8种操作来完成：

- `lock`：作用于主内存的变量，把一个变量标识为一条线程独占的状态
- `unlock`：作用于主内存的变量，把一个处于锁定状态的变量释放出来，释放后的变量才可以被其他线程锁定。
- `read`：作用于主内存的变量，把一个变量的值从主内存传输到线程的工作内存中，以便随后的load操作使用
- `load`：作用于工作内存的变量，把read操作从主内存中得到的变量值放入到工作内存的变量副本中
- `use`：作用于工作内存的变量，把工作内存中的一个变量的值传递给执行引擎
- `assign`：作用于工作内存的变量，把一个从执行引擎接收到的值赋给工作内存的变量（即遇到给变量赋值的字节码指令）
- `store`：作用于工作内存的变量，把工作内存中一个变量的值传送到主内存，以便以后的`write`操作使用
- `write`：作用于主内存的变量，把`store`操作从工作内存中得到的变量放入到主内存的变量中



### 3.  执行以上8种操作的规则

​    规则有很多，我们这里只贴出两条：

​    a. 一个新的变量只能在主内存中诞生，不允许在工作内存中直接使用一个未被初始化的变量，即对一个变量实施`use`、`store`操作之前，必须先执行过了`load`和`assign`初始化操作。

​    b. 不允许一个线程丢弃它最近的`assign`操作，即变量在工作内存中改变了之后必须把该变化同步到主内存。

![img](https://img-blog.csdnimg.cn/20181026152050509.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI3MTI3MTQ1,size_27,color_FFFFFF,t_70)

当我们通过`int[] k;`语句来定义一个变量`k`时，`k`只是存在于工作内存中。根据规则a中提到的，新变量必须诞生于主内存。在我们要使用这个k变量时，比如这里的输出操作，必须要执行`assign`操作，即赋值初始化。

![img](https://img-blog.csdnimg.cn/20181026152134580.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI3MTI3MTQ1,size_27,color_FFFFFF,t_70)

**注意：若是只定义不使用，不会报错**

**![img](https://img-blog.csdnimg.cn/20181026152205154.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI3MTI3MTQ1,size_27,color_FFFFFF,t_70)**