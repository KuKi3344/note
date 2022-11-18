#  TypeScript note

## 基础类型

**TypeScript包含的数据类型如下：**

- 任意类型 **any**：声明为any的变量可以赋予任意类型的值

- 数字类型 **number**:双精度64位浮点值，可以表示整数和分数

- 字符串类型 **string**：使用单引号（**'**）或双引号（**"**）来表示字符串类型。反引号（**`**）来定义多行文本和内嵌表达式。

- 布尔类型 **boolean**

- 数组类型/元组 **无** 

  声明变量为数组：

  ```ts
  //在元素类型后面加上[]
  let arr : number[] = [1,2];
  //或者使用数组泛型
  let arr : Array<number> = [1,2];
  ```

  元组：元组类型用来表示已知元素数量和类型的数组，各元素的类型不必相同，对应位置的类型需要相同。

  ```ts
  let x : [string,number];
  x = ['Runoob',1];	// 正常
  x = [1,'Runoob']; 	// 报错
  ```

-  枚举 **enum**:枚举类型用于定义数值集合

  ```
  enum Color {Red,Green,Blue};
  let c:Color = Color.Blue;
  console.log(c); // 输出2
  ```

- **void:** 用于标识方法返回值的类型，表示该方法没有返回值

  ```ts
  function hello():void{
  	alert('hello Runnoob!');
  }
  ```

- **null:**表示对象值缺失

- **undefined:**用于初始化变量为一个未定义的值

- **never：** never是其他类型（包括null和undefined）的子类型，代表从不会出现的值

**注意：关于null 和 undefined**

- 默认情况下`null`和`undefined`是所有类型的子类型。

**注意：**TS和JS没有整数类型

顺便回顾一下js的基本数据类型有哪些

Number,Boolean,null,undefined,Symbol,String,Object,function,Array

### Any类型

任意值是TS针对编程时类型不明确的变量使用的一种数据类型，它常用于以下三种情况。

- 变量的值会**动态改变**时，比如来自用户的输入，任意值类型可以让这些变量跳过编译阶段的类型检查。 

  ```ts
  let x:any = 1;	//number
  x = 'I am Who I am';	//string
  x = false;	//boolean
  ```

  定义存储各种类型数据的数组时，示例代码如下:

  ```ts
  let arr:any[] = [1,false,'fine'];
  arr[1] = 100;
  ```

### Null 和 Undefined

#### null

在 JavaScript 中 null 表示 "什么都没有"。

null是一个只有一个值的特殊类型。表示一个空对象引用。

用 typeof 检测 null 返回是 object。

#### undefined

在 JavaScript 中, undefined 是一个没有设置值的变量。

typeof 一个没有值的变量会返回 undefined。

Null 和 Undefined 是其他任何类型（包括 void）的子类型，可以赋值给其它类型，如数字类型，此时，赋值后的类型会变成 null 或 undefined。而在TypeScript中启用严格的空校验（--strictNullChecks）特性，就可以使得**null 和 undefined 只能被赋值给 void 或本身对应的类型**，示例代码如下：

```ts
let x:number;
x = 1; // 编译正确
x = undefined; // 编译错误
x = null; // 编译错误
```

 上面的例子中变量x只能是数字类型。如果一个类型可能出现null或者undefined，可以用|来支持多种类型，示例代码如下：

```ts
let x: number | null | undefined；
x = 1;  // 编译正确
x = undefined;  // 编译正确
x = null;  // 编译正确
```

### never类型

never 是其它类型（包括 null 和 undefined）的子类型，代表从不会出现的值。这意味着声明为 never 类型的变量只能被 never 类型所赋值，在函数中它通常表现为抛出异常或无法执行到终止点（例如无限循环），示例代码如下：

```ts
let x: never;
let y: number;

// 编译错误，数字类型不能转为 never 类型
x = 123;

// 运行正确，never 类型可以赋值给 never类型
x = (()=>{ throw new Error('exception')})();

// 运行正确，never 类型可以赋值给 数字类型
y = (()=>{ throw new Error('exception')})();

// 返回值为 never 的函数可以是抛出异常的情况
function error(message: string): never {
    throw new Error(message);
}

// 返回值为 never 的函数可以是无法被执行到的终止点的情况
function loop(): never {
    while (true) {}
}
```

