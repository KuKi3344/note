# ES6



## let关键字

ES6中新增的用于声明变量的关键字

- let声明的变量旨在所处于的块级有效

```js
if(true){
let a = 10;
    if(true){
		let c = 30;
    }
    console.log(c);	//c is not defined
}
console.log(a); // a is not defined
```

在一个大括号中，使用let关键字声明的变量才具有块级作用域

var关键字是不具备这个特点的

```js
for (let i = 0;i < 2;i++){

}
cosole.log(i); 	// i is not defined

for (var i = 0;i < 2;i++){

}
cosole.log(i); 	// 2
```

拥有块级作用域的变量能带来的好处：防止循环变量变成全局变量

- 不存在变量提升

```js
console.log(a);
let a = 100;
```

- 暂时性死区特性

```js
var tmp = 123;
if(true){
	tmp = 'abc';
	let tmp;
}
```

虽然if语句外有同名变量，但是和块级作用域中的tmp是毫无关系的，它们之间不会相互影响，let定义的变量和块级这个整体进行了绑定，所以在变量声明的前面使用变量，会报错，报变量没有定义的错，这种特性叫暂时性死区。

### 经典面试题

```js
var arr = [];
for (var i = 0;i < 2;i++){
		arr[i] = function(){
			console.log(i);
	}
}
// 注意：for循环只是往arr数组中添加函数而不是执行
arr[0]();	//由于arr[i]的值就是函数所以可以直接后面加()调用
arr[1]();
```

由于函数执行时，循环早就结束了，所以i的值是不满足循环条件的值。所以函数执行时输出的i值是2。由于数组中存储的两个函数在执行时输出的都是`全局变量i`,所以两次输出结果都是一样的，都是2。当前代码的关键点在于，变量i是全局的，函数执行时输出的都是全局作用域下的i值

![1](D:\web前端\ES6 note\img\1.png)

若把var改成let

```js
var arr = [];
for (let i = 0;i < 2;i++){
		arr[i] = function(){
			console.log(i);
	}
}
// 注意：for循环只是往arr数组中添加函数而不是执行
arr[0]();	//由于arr[i]的值就是函数所以可以直接后面加()调用
arr[1]();
```

由于使用let声明的变量，具有块级作用域，循环又执行两次。所以循环两次后产生了两个块级作用域，产生的两个块级作用域中都有自己的变量i，这是两个变量，是互不影响的，因为它们处于两个不同的块级作用域。循环结束后，数组中依然存储两个函数，函数执行时，函数内部依旧没有自己的变量i，还是要向上一级作用域中查找，而它们的上一级作用域实际上就是循环产生的块级作用域，所以两个函数执行时要分别去自己对应的块级作用域中查找变量i的值，所以数组中的第一个函数执行时，输出的是第一个块级作用域中变量i的值，就是0，第二个输出的是第二个块级作用域的值，就是1。

**关键点：**每一次循环都会产生一个块级作用域，每个块级作用域的变量i都是不同的。函数执行时，输出的是自己上一级作用域下变量i的值，也就是循环产生的块级作用域下i的值。

## const关键字

作用：声明常量。即为内存地址不能变化的量。

- 具有块级作用域

```js
if (true){
	const a = 10;
    if (true){
    	const a = 20;
        console.log(a);	// 20
    }
    console.log(a);		//10
}
console.log(a);	//a is not defined
```

- 声明常量时必须赋值

```js
const PI; // Missing initializer in const declaration
```

- 常量赋值后，值通常不能修改

```js
const PI = 3.14
PI = 100; //Assignment to constant variable.
```

```js
const ary = [100,200];
ary[0] = 'a';
ary[1] = 'b';
console.log(ary); // ['a','b'];
//这种更改操作是可以的，因为这个操作没有更改ary常量在内存中的存储地址
ary = ['a','b']; //Assignment to constant variable.
//这种操作不被允许，因为这个操作改变了ary常量在内存中的存储地址
```

## let、const、var的区别

1.使用**var**声明的变量，其作用域为该语句所在的函数内，且存在变量提升现象。

2.使用**let**声明的变量，其作用域为该语句所在的代码块内，不存在变量提升。

3.使用**const**声明的是常量，在后面出现的代码中不能再修改该常量的值。

|     var      |      let       |     const      |
| :----------: | :------------: | :------------: |
| 函数级作用域 |   块级作用域   |   块级作用域   |
|   变量提升   | 不存在变量提升 | 不存在变量提升 |
|   值可修改   |    值可更改    |   值不可更改   |

## 解构赋值

ES6中允许从数组中提取值，按照对应位置，对变量赋值。对象也可以实现解构

### 数组解构

数组解构允许我们按照一一对应的关系从数组中提取值然后将值赋值给变量

