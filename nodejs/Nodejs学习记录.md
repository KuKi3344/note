## Node.js学习记录

Node.js是一个基于Chrome V8引擎的JavaScript 运行环境

浏览器是JS的前端运行环境，而Node.js是JS的后端运行环境

Node.js中无法调用DOM和BOM等浏览器内置API

### fs模块

fs模块是Node.js提供的用来操作文件的模块，他提供了一些列的方法和属性，例如：

- fs.readFile()方法，用来读取指定文件中的内容
- fs.writeFile()方法，用来向指定文件中写入内容

只需要用如下方法导入就可以使用fs模块

```js
const fs = require('fs')
```

#### **fs.readFile()**方法

可以读取指定文件中的内容，格式如下

```js
fs.readFile(path[, options], callback)
```

参数一：必选参数，表示文件路径

参数二：可选参数，表示以什么编码格式来读取文件

参数三：文件读取完成后的回调函数

**实例：**

```js
//导入fs模块
const fs = require('fs');
fs.readFile('./1.txt','utf8',function(err,dataStr){
	console.log(err);
	console.log(dataStr);
})
```

参数一：读取文件的存放路径
参数二：读取文件时候采用的编码格式，默认是`utf8`
参数三：回调函数，拿到读取失败和成功的结果 `err`、`dataStr`

读取成功的话，err值为null,读取失败的话，err的值为一个错误对象，dataStr为undefined,所以**可以通过判断err对象是否为null来知晓文件读取的结果**

所以可以改进成如下：

```js
const fs = require('fs');
fs.readFile('./12.txt','utf8',function(err,dataStr){
	if(err){
		console.log('失败了，'+err.message)
		return;
	}else{
		console.log('文件读取内容是：'+ dataStr);
	}
})
//当读取不存在的文件时，输出 `失败了，ENOENT: no such file or directory, open 'D:\web前端\nodejs\12.txt`
//当读取文件存在时，输出 `文件读取内容是：第一次测试哦`
```

#### fs.writeFile()

可以向指定文件写入内容，语法格式如下：

```js
fs.writeFile(file,data[, options], callback)
```

- 参数一：必选参数，表示文件路径

- 参数二：必选参数，表示要写入的内容
- 参数三：可选参数，表示以什么格式写入，默认为`utf8`
- 参数四：必选参数，写入成功的回调函数

```js
const fs = require('fs')

fs.writeFile('./1.txt','我是KuKi!!','utf8',function(err){
	console.log(err)
})
//写入成功，err为null
//写入失败，err的值为一个错误对象
```

**稍加改进：**

```js
const fs = require('fs')

fs.writeFile('./2.txt','我是KuKi!!','utf8',function(err){
	if(err){
		console.log('文件写入失败'+ err.message);
		return;
	}else{
		console.log('写入成功')
	}
})
```

**练习：考试成绩整理**

**步骤：**

- 导入fs模块
- 读取成绩文件
- 判断是否读取成功
- 处理数据
- 处理后重新写入新文件中

```js
const fs = require('fs');
let url = './grade.txt'
let url2 = './grade_new.txt'
fs.readFile(url,'utf8',function(err,data){
	if(err){
		console.log('读取失败'+err.message);
	}else{
		let arr = data.split(' ');
        //将字符串通过空格分割成数组
		let arrnew = [];
		arr.forEach(item=>{
			arrnew.push(item.replace('=',':'));
		})
		const result = arrnew.join('\r\n');
        //将数组转换成用\r\n相连接的字符串
		console.log(result);
		fs.writeFile(url2,result,'utf8',function(err){
			if(err){
				console.log('写入失败'+err.message);
			}else{
				console.log('写入成功')
			}
		})
	}
})
```

##### **关于路径问题**

由于fs模块操作文件时，用相对路径可能会出现路径动态拼接错误的问题，代码执行时，会以执行node命令时所处的目录，动态拼接被操作文件的完整路径，就可能会导致路径错误。所以就需要绝对路径，防止动态拼接的问题，但是直接写绝对路径维护性过差，这时候就需要用到`__dirname`

`__dirname`表示当前的文件所处目录

经过修改，变成如下：

```js
const fs = require('fs');
let url = __dirname + '/grade.txt'
let url2 =  __dirname + '/grade_new.txt'
fs.readFile(url,'utf8',function(err,data){
	if(err){
		console.log('读取失败'+err.message);
	}else{
		let arr = data.split(' ');
		let arrnew = [];
		arr.forEach(item=>{
			arrnew.push(item.replace('=',':'));
		})
		const result = arrnew.join('\r\n');
		console.log(result);
		fs.writeFile(url2,result,'utf8',function(err){
			if(err){
				console.log('写入失败'+err.message);
			}else{
				console.log('写入成功')
			}
		})
	}
})
```

此时就可以不用担心文件路径拼接出错，自由读取存取文件啦

### path路径模块

path模块是Node.js官方提供的用来处理路径的模块。

例如：

- `path.join()`方法，用来将多个路径片段拼接成一个完整的路径字符串。之前拼接用的是`+`，但是不太正规，可以用join拼接

- `path.basename()`方法，用来从路径字符串中，将文件名解析出来

如果要使用path模块，需要先导入

```js
const path = require('path')
```

#### path.join()

使用此方法，可以把多个路径片段拼接成完整的路径字符串

```js
path.join([...paths])
```

- ...paths<string> 路径片段序列
- 返回值<string>

例如：

```js
const pathStr = path.join('a','/b/c','../','./d','e')
console.log(pathStr) //输出 \a\b\d\e