## 变量声明

变量是一种使用方便的占位符，用于引入计算机内存地址。

我们可以把变量看作存储数据的容器。

TS变量的命名规则：

- 变量名称可以包含数字和字母
- 除了下划线`_`和美元`$`符号外，不能包含其他的特殊字符，包括空格
- 变量名不能以数字开头。

从这三点来看，TS变量的命名规则倒是和JS的如出一辙。

变量使用前必须先声明，我们可以使用var来声明变量。

我们可以使用以下四种方式来声明变量：

声明变量的类型以及初始值：

```ts
var [变量名]:[类型] = 值
```

例如

```ts
var uname:string = "Runoob";
```

声明变量的类型，但没有初始值，变量值会设置为undefined；

```ts
var [变量名]:[类型]; //var uname:string
```

声明变量并设置初始值，但不设置类型，该变量可以是任意类型。

```ts
var [变量名] = [值]	//var uname = "Runoob"
```

**注：**变量不要使用name否则会与DOM中的全局window对象下的name属性出现了重名。

### 变量作用域

变量作用域指定了变量定义的位置。

程序中变量的可用性由变量作用域决定。

TS有以下几种作用域。

- **全局作用域：**全局变量定义在程序结构的外部，它可以在你代码的任何位置使用
- **类作用域：**这个变量也可以成为字段。类变量声明在一个类里头，但在类的方法外面。该变量可以通过类的对象来访问，类变量也可以是静态的，静态的变量可以通过类名直接访问。
- **局部作用域：**局部变量，局部变量只能在声明它的一个代码块（如方法）中使用。

```ts
var global_num = 12          // 全局变量
class Numbers { 
   num_val = 13;             // 实例变量
   static sval = 10;         // 静态变量
   
   storeNum():void { 
      var local_num = 14;    // 局部变量
   } 
} 
console.log("全局变量为: "+global_num)  
console.log(Numbers.sval)   // 静态变量
var obj = new Numbers(); 
console.log("实例变量: "+obj.num_val)
```

### 类型断言

类型断言可以用来手动指定一个值的类型，即允许变量从一种类型更改为另一种类型

语法格式：`<类型> 值`或者`值 as 类型`

推荐以 as 方式，因为 jsx 这样的语法中**只支持 as 方式。**

**简单点来说：**

TypeScript 允许你覆盖它的推断，并且能以你任何你想要的方式分析它，这种机制被称为**「类型断言」**。TypeScript 类型断言用来告诉编译器你比它更了解这个类型，并且它不应该再发出错误(个人感觉有点像欺骗编译器)。

**类型断言更像是类型的选择，而不是类型转换**

类型断言的一个常见用例是当你从 JavaScript 迁移到 TypeScript 时：

```ts
const foo = {};
foo.bar = 123; // Error: 'bar' 属性不存在于 ‘{}’
foo.bas = 'hello'; // Error: 'bas' 属性不存在于 '{}'
```

这里的代码发出了错误警告，因为 `foo` 的类型推断为 `{}`，即没有属性的对象。因此，你不能在它的属性上添加 `bar` 或 `bas`，你可以通过类型断言来避免此问题：

```ts
interface Foo {
  bar: number;
  bas: string;
}

const foo = {} as Foo;
foo.bar = 123;
foo.bas = 'hello';
```

```ts
let foo: any;
let bar = <string>foo; // 现在 bar 的类型是 'string'
```

然而，当你在 JSX 中使用 `<foo>` 的断言语法时，这会与 JSX 的语法存在歧义：

```ts
let foo = <string>bar;</string>;
```

因此，为了一致性，我们建议你使用 `as foo` 的语法来为类型断言。

我们还得知道什么时候来使用类型断言，但是这个我没办法一一列举出来，主要因为我也没有很多使用typescript的经验。但是可以举一个最直观的例子：

```ts
function func(val: string | number): number {
  if (val.length) {
    return val.length
  } else {
    return val.toString().length
  }
}
```