```js
let [a,b,c] = [1,2,3];
console.log(a);
console.log(b);
console.log(c);
```

如果解构不成功(没有对应的值)，变量的值为undefined

```js
let ary = [1,2,3];
let [a,b,c,d,e] = ary;
console.log(c);
console.log(d);	//undefined
console.log(e); //undefined
```

### 对象解构

对象解构允许我们使用变量的名字匹配对象的属性，匹配成功将对象属性的值赋值给变量

```js
let person = {name:'zhangsan',age:20};
let { name,age } = person;
console.log(name); //'zhangsan'
console.log(age);	//20
```

另一种写法：

这种写法支持变量的名字和对象中属性的名字不一样

```js
let { name:myName,age:myAge } = person;	//myName,myAge属于别名
console.log(myName);
console.log(myAge);
```

在解构语法中，冒号左边的name只用于属性匹配，冒号右边的myName才是真的变量

## 箭头函数

ES6中新增的定义函数的方式，箭头函数是用来简化函数定义语法的

```js
() => {}
```

小括号中放置形参，大括号里面代表函数体

通常，我们会将箭头函数赋值给一个变量，变量名字就是函数名字，通过变量名字调用函数就可以了

```js
const fn = () => {}
```

若函数体中只有一句代码，且代码执行结果就是返回值，可以省略大括号

```js
function sum(num1,num2){
	return num1 + num2;
}
//等同于
const sum = (num1,num2) => num1 + num2;
```

如果形参只有一个，可以省略形参外面的小括号

```js
function fn(v){
	alert(v);
}

const fn = v => {
	alert(v);
}
```

箭头函数不绑定this，没有自己的this关键字，箭头函数中的this，指向的是**函数定义位置的上下文this**，也就是说，this关键字指向箭头函数定义位置中的this。

```js
const obj = { name:'zhangsan'}
function fn(){
	console.log(this);
	return () => {
		console.log(this)
	}
}
const resfn = fn.call(obj);
resfn();
```

调用fn函数并通过call将fn()的this指向obj，由于箭头函数处于fn中，所以它里面的this指向的也是fn()指向的this，即也为obj。

### 箭头函数面试题

```js
var obj = {
	age:20,
	say:() => {
		alert(this.age)
	}
}
obj.say();		// alert(undefined)
```

obj是一个对象，不能产生作用域，实际上这个箭头函数被定义在了全局作用域下，所以在调用say方法时，this指向的是window，而window下面没有age属性，所以弹出了undefined

在window对象下面添加一个age属性，证明obj.say方法弹出的是window对象的age属性

```js
var age = 100;
var obj = {
	age:20,
	say:() => {
		alert(this.age)
	}
}
obj.say();		// alert(100)
```

## 剩余参数

当函数实参个数大于形参个数时，可以将剩余的实参放入一个数组中

```js
function sum(first, ...args){
	console.log(first);	//10
	console.log(args);	//[20,30]
}
sum(10,20,30);

const sum = (...args) => {
    	let total = 0;
    	args.forEach(item => total+=item;)
    return total;
};
sum(10,20);
sum(10,20,30);
```

### 剩余参数和解构配合使用

```js
let ary = ['wang','zhang','li'];
let[s1,...s2] = ary;
console.log(s1); //wang
console.log(s2); //array(2)=['zhang','li'];
```

## ES6的内置对象扩展

### Array的扩展方法

扩展运算符可以将数组或者对象转为用逗号分隔的参数序列

```js
let ary = [1,2,3];
...ary //1,2,3
console.log(...ary); //1 2 3
console.log(1，2，3); //1 2 3
```

因为逗号被当作console.log方法的参数分割符了，所以输出结果中是没有逗号的

扩展运算符可以将数组拆分成以逗号分隔的参数序列

#### 合并数组

扩展运算符可以应用于合并数组

```js
let ary1 = [1,2,3];
let ary2 = [3,4,5];
let ary3 = [...ary1,...ary2];
```

ES5用concat实现拼接

第二种方法 push方法

```js
ary1.push(...ary2); //将ary2追加到ary1后，若拼接多个用逗号分隔
```

#### 伪数组转换

将伪数组转换成真正的数组

```js
var odivs = document.getElementByTagName('div');
console.log(odivs);
var ary = [...odivs];
arr.push('a');
```

**_为什么要把伪数组转换成真正的数组呢？_**

伪数组转换成真正的数组后，就可以调用数组对象下面的方法了，比如push方法

##### 构造函数方法

**Array.from()**

将类数组或可遍历对象转化为真正的数组

```js
var arrayLike = {
"0":"zhang",
"1":"wang",
"2":"li",
"length":3
}
var ary = Array.from(arrayLike);
console.log(arrayLike);
console.log(ary);
```

打印后二者区别

![2](D:\web前端\ES6 note\img\2.png)

