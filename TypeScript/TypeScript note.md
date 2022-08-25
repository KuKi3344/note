# TypeScript note

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