const pathStr2 = path.join(__dirname,'./1.txt')
```

#### path.basename()

使用path.basename()方法可以获取路径中的最后一部分，经常通过这个方法获取路径中的文件名，格式如下：

```js
path.basename(path[, ext])
```

```js
const fpath = '/a/v/c/index.html'
var fullName = path.basename(fpath)
console.log(fullName) // index.html
var nameWithoutExt = path.basename(fpath,'.html')
console.log(nameWithoutExt)
```

#### path.extname()

使用此方法可以获取路径中扩展名部分

```js
path.extname(path)
```

path <string> 必选参数，表示路径的字符串

返回:<string> 拓展名部分

```js
const path = 'a/b/c/index.html'
const fext = path.extname(path)
console.log(fext) // 输出 .html
```

**练习：实现时钟样例**

目的：将素材目录下的index.html页面，拆分成三个文件，分别是：index.css,index.js,index.html。并将拆分出来的三个文件，存放到clock目录中。

**步骤：**

- 创建正则表达式用来匹配<script><style>标签
- 使用fs模块，去读需要被处理的HTML文件
- 自定义resolveCSS方法，来写入index.css样式文件
- 自定义resolveJS方法，来写入index.js 脚本文件
- 自定义resolveHTML方法，来写入index,html文件

**实现：**

```js
const fs = require('fs');
const path = require('path');
//定义正则
const regStyle = /<style>[\s\S]*<\/style>/;
const regScript = /<script>[\s\S]*<\/script>/;
fs.readFile(path.join(__dirname,'./index.html'),'utf8',(err,data)=>{
	if(err){
		console.log('读取失败'+err.message);
		return;
	}
	let url = path.join(__dirname,'./dist');
	 if(!fs.existsSync(url)){
		fs.mkdirSync(url);
	}
	resolveCSS(data);
	resolveJS(data);
	resolveHTML(data);
})

var resolveCSS = function(data){
	let css = regStyle.exec(data);
	const newCSS = css[0].replace('<style>','').replace('</style>','');
	fs.writeFile(path.join(__dirname,'./dist/index.css'),newCSS,err=>{
		if(err){
			console.log('写入CSS错误',+err.message);
			return;
		}
		console.log('写入CSS样式成功');
	})
}

var resolveJS = function(data){
	let js = regScript.exec(data);
	const newJS = js[0].replace('<script>','').replace('</script>','');
	fs.writeFile(path.join(__dirname,'./dist/index.js'),newJS,err=>{
		if(err){
			console.log('写入JS错误',+err.message);
			return;
		}
		console.log('写入JS样式成功');
	})
}

var resolveHTML = function(data){
	let css = regStyle.exec(data);
	let js = regScript.exec(data);
	const newHTML = data.replace(js,'<script src="./index.js"></script>').replace(css,'<link rel="stylesheet" type="text/css"  href="./index.css">');
	fs.writeFile(path.join(__dirname,'./dist/index.html'),newHTML,err=>{
		if(err){
			console.log('写入HTML错误',+err.message);
			return;
		}
		console.log('写入HTML成功')
	})
}

```

(等以后有时间用promise.all实现一次orz)