方法还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组

```js
let arrayLike = {
"0":1,
"1":2,
"length":2
}
let newAry = Array.from(arrayLike,(item) =>{
    return item *2;
})
//可省略成以下格式
let newAry = Array.from(arrayLike,item=>item *2);
```

#### 实例方法find()

用于找出第一个符合条件的数组成员，如果没有找到返回undefined

```js
let ary = [
{
	id:1,
	name:'zhang'
},
{
	id:2,
	name:'li'
}
];
//查找数组中id为2的那个对象
let target = ary.find(item => item.id ==2);
```

#### 实例方法findIndex()

用于找出第一个符合条件的数组成员的位置，如果没有找到返回-1

```js
let ary = [1,5,10,16];
let index = ary.findIndex(item => item > 15);
```

#### 实例方法includes()

表示某个数组是否包含给定的值，返回布尔值

```js
[1,2,3].includes(2) //true
[1,2,3].includes(4) //false
```

### String的扩展方法

#### 模板字符串

ES6新增的创建字符串的方式，使用反引号定义

模板字符串中可以解析变量

```js
let name = `zhang`;
let sayhello = `hello,my name is ${name}`;
console.log(sayhello);
```

模板字符串中可以换行

```js
let result = {
	name:'zhang',
	age:20,
	sex:'男'
}
let html = `
		<div>
		<span>${result.name}</span>
		<span>${result.age}</span>
		<span>${result.sex}</span>
		</div>
		`;
console.log(html);
```

![3](D:\web前端\ES6 note\img\3.png)

模板字符串中可以**调用函数**

```js
const fn = ()=>{
	return '我是fn函数'
}
let html = `我是模板字符串${fn()}`;
console.log(html);
```

#### 实例方法startsWith()和endsWith()

- startsWith(): 表示参数字符串是否在原字符串的头部，返回布尔值
- endsWith():表示参数字符串是否在原字符串的尾部，返回布尔值

```js
let str = 'hello world!';
str.startsWith('hello'); //true
str.endsWith('!'); //true
```

#### 实例方法repeat()

repeat方法表示将原字符串重复n次，返回一个新字符串

```js
console.log("y".repeat(5));
```

### 对象方法扩展

#### Object.is() 

判断两个值是否完全相等

```
console.log(Object.is(120,120));	
//作用和===很像 但是判断两个NAN是否相等时，is方法返回的true但是全等号返回的是false
```

#### Objcet.assign() 

对象的合并

```js
const conf1 = {
	host:'localhost',
	port:3306,
	name:'root',
};
const conf2 = {
	host:'localhost3',
	port:33064,
	name:'root3',
}
Object.assign(conf1,conf2);
//取并集，一样的属性第二个覆盖第一个
```

#### Object.setPrototypeOf() 

设置原型对象

```js
const school = {
	name:'zhang'
}
const cities = {
	xiaoqu:['beijing','shanghai']
}
Object.setPrototypeOf(school.cities);
console.log(Object.getPrototypeOf(school));	//获取原型对象
```



### Set数据结构

ES6提供了新的数据结构Set。它类似于数组，但是成员的值都是唯一的，没有重复的值

Set本身是一个构造函数，用来生成Set数据结构

```js
const s1 = new Set();
console.log(s1.size);	// 0
const s2 = new Set(["a","b"]);
console.log(s2.size); // 2
```

**利用Set结构可以做数组去重**

因为set集合具有唯一性，它会自动将重复的值去除

```js
const s3 = new Set(["a","a","b","b"]);
console.log(s3.size); //2    去重了
const ary = [...s3];	//通过扩展运算符将set结构转换成以逗号分隔的零散量
console.log(ary);
```

**求交集**

```js
let arr = [1,2,3,4,5,4,3,2];
let arr2 = [4,5,6,7];
let result = [...new Set(arr)].filter(item=>new Set(arr2).has(item));
```

**求并集**

```js
let result = [...new Set([...arr,...arr2])];
```

**求差集**

```js
let diff = [...new Set(arr)].filter(item=>!new Set(arr2).has(item));
```



#### Set实例方法

- add(value):添加某个值，返回Set结构本身
- delete(value):删除某个值，返回一个布尔值表示删除是否成功
- has(value):返回一个布尔值，表示该值是否为Set的成员
- clear():清除所有成员，没有返回值

```js
const s = new Set();
s.add(1).add(2).add(3);
s.delete(2);
s.has(2);
s.clear();
console.log(s.size()); // 0
```

#### 遍历

Set结构的实例与数组一样，也拥有forEach()方法，用于对每个成员执行某种操作，没有返回值

```js
const s = new Set(['a','b','c']);
s.forEach((item)=>{
	console.log(item);
})
```

### Symbol数据类型

#### Symbol与Symbol.for()

