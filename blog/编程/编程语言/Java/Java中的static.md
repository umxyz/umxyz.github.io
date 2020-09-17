# Java中的static

> static表示“全局”或者“静态”的意思，用来修饰成员变量和成员方法，也可以形成静态static代码块，但是Java语言中没有全局变量的概念。

- 大家都知道，我们可以基于一个类创建多个该类的对象，每个对象都拥有自己的成员，互相独立。然而在某些时候，我们更希望该类所有的对象共享同一个成员。此时就是 `static`大显身手的时候了！

-     `Java` 中被`static`修饰的成员称为静态成员或类成员。它属于整个类所有，而不是某个对象所有，即被类的所有对象所共享。静态成员可以使用类名直接访问，也可以使用对象名进行访问。当然，鉴于他作用的特殊性更推荐用类名访问

- 使用 `static` 可以修饰变量、方法和代码块。

- 被static修饰的成员变量和成员方法独立于该类的任何对象。也就是说，它不依赖类特定的实例，被类的所有实例共享。

- 只要这个类被加载，`Java`虚拟机就能根据类名在运行时数据区的方法区内定找到他们。因此，`static`对象可以在它的任何对象创建之前访问，无需引用任何对象。

- 用`public`修饰的`static`成员变量和成员方法本质是全局变量和全局方法，当声明它类的对象市，不生成`static`变量的副本，而是类的所有实例共享同一个`static`变量。

- `static`变量前可以有`private`修饰，表示这个变量可以在类的静态代码块中，或者类的其他静态成员方法中使用（当然也可以在非静态成员方法中使用--废话），但是不能在其他类中通过类名来直接引用，这一点很重要。实际上你需要搞明白，`private`是访问权限限定，`static`表示不要实例化就可以使用，这样就容易理解多了。static前面加上其它访问权限关键字的效果也以此类推。

- static修饰的成员变量和成员方法习惯上称为静态变量和静态方法，可以直接通过类名来访问，访问语法为：
  类名.静态方法名(参数列表...)
  类名.静态变量名

用static修饰的代码块表示静态代码块，当Java虚拟机（JVM）加载类时，就会执行该代码块（用处非常大，呵呵）。

## 1、static变量

- 按照是否静态的对类成员变量进行分类可分两种：一种是被static修饰的变量，叫静态变量或类变量；另一种是没有被static修饰的变量，叫实例变量。

- 两者的区别是：
  　1. 对于静态变量在内存中只有一个拷贝（节省内存），JVM只为静态分配一次内存，在加载类的过程中完成静态变量的内存分配，可用类名直接访问（方便），当然也可以通过对象来访问（但是这是不推荐的）。
    　2. 对于实例变量，没创建一个实例，就会为实例变量分配一次内存，实例变量可以在内存中有多个拷贝，互不影响（灵活）。

- 所以一般在需要实现以下两个功能时使用静态变量：
	> 在对象之间共享值时
	> 方便访问变量时

## 2、静态方法

> 静态方法可以直接通过类名调用，任何的实例也都可以调用，
> 因此静态方法中不能用this和super关键字，不能直接访问所属类的实例变量和实例方法(就是不带static的成员变量和成员成员方法)，只能访问所属类的静态成员变量和成员方法。
> 因为实例成员与特定的对象关联！这个需要去理解，想明白其中的道理，不是记忆！！！
> 因为static方法独立于任何实例，因此static方法必须被实现，而不能是抽象的abstract。

- 例如为了方便方法的调用，Java API中的Math类中所有的方法都是静态的，而一般类内部的static方法也是方便其它类对该方法的调用。

- 静态方法是类内部的一类特殊方法，只有在需要时才将对应的方法声明成静态的，一个类内部的方法一般都是非静态的

## 3、static代码块

　static代码块也叫静态代码块，是在类中独立于类成员的static语句块，可以有多个，位置可以随便放，它不在任何的方法体内，JVM加载类时会执行这些静态的代码块，如果static代码块有多个，JVM将按照它们在类中出现的先后顺序依次执行它们，每个代码块只会被执行一次。例如：