函数的参数 val 是一个联合类型，在这里的意思是说 val 可以是字符串类型也可以是数值类型。代码中要返回参数的长度，但是 length 可以是字符串的属性，而数值是没有这个属性的，所以当 val 是数值时，就先用 toSting() 来将数字转换为字符串再取长度。这样的逻辑本身没问题，但是在编译阶段一访问 val.length 时就报错了，因为 **访问联合类型值的属性时，这个属性必须是所有可能类型的共有属性，**而length不是共有属性，val 的类型此时也没确定，所以编译不通过。为了通过编译，此时就可以使用类型断言了，如下：

```ts
function func(val: string | number): number {
  if ((<string>val).length) {
    return (<string>val).length
  } else {
    return val.toString().length
  }
}

或者

function func(val: string | number): number {
  if ((val as string).length) {
    return (val as string).length
  } else {
    return val.toString().length
  }
}
```

例子中，把 val 断言为了 string类型，此时就可以访问 length 属性了。你可能会疑惑如果 val 断言为了string，那么开始定义的联合类型是不是失去了它的意义？答案是否定的。我在一开始就说了类型断言不是类型转换，而是类型选择，可以理解为在编译阶段强行把 val 当作 string类型来访问了。

它之所以不被称为**类型转换**，是因为转换通常意味着某种运行时的支持。但是，类型断言纯粹是一个编译时语法，同时，它也是一种为编译器提供关于如何分析代码的方法。

### 类型推断

当类型没有给出时，typescript编译器利用类型推断来推断类型（被动的推断而非主动）。

如果由于缺乏声明而不能推断出类型，那么他的类型被视作默认的动态any类型。

```ts
var num = 2;    // 类型推断为 number
console.log("num 变量的值为 "+num); 
num = "12";    // 编译错误
console.log(num);
```

- 第一行代码声明了变量 num 并=设置初始值为 2。 注意变量声明没有指定类型。因此，程序使用类型推断来确定变量的数据类型，第一次赋值为 2，**num** 设置为 number 类型。
- 第三行代码，当我们再次为变量设置字符串类型的值时，这时编译会错误。因为变量已经设置为了 number 类型。

## TS Number

### Number 对象属性

下表列出了 Number 对象支持的属性：

| 序号 |                         属性 & 描述                          |
| :--: | :----------------------------------------------------------: |
|  1.  | **MAX_VALUE**可表示的最大的数，MAX_VALUE 属性值接近于 1.79E+308。大于 MAX_VALUE 的值代表 "Infinity"。 |
|  2.  | **MIN_VALUE**可表示的最小的数，即最接近 0 的正数 (实际上不会变成 0)。最大的负数是 -MIN_VALUE，MIN_VALUE 的值约为 5e-324。小于 MIN_VALUE ("underflow values") 的值将会转换为 0。 |
|  3.  |              **NaN**非数字值（Not-A-Number）。               |
|  4.  | **NEGATIVE_INFINITY**负无穷大，溢出时返回该值。该值小于 MIN_VALUE。 |
|  5.  | **POSITIVE_INFINITY**正无穷大，溢出时返回该值。该值大于 MAX_VALUE。 |
|  6.  | **prototype**Number 对象的静态属性。使您有能力向对象添加属性和方法。 |
|  7.  |    **constructor**返回对创建此对象的 Number 函数的引用。     |

```ts
console.log("TypeScript Number 属性: "); 
console.log("最大值为: " + Number.MAX_VALUE); 
console.log("最小值为: " + Number.MIN_VALUE); 
console.log("负无穷大: " + Number.NEGATIVE_INFINITY); 
console.log("正无穷大:" + Number.POSITIVE_INFINITY);
```

### Number 对象方法

Number对象 支持以下方法：