ES6引入了一种新的原始数据类型**Symbol**，表示独一无二的值，是JS语言的第七种数据类型，是一种类似于字符串的数据类型。

- Symbol的值是唯一的，用来解决命名冲突的问题
- Sybol的值不能与其它数据进行与逆行
- Symbol定义的对象属性不能使用for...in...循环遍历，但是可以使用**Reflect.ownKeys**来获取对象的所有键名

```js
let s = Symbol('zhang');
let s2 = Symbol('zhang');
console.log(s2 === s3);	//false,它们的地址是不一样的
//创建Symbol的第二种方式
// 全局符号注册表的方式
let s3 = Symbol.for('zhang');
let s4 = Symbol.for('zhang');
console.log(s3 === s4); //true
```

如果我们要重复使用一个 symbol 时，可以用到 Symbol.for() 方法。Symbol.for() 方法接受一个字符串参数，会在全局中搜索有没有以该参数命名的 symbol 的值，如果查找到就返回这个值。如果没有查到则重新生成一个值，并将该值以参数名称注册到全局。

Symbol.for() 和 Symbol() 方法都会生成新的 symbol 类型的值，不同的是 Symbol.for() 方法会查找命名参数是否在全局中注册过，如果注册过的就不会创建新的值，而是会直接返回，所以我们可以使用到相同的 symbol 值。但使用 Symbol() 方法每次都会创建一个新的值，且不会注册到全局。

**JS的几种数据类型：**

undefined , string , symbol , object, null, number, boolean

#### Symbol使用场景

来给对象添加属性和方法，表示独一无二的

当直接给对象中添加方法中，有没有这个方法不确定，所以有风险，需要看结构再决定命名。用Symbol会变得更简单安全。

```js
//向对象中添加方法 up down
let game = {
	...
}
//声明一个对象
let methods = {
	up:Symbol(),
	down:Symbol()
}
game[methods.up] = function(){
    console.log('我是上');
}
game[methods.down] = function(){
    console.log('我是下');
}
game[methods.up](); 	// 我是上
//另一种方法
let youxi = {
    name:"kill",
    [Symbol('say')]:function(){
        console.log("shuo")
    },
    [Symbol('zibao')]:function(){
        console.log('zibao');
    }
}
```

#### Symbol.keyFor()

Symbol.keyFor() 方法表示获取一个 symbol 的值在全局中注册的命名参数 key，只有使用 Symbol.for() 创建的值才会有注册的命名参数，使用 Symbol() 生成的值则没有：

```js
let s4 = Symbol('sym');
let s5 = Symbol.for('sym');
Symbol.keyFor(s4); // undefined
Symbol.keyFor(s5); // sym
```

#### Symbol.hasInstance

Symbol.hasInstance 指向一个内部方法，当使用 instanceof 运算符时，判断一个实例是否为某种类型时，会调用这个内部方法。

例如在调用：foo instanceof Foo 时，实际是调用 FooSymbol.hasInstance;

```js
class Foo {
  [Symbol.hasInstance](foo){
    return foo instanceof Array;
  }
}
[1,2,3] instanceof new Foo(); // true

```

#### Symbol.isConcatSpreadable

该属性的值是一个布尔型，表示当调用 Array.prototype.concat() 方法时，是否可以展开。
Symbol.isConcatSpreadable的默认值为undefined

```js
let arr = [1,2,3];
arr.concat([4,5]); // [1, 2, 3, 4, 5]
//数组默认可以展开，当设置了Symbol.isConcatSpreadable = false
let arr = [1,2,3];
arr[Symbol.isConcatSpreadable] = false;
arr.concat([4,5]); // [Array(3), 4, 5]
```

#### Symbol.species

对象的 Symbol.species 属性指向一个构造函数，在创建衍生对象可以更改构造函数指向。

```JS
class MyArr extends Array{}
let a = new MyArr(1,2,3);
let b = a.filter(e => e >= 2);
a instanceof MyArr; // true
b instanceof MyArr; // true
```

其中变量 b 是变量 a 的衍生对象，变量 b 也是 MyArr 的实例，而通过设置 Symbol.species 可以更改这个衍生对象的构造函数：

```JS
class MyArr extends Array{
    static get [Symbol.species](){
        return Array;
    }
}
let a = new MyArr(1,2,3);
let b = a.filter(e => e >= 2);
a instanceof MyArr; // true
b instanceof MyArr; // false
```

实际上，默认的 Symbol.species 属性等同：

```JS
static get [Symbol.species]() {
  return this;
}
```

总之该属性实在实例运行过程中，需要再次调用自身构造函数时，可以使用指定的构造函数。

#### Symbol.match

该属性指向一个函数，当执行 str.match(object) 时，如果该属性存在，会调用该属性指向的方法：

