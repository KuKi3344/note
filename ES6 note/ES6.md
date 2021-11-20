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

### Set数据结构

ES6提供了新的数据结构Set。它类似于数组，但是成员的值都是唯一的，没有重复的值

Set本身是一个构造函数，用来生成Set数据结构

```js
const s1 = new Set();
console.log(s1.size);	// 0
const s2 = new Set(["a","b"]);
console.log(s2.size); // 2
```

利用Set结构可以做数组去重

```js
const s3 = new Set(["a","a","b","b"]);
console.log(s3.size); //2    去重了
const ary = [...s3];	//通过扩展运算符将set结构转换成以逗号分隔的零散量
console.log(ary);
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

#### Symbol创建

ES6引入了一种新的原始数据类型**Symbol**，表示独一无二的值，是JS语言的第七种数据类型，是一种类似于字符串的数据类型。

- Symbol的值是唯一的，用来解决命名冲突的问题
- Sybol的值不能与其它数据进行与逆行
- Symbol定义的对象属性不能使用for...in...循环遍历，但是可以使用**Reflect.ownKeys**来获取对象的所有键名

```js
let s = Symbol('zhang');
let s2 = Symbol('zhang');
console.log(s2 === s3);	//false,它们的地址是不一样的
//创建Symbol的第二种方式
let s3 = Symbol.for('zhang');
let s4 = Symbol.for('zhang');
console.log(s3 === s4); //true
```

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

