## Java中什么是域

> 多态在域的问题上是特殊的。我理解不了中文版的书直接叫域，看了英文原版，原版写的是fields，直接翻译虽然没错，但是出问题的变量不是域。特地查了what is the meaning of field in java？很多人把它看成是由花括号括起来的一个范围。其实框架里面也有一种东西——domain model，这个也叫域，域模型。


- **What is a field in java?**


- **A field is an attribute. A field may be a class's variable, an object's variable, an object's method's variable, or a parameter of a function.**

```java
class bike{
  static int bikes;
  int gear;
  int cadence;

  void create( int newGear, int newCadence ){
    bikes = bikes + 1;
    gear = newGear;
    cadence = newCadence;}
  int getSpeed(){
    int speed = gear*cadence*5*3.141;
    return speed;
  }
}
```

- **'bikes' is a class's variable (class variable) (static field).**
- **'gear' and 'cadence' could be an object's variables (instance variables) (non-static fields).**
- **'speed' is an object's method's variable (local variable).**
- **'newGear' and 'newCadence' are parameters of a function (parameters).**

> field，域是一种属性，可以是一个类变量，一个对象变量，一个对象方法变量或者是一个函数的参数。（补充，class‘s variables，类的实例变量和静态变量称为class's variables，类属变量，也称类变量或数据域，其实翻译成属性也可以，类属性，听起来不会怪怪的，来自百度百科）。

```java
class bike{
  static int bikes;
  int gear;
  int cadence;

  void create( int newGear, int newCadence ){
    bikes = bikes + 1;
    gear = newGear;
    cadence = newCadence;}
  int getSpeed(){
    int speed = gear*cadence*5*3.141;
    return speed;
  }
}
```

- bikes是一个类变量(静态域)。

- gear 和 cadence 是对象变量（实例变量）（非静态域）。（这里有一点点小矛盾，其实这样照百科这样说，那么bikes、gear和cadence都是类变量，bikes是类变量中的静态变量，而gear和cadence是类变量中的实例变量。）

- speed是对象方法的变量(局部变量)。（看到没有，local variable，java没有出现gobal variable，全局变量，要说的话类变量的作用范围和全局变量一样，只不过不那样叫）。

- newGear和newCadence是函数(方法)的参数(参数)。