```JS
let str = 'e';
class StrObj {
  [Symbol.match](string){
      return 'hello'.indexOf(string);
  }
}
str.match(new StrObj()); // 1
// 等同于
new StrObj()[Symbol.match](str); // 1
```

#### Symbol.replace

该属性指向一个方法，当对象被 String.prototype.replace 方法调用时，会执行该方法：

```JS
String.prototype.replace(searchValue, replaceValue)
// 等同于
searchValue[Symbol.replace](this, replaceValue)
```

#### Symbol.search

对象的 Symbol.search 属性，指向一个方法，当该对象被String.prototype.search 方法调用时，会返回该方法的返回值。

```JS
String.prototype.search(regexp)
// 等同于
regexp[Symbol.search](this)
```

#### Symbol.split

对象的 Symbol.split 属性，指向一个方法，当该对象被 String.prototype.split 方法调用时，会返回该方法的返回值。

```JS
String.prototype.split(separator, limit)
// 等同于
separator[Symbol.split](this, limit)
```

#### Symbol.iterator

对象的 Symbol.iterator 属性，指向该对象的默认遍历器方法。

```JS
const myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};

[...myIterable] // [1, 2, 3]
```



### 迭代器

迭代器是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署Iterator接口，就可以完成遍历操作。ES6创造了一种新的遍历命令for...of...循环，Iterator接口主要供for...of消费

原生具备iterator接口的数据（可用for of遍历）

- Array
- Arguments
- Set
- Map
- String
- TypedArray
- NodeList

```js
const xiyou = ['唐僧','孙悟空','猪八戒'];
//使用for...of遍历数组
for(let v in xiyou){
	console.log(v); // 0 1 2 输出的是键名
}
for(let v of xiyou){
	console.log(v); //唐僧，孙悟空，猪八戒 输出的是键值
}
```

只要对象里有Symbol(Symbol.interator)属性，就可以使用for...of...遍历数组

#### 工作原理

1. 创建一个指针对象，指向当前数据结构的起始位置
2. 第一次调用对象的next方法，指针自动指向数据结构的第一个成员
3. 接下来不断调用next方法，指针一直在往后移动，直到指向最后一个成员
4. 每调用next方法返回一个包含value和done属性的对象

**注：**需要自定义遍历数据的时候，要想到迭代器

#### 迭代器的应用

```js
const banji = {
	name:"一班",
	stus:[
	'xiaoming',
	'xiaoli',
	'xiaohong',
	'xiaomei'
	]
}
//遍历这个对象
for(let v of banji){
	console.log(v);	//error!banji is not iterable
}
```

object没有iterator,所以不支持for...of,要给对象写一个接口才可以使用for...of遍历

```js
//相当于迭代器原理
[Symbol.iterator](){
	let index = 0;
	let that = this;	//也可以使用箭头函数
	return {
	next:function(){
		if(index<that.stus.length){
			const result =  {value:that.stus[index],done:false};
		//下标自增
		index++;
		return result;
		}else{
			return {value:undefined,done:true};
		}
	}
	};
}
```

### 生成器

生成器函数是ES6提供的一种异步编程解决方案，语法行为与传统函数完全不同

生成器其实就是一个特殊的函数，之前的异步编程是利用纯回调函数

```js
function *gen(){
	console.log("hello gennerator")
}
let iterator = gen();
iterator.next();
```

声明和执行都比较特殊

可以出现`yield`语句，相当于函数代码的分隔符，把函数代码切割成几块

```js
function *gen(){
	console.log("111");
    yield'第一个';
    console.log("222");
    yield'第二个';
    console.log("333");
    yield'第三个';
    console.log("444");
    yield'第四个';
}
let iterator = gen();
iterator.next();
iterator.next();
iterator.next();
iterator.next();
```

执行结果

![6](D:\web前端\ES6 note\img\6.png)

```js
function *gen(){
    yield'第一个';
    yield'第二个';
    yield'第三个';
}
for(let v of gen()){
    console.log(v);
}
//输出结果为yield后面的值：
//第一个
//第二个
//第三个
```

```js
function *gen(){
    yield'第一个';
    yield'第二个';
    yield'第三个';
}
let iterator = gen();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
```

结果：

![7](D:\web前端\ES6 note\img\7.png)

#### 生成器函数参数

```js
function *gen(arg){
	console.log(arg);
	let one = yield 111;
    console.log(one);
	let two = yield 222;
    console.log(two);
	let three = yield 333;
    console.log(three);
}
//执行获取迭代器对象
let iterator = gen('AAA');
//next方法可以传入实参
console.log(iterator.next());
console.log(iterator.next('BBB'));
//第二次next方法传入的参数将作为第一个yield语句整体返回结果
console.log(iterator.next('CCC'));
////第三次next方法传入的参数将作为第二个yield语句整体返回结果
console.log(iterator.next('DDD'));
////第四次next方法传入的参数将作为第三个yield语句整体返回结果
```