| 序号 |                         方法 & 描述                          |                             实例                             |
| :--: | :----------------------------------------------------------: | :----------------------------------------------------------: |
|  1.  |         toExponential()把对象的值转换为指数计数法。          | `//toExponential()  var num1 = 1225.30  var val = num1.toExponential();  console.log(val) // 输出： 1.2253e+3` |
|  2.  |      toFixed()把数字转换为字符串，并对小数点指定位数。       | `var num3 = 177.234  console.log("num3.toFixed() 为 "+num3.toFixed())    // 输出：177 console.log("num3.toFixed(2) 为 "+num3.toFixed(2))  // 输出：177.23 console.log("num3.toFixed(6) 为 "+num3.toFixed(6))  // 输出：177.234000` |
|  3.  |  toLocaleString()把数字转换为字符串，使用本地数字格式顺序。  | `var num = new Number(177.1234);  console.log( num.toLocaleString());  // 输出：177.1234` |
|  4.  |           toPrecision()把数字格式化为指定的长度。            | `var num = new Number(7.123456);  console.log(num.toPrecision());  // 输出：7.123456  console.log(num.toPrecision(1)); // 输出：7 console.log(num.toPrecision(2)); // 输出：7.1` |
|  5.  | toString()把数字转换为字符串，使用指定的基数。数字的基数是 2 ~ 36 之间的整数。若省略该参数，则使用基数 10。 | `var num = new Number(10);  console.log(num.toString());  // 输出10进制：10 console.log(num.toString(2)); // 输出2进制：1010 console.log(num.toString(8)); // 输出8进制：12` |
|  6.  |         valueOf()返回一个 Number 对象的原始数字值。          | `var num = new Number(10);  console.log(num.valueOf()); // 输出：10` |

## TypeScript String（字符串）

String支持的属性：

| 序号 |              属性 & 描述              |                             实例                             |
| :--: | :-----------------------------------: | :----------------------------------------------------------: |
|  1.  | constructor对创建该对象的函数的引用。 | `var str = new String( "This is string" );  console.log("str.constructor is:" + str.constructor)`输出结果：`str.constructor is:function String() { [native code] }` |
|  2.  |       length返回字符串的长度。        | `var uname = new String("Hello World")  console.log("Length "+uname.length)  // 输出 11` |
|  3.  | prototype允许您向对象添加属性和方法。 | `function employee(id:number,name:string) {     this.id = id     this.name = name  }  var emp = new employee(123,"admin")  employee.prototype.email="admin@runoob.com" // 添加属性 email console.log("员工号: "+emp.id)  console.log("员工姓名: "+emp.name)  console.log("员工邮箱: "+emp.email)` |

## TypeScript Array(数组)

假如你有一组数据（例如：网站名字），存在单独变量如下所示：

`var site1="Google"; var site2="Runoob"; var site3="Taobao";`

如果有 10 个、100 个这种方式就变的很不实用，这时我们可以使用数组来解决：

```ts
var sites:string[];
sites = ["Google","Runoob","Taobao"]
```

TypeScript 声明数组的语法格式如下所示：

```ts
var array_name[:datatype];        //声明 
array_name = [val1,val2,valn..]   //初始化
```

或者直接在声明时初始化：

```ts
var array_name[:datatype] = [val1,val2…valn]
```

如果数组声明时未设置类型，则会被认为是 any 类型，在初始化时根据第一个元素的类型来推断数组的类型。

创建一个 number 类型的数组：

```
var numlist:number[] = [2,4,6,8]
```

整个数组结构如下所示：

![img](TypeScript%20note.assets/declaring_and_initializing_arrays.png)

### 多维数组

一个数组的元素可以是另外一个数组，这样就构成了多维数组（Multi-dimensional Array）。ts

最简单的多维数组是二维数组，定义方式如下：

```ts
var arr_name:datatype[][]=[ [val1,val2,val3],[v1,v2,v3] ]
```

**实例：**

```ts
var multi:number[][] = [[1,2,3],[23,24,25]]  
console.log(multi[0][0]) 
console.log(multi[0][1]) 
console.log(multi[0][2]) 
console.log(multi[1][0]) 
console.log(multi[1][1]) 
console.log(multi[1][2])
```

### **定义数组对象**

```ts
let docs : {
	text:string,
	collapsable:boolean,
	sidebarDepth:number,
	children:Array<any>
}[] = [
	{
		text:"开发指南"，
		collapsable:false,
		sidebarDepth:0,
		children:[]
	},{
		......
	}
]
```

## TypeScript 元组

我们知道数组中元素的数据类型都一般是相同的（any[] 类型的数组可以不同），如果存储的元素数据类型不同，则需要使用元组。