```java
public class Test5 {
    private static int a;
    private int b;

    static {
        Test5.a = 3;
        System.out.println(a);
        Test5 t = new Test5();
        t.f();
        t.b = 1000;
        System.out.println(t.b);
    }

    static {
        Test5.a = 4;
        System.out.println(a);
    }

    public static void main(String[] args) {
        // TODO 自动生成方法存根
    }

    static {
        Test5.a = 5;
        System.out.println(a);
    }

    public void f() {
        System.out.println("hhahhahah");
    }
}
```

运行结果：

```
3
hhahhahah
1000
4
5
```

　利用静态代码块可以对一些static变量进行赋值，最后再看一眼这些例子，都一个static的main方法，这样JVM在运行main方法的时候可以直接调用而不用创建实例。

## 4、static和final一块用表示什么

- static final用来修饰成员变量和成员方法，可简单理解为“全局常量”！
  对于变量，表示一旦给值就不可修改，并且通过类名可以访问。
  对于方法，表示不可覆盖，并且可以通过类名直接访问。

- 有时你希望定义一个类成员，使它的使用完全独立于该类的任何对象。通常情况下，类成员必须通过它的类的对象访问，但是可以创建这样一个成员，它能够被它自己使用，而不必引用特定的实例。在成员的声明前面加上关键字static(静态的)就能创建这样的成员。如果一个成员被声明为static，它就能够在它的类的任何对象创建之前被访问，而不必引用任何对象。你可以将方法和变量都声明为static。static 成员的最常见的例子是main( ) 。因为在程序开始执行时必须调用main() ，所以它被声明为static。

- 声明为static的变量实质上就是全局变量。当声明一个对象时，并不产生static变量的拷贝，而是该类所有的实例变量共用同一个static变量。声明为static的方法有以下几条限制：

	> 它们仅能调用其他的static 方法。
	> 它们只能访问static数据。
	> 它们不能以任何方式引用this 或super（关键字super 与继承有关，在下一章中描述）。
	> 如果你需要通过计算来初始化你的static变量，你可以声明一个static块，Static 块仅在该类被加载时执行一次。下面的例子显示的类有一个static方法，一些static变量，以及一个static 初始化块：


```java
//Demonstrate static variables，methods，and blocks.
class UseStatic {
    static int a = 3;
    static int b;

    static void meth(int x) {
        System.out.println("x = " + x);
        System.out.println("a = " + a);
        System.out.println("b = " + b);
    }

    static {
        System.out.println("Static block initialized.");
        b = a * 4;
    }

    public static void main(String args[]) {
        meth(42);
    }
}
```

- 一旦UseStatic 类被装载，所有的static语句被运行。首先，a被设置为3，接着static 块执行(打印一条消息)，最后，b被初始化为a*4 或12。然后调用main()，main() 调用meth() ，把值42传递给x。3个println ( ) 语句引用两个static变量a和b，以及局部变量x 。

  > 注意：在一个static 方法中引用任何实例变量都是非法的。

下面是该程序的输出：

```
Static block initialized.
x = 42
a = 3
b = 12
```

- 在定义它们的类的外面，static 方法和变量能独立于任何对象而被使用。这样，你只要在类的名字后面加点号运算符即可。例如，如果你希望从类外面调用一个static方法，你可以使用下面通用的格式：

`classname.method( )`

这里，classname 是类的名字，在该类中定义static方法。可以看到，这种格式与通过对象引用变量调用非static方法的格式类似。一个static变量可以以同样的格式来访问——类名加点号运算符。这就是Java 如何实现全局功能和全局变量的一个控制版本。

下面是一个例子。在main() 中，static方法callme() 和static 变量b在它们的类之外被访问。

```java
class StaticDemo {
    static int a = 42;
    static int b = 99;

    static void callme() {

        System.out.println("a = " + a);
    }
}

class StaticByName {

    public static void main(String args[]) {
        StaticDemo.callme();
        System.out.println("b = " + StaticDemo.b);
    }
}
```

下面是该程序的输出：

```shell
a = 42
b = 99
```

static成员是不能被其所在class创建的实例访问的。

如果不加static修饰的成员是对象成员，也就是归每个对象所有的。

加static修饰的成员是类成员，就是可以由一个类直接调用，为所有对象共有的