![8](D:\web前端\ES6 note\img\8.png)

#### 生成函数实例

演示生成器函数在异步编程中的表现

```js
//1s后控制台输出111，2s后输出222，3s后输出333
//但这样会形成回调地狱
setTimeout(()=>{
    console.log(111);
    	setTimeout(()=>{
   		console.log(222);
   			setTimeout(()=>{
   			console.log(333); 
		},3000);
	},2000);
},1000);
```

通过生成器函数实现

```js
function one(){
	setTimeout(()=>{
		console.log(111);
        iterator.next();
	},1000)
}
function two(){
	setTimeout(()=>{
		console.log(222);
        iterator.next();
	},2000)
}
function three(){
	setTimeout(()=>{
		console.log(333);
        iterator.next();
	},3000)
}
function * gen*(){
    yield one();
    yield two();
    yield three();
}
//调用生成器函数
let iterator = gen();
iterator.next();
```

**生成器函数实例二**

模拟获取 用户数据  订单数据  商品数据

每隔1s依次打印

```js
function getUsers(){
	setTimeout(()=>{
		let data = '用户数据';
        iterator.next(data);
	},1000);
}
function getOrders(){
	setTimeout(()=>{
		let data = '订单数据';
         iterator.next(data);
	},1000);
}
function getGoods(){
	setTimeout(()=>{
		let data = '商品数据';
        iterator.next(data);
	},1000);
}
function *gen(){
	let users = yield getUsers();
    console.log(users);
    let orders = yield getOrders();
    console.log(orders);
  	let goods = yield getGoods();
    console.log(goods)
}
//调用生成器函数
let iterator = gen();
iterator.next();
```

这就是生成器函数在异步任务的一个表现

### Promise

ES6引入的异步编程的新解决方案。语法上Promise是一个构造函数，用来封装异步操作并可以获取其成功或失败的结果

```js
//实例化Promise对象
const p = new Promise(function(resolve,reject){
	setTimeout(function(){
	// 异步操作
	let data = '数据库中用户数据';
        //调用resolve函数：成功
        resolve(data);
        //调用完resolve之后，这个promise对象的状态就会变成成功
        //对象有三个状态，一个是初始化，一个是失败，一个是成功
    
        //调用reject：失败
    let err = '数据读取失败';
    reject(err);
	},1000);
});
//调用promise对象的then方法
p.then(function(value){
	//状态为成功调用这个
    console.log(value);
},function(reason){
    //状态为失败调这个
    console.errpr(reason);
})
```

通过这个方式把异步任务封装在了Promise对象里面，而且通过resolve和reject这两个函数来改变它的状态，改变之后来调用then方法里面的回调，倘若成功调用里面的第一个回调函数，若是失败调用第二个回调函数

#### Promise案例

1.使用Promise封装读取文件

不用Promise实现：

**注：**使用node.js需要下载相关环境，且在js文件中打开终端，输入node 文件路径，才能运行，具体fs模块相关，在async模块有解释

```js
//这里用到了node.js的相关知识
const fs = require('fs');
//引入fs模块
//调用方法读取文件
fs.readFile('./为学.md',(err,data)=>{
	//如果失败则抛出错误
	if(err) throw err;
	//如果没有出错，则输出内容
	console.log(data.toString());
})
```

使用Promise实现：

```js
//这里用到了node.js的相关知识
const fs = require('fs');
const p = new Promise(function(resolve,reject){
	fs.readFile('./为学.md',(err,data)=>{
		//判断如果失败
		if(err) reject(err);
		//如果成功
		resolve(data);
	});
});
p.then(function(value){
	console.log(value.toString());
	
},function(reason){
	console.log("读取失败");
});
```

#### Promise封装ajax

不用Promise实现：

```js
	//接口地址: https://api.apiopen.top/getJoke
		//创建对象
		const xhr = new XMLHttpRequest();
		//初始化
		xhr.open("GET","https://api.apiopen.top/getJoke");
		//发送
		xhr.send();
		//绑定事件，处理响应结果
		xhr.onreadystatechange =  function(){
			//判断
			if(xhr.readyState === 4){	// 等于4说明了所有的响应体都已经回来了
				//判断响应状态码 200-299
				if (xhr.status >=200 && xhr.status < 300){
					//表示成功
					console.log(xhr.response);
				}else{
					//如果失败
					console.error(xhr.status);
				}
			}
		}
```

使用Promise封装：