元组中允许存储不同类型的元素，元组可以作为参数传递给函数。

创建元组的语法格式如下：

```ts
var tuple_name = [value1,value2,value3,…value n]
eg: var mytuple = [10,"Runoob"];
```

或者我们可以先声明一个空元组，然后再初始化：

```ts
var mytuple = []; 
mytuple[0] = 1205
mytuple[1] = 234
```

## TypeScript 联合类型

联合类型（Union Types）可以通过管道(|)将变量设置多种类型，赋值时可以根据设置的类型来赋值。

**注意**：只能赋值指定的类型，如果赋值其它类型就会报错。

创建联合类型的语法格式如下：

```
Type1|Type2|Type3 
```

```ts
var val:string|number 
val = 12 
console.log("数字为 "+ val) 
val = "Runoob" 
console.log("字符串为 " + val)
```

也可以将联合类型作为函数参数使用：

```ts
function disp(name:string|string[]) { 
   if(typeof name == "string") { 
         console.log(name) 
     } else { 
           var i; 
           for(i = 0;i<name.length;i++) { 
           	console.log(name[i])
           } 
     } 
} 
disp("Runoob") 
console.log("输出数组....") 
disp(["Runoob","Google","Taobao","Facebook"])
```

## TypeScript 接口

接口是一系列抽象方法的声明，是一些方法特征的集合，这些方法都应该是抽象的，需要由具体的类去实现，然后第三方就可以通过这组抽象方法调用，让具体的类执行具体的方法。

TypeScript 接口定义如下：

```
interface interface_name { 
}
```

以下实例中，我们定义了一个接口 IPerson，接着定义了一个变量 customer，它的类型是 IPerson。

customer 实现了接口 IPerson 的属性和方法。

```ts
interface IPerson { 
    firstName:string, 
    lastName:string, 
    sayHi: ()=>string 
} 
 
var customer:IPerson = { 
    firstName:"Tom",
    lastName:"Hanks", 
    sayHi: ():string =>{return "Hi there"} 
} 
 
console.log("Customer 对象 ") 
console.log(customer.firstName) 
console.log(customer.lastName) 
console.log(customer.sayHi())  
 
var employee:IPerson = { 
    firstName:"Jim",
    lastName:"Blakes", 
    sayHi: ():string =>{return "Hello!!!"} 
} 
 
console.log("Employee  对象 ") 
console.log(employee.firstName) 
console.log(employee.lastName)
```

------

### 联合类型和接口

```ts
interface RunOptions { 
    program:string; 
    commandline:string[]|string|(()=>string); 
} 
 
// commandline 是字符串
var options:RunOptions = {program:"test1",commandline:"Hello"}; 
console.log(options.commandline)  
 
// commandline 是字符串数组
options = {program:"test1",commandline:["Hello","World"]}; 
console.log(options.commandline[0]); 
console.log(options.commandline[1]);  
 
// commandline 是一个函数表达式
options = {program:"test1",commandline:()=>{return "**Hello World**";}}; 
 
var fn:any = options.commandline; 
console.log(fn());
```

### 接口继承

接口继承就是说接口可以通过其他接口来扩展自己。

Typescript 允许接口继承多个接口。

继承使用关键字 **extends**。

单接口继承语法格式：

```ts
Child_interface_name extends super_interface_name
```

继承的各个接口使用逗号 **,** 分隔。

**单继承实例：**

```ts
interface Person { 
   age:number 
} 
 
interface Musician extends Person { 
   instrument:string 
} 
 
var drummer = <Musician>{}; 
drummer.age = 27 
drummer.instrument = "Drums" 
console.log("年龄:  "+drummer.age)
console.log("喜欢的乐器:  "+drummer.instrument)
```

**多继承实例：**

```ts
interface IParent1 { 
    v1:number 
} 
 
interface IParent2 { 
    v2:number 
} 
 
interface Child extends IParent1, IParent2 { } 
var Iobj:Child = { v1:12, v2:23} 
console.log("value 1: "+Iobj.v1+" value 2: "+Iobj.v2)
```

## TypeScript 类

TypeScript 是面向对象的 JavaScript。

类描述了所创建的对象共同的属性和方法。

