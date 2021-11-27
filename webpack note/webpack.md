## webpack

### webpack五个核心概念

#### Entry入口

入口指示webpack以哪个文件为入口起点开始打包，分析构建内部依赖图

#### Output输出

输出指示webpack打包后的资源bundles输出到哪里去，以及如何命名

#### Loader

loader让webpack能够去处理那些非js文件（webpack自身只理解js），相当于转换器

#### Plugins

插件可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量等。

#### Mode

模式Mode指示webpack使用相应模式的配置

| 选项        | 特点                       |
| ----------- | -------------------------- |
| development | 能让代码本地调试运行的环境 |
| production  | 能让代码优化上线运行的环境 |

### 如何解决代码拆分问题

commonjs引入了一个require机制，它允许在当前文件中加载使用某个模块，导入需要的模块

math.js

```js
const add = (x,y) => {
	return x + y
}

const minus = (x,y) =>{
	return x - y
}

module.exports = {
	add,
	minus
}
//将这两个函数暴露出去
```

server.js

```js
const math = require('./math.js')
console.log(math.add(4,5))
```

在服务端运行（利用node运行），结果正常输出，但是在浏览器上却失效了

#### 如果让浏览器支持模块

利用requirejs打包工具编写能在浏览器中运行commonjs中模块的代码

```js
//add.js
const add = (x,y) => {
	return x + y
}

define([],function(){
	return add
})//第一个是这个模块依赖的模块
```

```js
//minus.js
const minus = (x,y) =>{
	return x - y
}


define([],function(){
	return minus
})//第一个是这个模块依赖的模块
```

```js
//main.js
require(['./add.js','./minus.js'],function(add,minus){	//这里的路径是相对于index.html的路径
	console.log(add(4,5));
})
```

```html
<!--index.html-->
<script src="https://cdn.bootcdn.net/ajax/libs/require.js/2.3.6/require.js"
		data-main="./main.js"
		></script>
		<!-- data-main表示我们加载一个入口的js文件,是require提供的规范 -->
```