```js
		const p = new Promise((resolve,reject)=>{
			
		//创建对象
		const xhr = new XMLHttpRequest();
		//初始化
		xhr.open("GET","https://api.apiopen.top/getJoke");
		//发送
		xhr.send();
		//绑定事件，处理响应结果
		xhr.onreadystatechange =  function(){
			//判断
			if(xhr.readyState === 4){	// 等于4说明了所有的响应体都已经回来了
				//判断响应状态码 200-299
				if (xhr.status >=200 && xhr.status < 300){
					//表示成功
					resolve(xhr.response);
				}else{
					//如果失败
					reject(xhr.status);
				}
			}
		}
		})
		//指定回调
		p.then(function(value){
			console.log(value);
		},function(reason){
			console.error(reason);
		});
```

#### then方法

```js
const result = p.then(value => {
			console.log(value)
			//1.非promise类型的属性
			//return '成功的值';
			//2.是promise对象
			//return new Promise((resolve,reject)=>{
			//	resolve('ok');
			//});
			//3.抛出错误
			//throw new Error('出错啦'); 也是返回错误状态
		},reason=>{
			console.warn(reason);
		})
		console.log(result);
		//因为回调函数有延迟，所以先打印出result再打印出"出错啦"
		
		//链式调用,可以杜绝回调地狱
		p.then(value=>{
			
		}).then(value=>{
			
		})
```

#### Promise实现读取多个文件

原始方式

```js
//原始方式 引入fs模块
const fs = require("fs");

fs.readFile('./为学.md',(err,data1)=>{
	fs.readFile('./观书.md',(err,data2)=>{
		fs.readFile('./劝学.md',(err,data3)=>{
			let result = data1 +data2+data3;
			console.log(result);
		});
	});
});
```

使用Promise实现

```js
//使用promise实现
const p = new Promise((resolve,reject)=>{
	fs.readFile('./为学.md',(err,data)=>{
		resolve(data);
	});
});
p.then(value=>{
	return new Promise((resolve,reject)=>{
		fs.readFile('./观书.md',(err,data)=>{
		resolve([value,data]);
	});
	})
}).then(value => {
	return new Promise((resolve,reject)=>{
		fs.readFile('./劝学.md',(err,data)=>{
		//压入
		value.push(data);
		resolve(value)
	});
	})
}).then(value=>{
	console.log(value.join('\r\n'));
});
```

#### Promise对象catch方法

用来指定Promise对象失败的一个回调

```js
	const p = new Promise((resolve,reject)=>{
			setTimeout(()=>{
				//设置p对象的状态为失败，并设置失败的值
				reject("error!");
			},1000)
		});
	
		// p.then(function(value){},function(reason){
		// 	console.error(reason);
		// });
		p.catch(function(reason){
			console.warn(reason);
		})
//这个与注释部分达成的效果一样
```

### Map数据结构

ES6提供了Map数据结构，它类似于对象，也是键值对的集合，但是键的范围不限于字符串，各种类型的值（包括对象）都可以当作键。Map也实现了iterator接口，所以可以使用**扩展运算符**和**for...of...**进行遍历

- size：返回Map的元素个数
- set：增加一个新元素，返回当前Map
- get：返回键名对象的键值
- has：检测Map里是否包含某个元素。返回bool值
- clear清空集合，返回undefined

```js
let m = new Map();
m.set('name','zhang');
m.set('change',function(){
	console.log('改变');
});
```

第一个键名：name，值为zhang

再增加一个键

```js
let key = {
	school:'lu'
};
m.set(key,['beijing','shanghai']);
```

打印结果

![5](D:\web前端\ES6 note\img\5.png)

```js
m.delete('name');//删除
m.get(key);//获取
console.log(m.get('change'));
```

**遍历与清空**

```js
for(let v of m){
	console.log(v);
}
m.clear();
```

### class中get和set设置

```js
let _price = 1;
class Phone(){
	get price(){
		console.log("price属性被读取了");
		return _price;
	}
	set price(newVal){
		console.log('价格属性被修改了');
        _price = newVal;	//赋值操作
	}
}
//实例化对象
let s = new Phone();
s.price = 'free'; //当更改s的price属性时，触发set price，控制台输出：价格属性被更改了
console.log(s.price); 
//当获取s的price属性，触发get price，控制台输出 price被读取了并打印出get price中return的值——即为_price值
s.price = 2;
console.log(s.price);//固定从_price读取值，但是可以通过在set里增加赋值操作通过改变_price来改变s.price

```

### async和await

async和await两种语法结合可以让异步代码像同步代码一样

#### async函数

1. async函数的返回值为promise对象
2. promise对象的结果由async函数执行的返回值决定

```js
async function fn(){
//返回一个字符串，一个数字，null，undefined等等，只要返回的结果不是一个promise类型的对象，则结果就是一个成功的promise对象
		 return 'yes';
	}
		const result = fn();
		console.log(result);
```

PromiseStatus 变成fulfilled和resolved意思差不多