TypeScript 支持面向对象的所有特性，比如 类、接口等。

TypeScript 类定义方式如下：

```ts
class class_name { 
    // 类作用域
}
```

### 创建类的数据成员

以下实例我们声明了类 Car，包含字段为 engine，构造函数在类实例化后初始化字段 engine。

this 关键字表示当前类实例化的对象。注意构造函数的参数名与字段名相同，this.engine 表示类的字段。

此外我们也在类中定义了一个方法 disp()。

```ts
class Car { 
    // 字段 
    engine:string; 
 
    // 构造函数 
    constructor(engine:string) { 
        this.engine = engine 
    }  
 
    // 方法 
    disp():void { 
        console.log("发动机为 :   "+this.engine) 
    } 
}
```

### 创建实例化对象

我们使用 new 关键字来实例化类的对象，语法格式如下：

```ts
var object_name = new class_name([ arguments ])
```

类实例化时会调用构造函数，例如：

```ts
var obj = new Car("Engine 1")
```

类中的字段属性和方法可以使用 **.** 号来访问：

```ts
// 访问属性
obj.field_name 

// 访问方法
obj.function_name()
```

### 类的继承

TypeScript 支持继承类，即我们可以在创建类的时候继承一个已存在的类，这个已存在的类称为父类，继承它的类称为子类。

类继承使用关键字 **extends**，子类除了不能继承父类的私有成员(方法和属性)和构造函数，其他的都可以继承。

TypeScript 一次只能继承一个类，不支持继承多个类，但 TypeScript 支持多重继承（A 继承 B，B 继承 C）。

语法格式如下：

```ts
class child_class_name extends parent_class_name
```

**实例：**创建了Shape类，Circle类继承了Shape类，Circle类可以直接使用Area属性：

```ts
class Shape { 
   Area:number 
   
   constructor(a:number) { 
      this.Area = a 
   } 
} 
 
class Circle extends Shape { 
   disp():void { 
      console.log("圆的面积:  "+this.Area) 
   } 
}
  
var obj = new Circle(223); 
obj.disp()
```

需要注意的是子类只能继承一个父类，TypeScript 不支持继承多个类，但支持多重继承，如下实例：

```ts
class Root { 
   str:string; 
} 
 
class Child extends Root {} 
class Leaf extends Child {} // 多重继承，继承了 Child 和 Root 类
 
var obj = new Leaf(); 
obj.str ="hello" 
console.log(obj.str)
```

### 继承类的方法重写

类继承后，子类可以对父类的方法重新定义，这个过程称之为方法的重写。

其中 super 关键字是对父类的直接引用，该关键字可以引用父类的属性和方法。

```ts
class PrinterClass { 
   doPrint():void {
      console.log("父类的 doPrint() 方法。") 
   } 
} 
 
class StringPrinter extends PrinterClass { 
   doPrint():void { 
      super.doPrint() // 调用父类的函数
      console.log("子类的 doPrint()方法。")
   } 
}
```

​                                                                                   

### static 关键字

static 关键字用于定义类的数据成员（属性和方法）为静态的，静态成员可以直接通过类名调用。

```ts
class StaticMem {  
   static num:number; 
   
   static disp():void { 
      console.log("num 值为 "+ StaticMem.num) 
   } 
} 
 
StaticMem.num = 12     // 初始化静态变量
StaticMem.disp()       // 调用静态方法
```

### 访问控制修饰符

TypeScript 中，可以使用访问控制符来保护对类、变量、方法和构造方法的访问。TypeScript 支持 3 种不同的访问权限。

- **public（默认）** : 公有，可以在任何地方被访问。
- **protected** : 受保护，可以被其自身以及其子类访问。
- **private** : 私有，只能被其定义所在的类访问。

以下实例定义了两个变量 str1 和 str2，str1 为 public，str2 为 private，实例化后可以访问 str1，如果要访问 str2 则会编译错误。

```ts
class Encapsulate { 
   str1:string = "hello" 
   private str2:string = "world" 
}                     
 
var obj = new Encapsulate() 
console.log(obj.str1)     // 可访问 
console.log(obj.str2)   // 编译错误， str2 是私有的
```

### 类和接口

