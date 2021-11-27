## webpack

### 如何解决作用域问题

```js
(function(){
		var myname = "xiaoming"
		})()
console.log(myname);//myname is not defined
```

```js
var result = (function(){
		var myname = "xiaoming";
		return myname;
	})()
console.log(result) // xiaoming
```



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

利用ES6新特性export和import

```js
//add.js
const add = (x,y) => {
	return x + y
}

export default add
```

```js
//minus.js
const minus = (x,y) => {
	return x - y
}

export default minus
```

```html
//index.html
<script type="module">
		//注：必须写上type为module，因为import不能再模块外部使用
		import add from './add.js'
		console.log(add(4,5))
		</script>
```

webpack可以让我们编写模块，而且支持任何的模块格式。

它可以打包js的应用程序，并且同时支持es的模块化以及commonjs，还可以扩展支持很多的而静态资源打包，比如图片等等。

webpack也有竞品:PARCEL以及rollup.js，以及vite

PARCEL无需做其它的配置，开箱即用

rollup.js用标准化的格式来编写代码，比如es6，通过减少无用的代码来尽量减少包的体积，一般只能用来打包js。因此如果想要构建一个简单的应用，那你可以使用PARCEL。

如果想要构建一个类库，只需要导入很少的第三方库，那可是使用rollup。

如果像构建一个复杂的应用，集成很多第三方的库，还要拆分代码，使用静态资源文件，还要支持common.js，esmodule等，那就只能是webpack了

Vite是一匹黑马，再vue3生态演讲中，尤雨溪提出了Vite将称为Vue的现代标配。Vite是基于esmodule的构建方式，日益受到青睐，不仅可以按需编辑，热模块的更新等等，他还有其它的丝滑体验和vue3的完美结合。它和webpack各有各的使用场景。

### webpack的安装

**全局安装：**

参考文章：https://blog.csdn.net/weixin_42878211/article/details/106897268

终端直接进入项目目录：输入`webpack` 就可以打包

**局部安装：**

先安装npm的包管理的配置文件

```
npm init -y
```

这样会在项目目录里产生一个`package.json`

安装webpack以及webpack-cli

```
npm install webpack webpack-cli --save-dev
```

安装完成后，在本地工作目录下面，就安装好了两个包。node_modules里面都是依赖的包包含了wepack的包。package-lock.json里表示当前两个包的一些依赖，不要修改这些文件

此时打包不能直接用webpack了，要用一个新工具——npx

npx作用是可以观察当前文件夹里有没有你想要去运行的这个命令，如果没有就回去找上一层目录,直到找到

```
npx webpack
```

结果和全局安装webpack执行webpack命令一样

### 自定义webpack配置

```
npx webpack --entry ./src/index.js --mode production
```

自定义入口文件为index.js文件，并设置为生产环境

命令行不方便不直观，而且不能保存这些配置，因此webpack还提供了通过一个配置文件来自定义配置参数的能力

#### 配置文件配置参数

在项目根目录创建一个新的文件，`webpack.config.js`这个文件名字不能随便取，因为这是webpack自动读取的

这个文件是在nodejs里运行的，所以定义模块时要用nodejs的Commenjs模块，所以使用`module.exports`去定义,把它的值赋值为一个对象，这是一个配置对象

```js
//引入nodejs模块
const path = require('path')
module.exports = {
	entry: './src/index.js', //入口
	
	output: {
		filename:'bundle.js',//输出文件名
		path:path.resolve(__dirname,'./dist')	//输出到的绝对路径
		//__dirname参数表示获取到当前webpack.config.js所在的物理路径
		//第二个参数表示基于第一个参数的路径再去找到解析到当前目录下的dist
	},
	mode: 'none'
}
```

打包后，在index.html里，引入打包好的bundle.js文件，成功输出hello，但这样打包后要自己修改html文件里引入的js文件，那可不可以让它自己引入不用人工修改呢？