![](D:\web前端\ES6 note\img\9.png)

```js
async function fn(){
//抛出错误，返回的结果是一个失败的promise
			throw new Error('出错啦');
	}
		const result = fn();
		console.log(result);
```

![10](D:\web前端\ES6 note\img\10.png)

```js
//如果返回的结果是一个Promise对象（通常是这种情况）
async function fn(){
		return new Promise((resolve,reject)=>{
				resolve('成功的数据');
			});
}
```

调用resolve之后，这个对象就会变成一个成功的promise，一旦里面成功,fn返回的结果也是成功的，且它成功的值就是函数返回的promise成功的值。

```js
async function fn(){
		return new Promise((resolve,reject)=>{
				reject('失败错误');
			});
}
```

失败同理，调用reject，这个对象就会变成一个失败的promise，里面失败，fn返回的结果也是失败的，且他失败的值就是函数返回的promise失败的值。

![11](D:\web前端\ES6 note\img\11.png)

``` js
//调用then方法
async function fn(){
			return new Promise((resolve,reject)=>{
				resolve('成功的数据');
				//reject('失败错误');
			});
		}
		const result = fn();
		//调用then方法
		result.then(value=>{
			console.log(value);
		},reason=>{
			console.warn(reason);
		})
```

第一个为成功时的结果，第二个为失败时返回的结果

![12](D:\web前端\ES6 note\img\12.png)

#### await表达式

- await必须写在async函数中

- await右侧的表达式一般为promise对象
- await返回的是promise成功的值
- await的promise失败了，就会抛出异常，需要通过try...catch捕获处理

```js
//创建promise对象	
const p = new Promise((resolve,reject)=>{
			//resolve("成功的值");
			reject("失败啦");
		})
		//await返回的结果就是promise对象成功的值
		async function main(){
			try{
				let result = await p;
				console.log(result);
			}catch(e){
				//再catch里得到失败的结果并进行一些处理
				console.log(e);	
			}
			
		}
		main();
```

**注：**await必须放在async中，但async函数中可以没有await

打印结果：

![13](D:\web前端\ES6 note\img\13.png)

#### async和await结合实践

**async和await结合读取多个文件内容**

依旧利用node.js的fs模块实现

**注：**fs时filesystem的缩写，该模块提供本地文件的读写能力，基本上时POSIX文件操作命令的简单包装。但是，这个模块几乎对所有操作提供异步和同步两种操作方式，供开发者选择。

readFile方法的第一个参数是文件的路径，第二个参数是读取完成后的回调函数，该函数的第一个参数是发生错误时的错误对象，第二个参数是代表文件内容的Buffer实例（故需要toString来转化）。

```js
	//引入fs模块
			const fs = require("fs");

			//读取 为学 
			function readweixue() {
				return new Promise((resolve, reject) => {
					fs.readFile("./为学.md", (err, data) => {
						//失败
						if (err) reject(err);
						//成功
						resolve(data);
					})
				})
			}
			//读取 观书
			function readguanshu() {
				return new Promise((resolve, reject) => {
					fs.readFile("./观书.md", (err, data) => {
						//失败
						if (err) reject(err);
						//成功
						resolve(data);
					})
				})
			}
			//读取 劝学
			function readquanxue() {
				return new Promise((resolve, reject) => {
					fs.readFile("./劝学.md", (err, data) => {
						//失败
						if (err) reject(err);
						//成功
						resolve(data);
					})
				})
			}
			//声明一个async函数
			async function main() {
				//获取为学内容
				let weixue = await readweixue();
				//获取劝学内容
				let quanxue = await readquanxue();
				//获取观书内容
				let guanshu = await readguanshu();
				console.log(weixue.toString());
				console.log(quanxue.toString());
				console.log(guanshu.toString());
			}
			main();
```

**async和await结合封装Ajax请求**

```js
	//发送AJAX请求，返回的结果是Promise对象
	function sendAJAX(url) {
		return new Promise((resolve, reject) => {
			//1.创建对象
			const x = new XMLHttpRequest();
	
			//2.初始化
			x.open('GET', url)
	
			//3.发送请求
			x.send();
	
			//4.事件绑定
			x.onreadystatechange = function() {
				if (x.readyState === 4) {
					if (x.status >= 200 && x.status < 300) {
						//成功辣
						resolve(x.response);
					}else{
						//失败
						reject(x.status);
					}
				}
			}
		})
	}
	// promise then方法测试
	// sendAJAX("https://api.apiopen.top/getJoke").then(value=>{
	// 	console.log(value);
	// },reason=>{})
	//async 和await测试
	async function main(){
		//发送AJAX请求
		//函数返回是一个promise对象
		let result = await sendAJAX("https://api.apiopen.top/getJoke");
		console.log(result);
	}
```