类可以实现接口，使用关键字 implements，并将 interest 字段作为类的属性使用。

以下实例红 AgriLoan 类实现了 ILoan 接口：

```ts
interface ILoan { 
   interest:number 
} 
 
class AgriLoan implements ILoan { 
   interest:number 
   rebate:number 
   
   constructor(interest:number,rebate:number) { 
      this.interest = interest 
      this.rebate = rebate 
   } 
} 
 
var obj = new AgriLoan(10,1) 
console.log("利润为 : "+obj.interest+"，抽成为 : "+obj.rebate )
```

## TypeScript 对象

对象是包含一组键值对的实例。 值可以是标量、函数、数组、对象等，如下实例：

```ts
var object_name = { 
    key1: "value1", // 标量
    key2: "value",  
    key3: function() {
        // 函数
    }, 
    key4:["content1", "content2"] //集合
}
```

### 类型模板

假如我们在 JavaScript 定义了一个对象：

`var sites = {    site1:"Runoob",    site2:"Google"  };`

这时如果我们想在对象中添加方法，可以做以下修改：

```
sites.sayHello = function(){ return "hello";}
```

如果在 TypeScript 中使用以上方式则会出现编译错误，因为Typescript 中的对象必须是特定类型的实例。

```ts
var sites = {
    site1: "Runoob",
    site2: "Google",
    sayHello: function () { } // 类型模板
};
sites.sayHello = function () {
    console.log("hello " + sites.site1);
};
sites.sayHello();
```

此外对象也可以作为一个参数传递给函数，如下实例：

```ts
var sites = { 
    site1:"Runoob", 
    site2:"Google",
}; 
var invokesites = function(obj: { site1:string, site2 :string }) { 
    console.log("site1 :"+obj.site1) 
    console.log("site2 :"+obj.site2) 
} 
invokesites(sites)
```

### 鸭子类型(Duck Typing)

鸭子类型（英语：duck typing）是动态类型的一种风格，是多态(polymorphism)的一种形式。

在这种风格中，一个对象有效的语义，不是由继承自特定的类或实现特定的接口，而是由"当前方法和属性的集合"决定。

> 可以这样表述：
>
> "当看到一只鸟走起来像鸭子、游泳起来像鸭子、叫起来也像鸭子，那么这只鸟就可以被称为鸭子。"

在鸭子类型中，关注点在于对象的行为能做什么，而不是关注对象所属的类型。例如，在不使用鸭子类型的语言中，我们可以编写一个函数，它接受一个类型为"鸭子"的对象，并调用它的"走"和"叫"方法。在使用鸭子类型的语言中，这样的一个函数可以接受一个任意类型的对象，并调用它的"走"和"叫"方法。如果这些需要被调用的方法不存在，那么将引发一个运行时错误。任何  拥有这样的正确的"走"和"叫"方法的对象都可被函数接受的这种行为引出了以上表述，这种决定类型的方式因此得名。

```ts
interface IPoint { 
    x:number 
    y:number 
} 
function addPoints(p1:IPoint,p2:IPoint):IPoint { 
    var x = p1.x + p2.x 
    var y = p1.y + p2.y 
    return {x:x,y:y} 
} 
 
// 正确
var newPoint = addPoints({x:3,y:4},{x:5,y:1})  
 
// 错误 
var newPoint2 = addPoints({x:1},{x:4,y:3})
```

## TypeScript 命名空间

命名空间一个最明确的目的就是解决重名问题。

假设这样一种情况，当一个班上有两个名叫小明的学生时，为了明确区分它们，我们在使用名字之外，不得不使用一些额外的信息，比如他们的姓（王小明，李小明），或者他们父母的名字等等。

命名空间定义了标识符的可见范围，一个标识符可在多个名字空间中定义，它在不同名字空间中的含义是互不相干的。这样，在一个新的名字空间中可定义任何标识符，它们不会与任何已有的标识符发生冲突，因为已有的定义都处于其他名字空间中。

TypeScript 中命名空间使用 **namespace** 来定义，语法格式如下：

```ts
namespace SomeNameSpaceName { 
   export interface ISomeInterfaceName {      }  
   export class SomeClassName {      }  
}
```

