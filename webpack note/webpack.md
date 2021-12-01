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

如果像构建一个复杂的应用，集成很多第三方的库，还要拆分代码，使用静态资源文件，还要支持common.js，esmodule等，那就只能是webpack了。webpack只能理解js和json这样的文件

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

**注意**：以下所有指令一定要cd到你的根目录执行，不然会一直报错，报错的时候一定要先看看自己有没有进到项目根目录的终端

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

### 插件plugins

#### HtmlWebpackPlugin

可以实现html文件的自动生成

安装：

```
npm install html-webpack-plugin -D
```

```js
//webpack.config.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
	entry: './src/index.js', //入口
	
	output: {
		filename:'bundle.js',//输出文件名
		path:path.resolve(__dirname,'./dist')		},
	mode: 'none',
	plugins :[
		//插件使用需要引入并实例化
		new HtmlWebpackPlugin()
	]
}
```

这样在dist文件里，就会多出一个index.html文件，是插件自动生成的文件，自动引入了打包好的资源，并且运行后，可以正常输出hello。

但生成的index.html和我们自己写的index.html没有关系，那么能不能让生成的依据我们之前所写的生成呢

配置插件option选项

将plugins里面的option改成如下

```js
//webpack.config.js
plugins :[
		//插件使用需要引入并实例化
		new HtmlWebpackPlugin({
			template: './index.html',	//模板
			filename: 'app.html',//输出文件名
			inject:'body' //这样打包好的js文件就会在body里引入而不是head里引入
		})
	]
```

#### 清理dist

```js
output: {
		filename:'bundle.js',//输出文件名
		path:path.resolve(__dirname,'./dist')
		clean:true
	},
```

只要在output里加入`clean:true`就可以实现自动清理上一次打包文件

### source map

```js
//在webpack.config.js中添加如下
devtool:'inline-source-map',
```

这样会使打包好的js文件显示的是你本来写的代码，而不是看不懂的代码，具体之后会详细说

### 使用watch mode观察模式

```
npx webpack --watch
```

当更改代码保存时，终端自动重新打包

### webpack-dev-server

`webpack-dev-server `提供了一个基本的web server，并且具有live reloading（实时重新加载）功能。当页面修改了编译之后，浏览器会侦听到我们文件的修改来实现自动刷新

安装：

```
npm install webpack-dev-server -D
```

在webpack.config.js中添加

```js
devServer:{
		static:'./dist'
	}
```

这个目录选定的是跑在服务器上的文件目录

终端输入命令:

```
npx webpack-dev-server
```

文件就跑在服务器上了，并且当你修改文件时会自动刷新

![1](D:\web前端\webpack note\img\1.png)

其实webpack-dev-server 真正的没有输出任何的物理文件，他把输出的打包的bundle文件输出到了内存里。当我们把dist文件夹删掉再回去看浏览器，输出并没有任何问题。再hello.js文件里修改输出内容，浏览器依旧会刷新，输出的还是最新的内容

### 资源模块介绍

#### Resource资源

在`webpack.config.js`里的`module.exports`添加如下

```js
module:{
		rules:[
			{
				test:/\.jpg$/,//正则，表示以jpg为扩展名的文件
				type:'asset/resource'
			}
		]
	}
```

index.js如下

```js
import hello from './hello.js'
import imgsrc from './asset/viewdif.jpg'


hello();
const img = document.createElement('img')
img.src = imgsrc
document.body.appendChild(img)
```

打包后发现，页面上果然出现了图片，并且图片资源默认打包到了dist目录下，并且自动起好了文件名。那能不能自定义文件目录和文件名呢。

在output里加入新属性`assetModuleFilename`, 顾名思义就是资源模块的文件名和路径

```js
	output: {
		filename:'bundle.js',//输出文件名
		path:path.resolve(__dirname,'./dist'),
		clean:true,
		assetModuleFilename:'images/test.jpg'
	},
```

打包后，dist目录下自动生成images文件夹并且图片存在里面，为test.jpg

多文件下不可能所有文件都叫test.jpg，我们让它自动生成文件名，利用系统自带的默认的生成文件名的方法。

```js
assetModuleFilename:'images/[contenthash][ext]'
```

表示根据文件内容来生成一个哈希的字符串,并且使用原资源的扩展名，用ext来表示扩展名，除了在output里配置，也可以在module的rules里配置generator：

```js
module:{
		rules:[
			{
				test:/\.jpg$/,//正则，表示以jpg为扩展名的文件
				type:'asset/resource',
				generator:{
					filename:'images/[contenthash][ext]'
				},
				//也可以自定义打包的资源的路径和文件名，但generator的优先级高于assetModuleFilename
			}
		]
	}
```

#### asset inline

asset inline这个资源类型用于导出一个资源的Data url

```js
//webpack.config.js
module:{
		rules:[
			{
				test:/\.jpg$/,//正则，表示以jpg为扩展名的文件
				type:'asset/resource',
				generator:{
					filename:'images/[contenthash][ext]'
				},
				//也可以自定义打包的资源的路径和文件名，但generator的优先级高于assetModuleFilename
			},
			{
				test:/\.svg$/,
				type:'asset/inline'
			}
		]
	}
```

```js
//index.js
import logSvg from './asset/arrow-up.svg'
const img2 = document.createElement('img')
img2.style.cssText = 'width:200px;height:200px'
img2.src = logSvg
document.body.appendChild(img2)
```

打包后，dist的里没有导出的资源，因为我们使用的是`asset-inline`

在浏览器上显示正常，浏览器检查发现它不是一个图片的url，而是一个Data url。

#### 通用资源类型asset

在导出一个data url和发送一个单独的文件之间自动选择

`asset/resource`与`asset/inline`之间进行选择

在module的rules里面加入

```js
{	
			test:/\.png$/,
			type:'asset'
			}
```

打开浏览器看，图片以本地文件的形式出现。

默认情况下，webpack会去判断我们加载的资源大小，当这个资源文件大于8k，就会创建一个资源了，如果小于8k，就会作为inline生成一个base64的一个链接。那能不能自己调整这个临界值呢

把上面的代码修改成如下

```js
{	
				test:/\.png$/,
				type:'asset',
				parser:{
					dataUrlCondition:{
						maxSize:1 * 1024 * 1024
					}
				}
			}
```

即为临界值为1M，再重新打包，发现.png扩展名的图片已经不在dist里了，在网页中，这个图片是一个base64，即Data url 的格式了

详情看代码文件`04-development`

### loader

l![2](D:\web前端\webpack note\img\2.png)

loader可以让webpack去解析其它的类型的文件，并且将这些文件转化为有效的模块以供应用程序使用。那loader该怎么定义呢

#### 使用loader加载css模块

需要下载`css-loader `和`style-loader`

```
npm install css-loader -D
npm install style-loader -D
```

css-loader会打包识别css文件

style-loader会帮助我们把css放置到页面上

```js
{
		test:/\.css$/,
		use:['style-loader','css-loader'],
	//先写style-loader，再写css-loader是有顺序的不能颠倒，是从后往前去加载的，webpack支持loader的链式调用，链式的每一个loader都可以对我们的源进行转换且时逆序的，style-loader最后会返回一个js
	//先css-loader会打包识别css文件然后style-loader会帮助我们把css放置到页面上
	//可以看作出栈
			}
```

此时去浏览器看，发现css样式生效了，并且在head里多了一个style标签，并且把我们css文件里的样式加载到了我们head这个标签的里面，所以样式就生效了

那么loader能不能解析sass或者less这样的文件呢

```
npm install less-loader less -D
```

在css-loader后加上

```js
use:['style-loader','css-loader','less-loader'],
```

在index.js里引入style.less

样式生效

现在的css代码是和html在一起的，能不能把style里的代码放置到一个单独的文件里，通过link标签加载他呢？

#### 抽离和压缩css

##### 抽离

安装插件

```
npm install mini-css-extract-plugin -D
```

```js
//webpack.config.js
//头部
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//plugins改成如下
plugins :[
		//插件使用需要引入并实例化
		new HtmlWebpackPlugin({
			template: './index.html',	//模板
			filename: 'app.html',//输出文件名
			inject:'body' //这样打包好的js文件就会在body里引入而不是head里引入
		}),
		new MiniCssExtractPlugin()
		
	]
```

由于style-loader是把css加到head里，所以就不需要它了，需要换成`MiniCssExtractPlugin.loader`了

```js
{
		test:/\.(css|less)$/,
		use:[MiniCssExtractPlugin.loader,'css-loader','less-loader']
			}
```

此时再打包，发现dist里多了一个main.css的文件，并且在页面中，以link标签引入css

指定这个css文件的存储路径以及名称

```js
new MiniCssExtractPlugin({
	filename:'styles/[contenthash].css'
	})
```

打包后，dist创建了一个新的styles的文件夹，里面有刚刚的css文件，并且文件名也变成的一个哈希值

##### 压缩

安装插件

```
npm install css-minimizer-webpack-plugin -D
```

```js
//webpack.config.js
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
```

模式改为生产模式（开发环境中没有必要压缩）

```js
mode: 'production',
```

在优化配置中添加这个压缩插件

```js
	//优化配置
	optimization:{
		minimizer:[
			new CssMinimizerPlugin()
		]
	}
```

css文件就被压缩了

#### 加载font字体

```js
...
{
	test:/\.(woff|woff2|eot|ttf|otf)$/, //	字体文件各种格式
    type:'asset/resource'
			}
...
```

在style.css中添加

```css
@font-face {
	font-family:'iconfont';
	src: url('./asset/iconfont.ttf') format('truetype');
}
.icon{
	font-family: 'iconfont';
	font-size:30px;
}
```

在index.js中添加

```js
document.body.classList.add('hello')
const span = document.createElement('span');
span.classList.add('icon');
span.innerHTML = '&#xe668';	//文字文件自带
document.body.appendChild(span);
```

#### 加载数据

**加载xml文件与csv文件**

安装插件：

```
npm install csv-loader xml-loader -D
```

修改webpack.config.js

```js
{
		test:/\.(csv|tsv)$/, //	字体文件各种格式
		use:'csv-loader'
	},
{
		test:/\.xml$/, //	字体文件各种格式
		use:'xml-loader',
	}
```

index.js

```js
import Data from './asset/data.xml'
import Notes from './asset/data.csv'
...

console.log(Data);
console.log(Notes);
```

打印后发现，data.xml会转化成一个js对象，data.csv会转化成一个数组

#### babel-loader

将ES6转换成低版本的浏览器能够识别的ES代码

将hello.js改成如下,此时用到了ES6的特性，由于担心某些浏览器不兼容ES6，所以需要把它转换成低版本的浏览器也能识别的ES代码

```js
function getString(){
	return new Promise((resolve,reject)=>{
		setTimeout(()=>{
			resolve('hello word!')
		},2000)
	})
}
async function hello(){
	let string = await getString()
	console.log(string)
}
export default hello
```

安装：

```
npm install babel-loader @babel/core @babel/preset-env -D
```

`babel-loader`:在webpack里应用babel解析ES6的桥梁

`@babel/core`：babel核心模块

`babel/preset-env`：babel预设，一组babel插件的集合

```js
{
		test:/\.js$/, //	字体文件各种格式
		exclude:/node_modules/, //解析的js不包括node_modules里的js只包括本地
		use:{
			loader:'babel-loader',
			options:{
			presets:['@babel/preset-env']//用刚刚下载的预设
					}
				},
			}
```

此时还需要一个插件 `regeneratorRuntime`

`regeneratorRuntime`是webpack打包生成的全局辅助函数，由babel来生成用于兼容 async/await的语法

```
npm install @babel/runtime -D
```

除了这个还要安装一个插件

```
npm install @babel/plugin-transform-runtime -D
```

这个插件会在需要`regeneratorRuntime`的地方自动require导包，编译的时候需要它

### 代码分离

可以把多个模块共享的代码抽离出去，减少入口文件的大小，从而提高首屏的加载速度。

**第一种方法**：

新建一个js文件——another-module.js

在webpack.config.js中修改入口entry与输出output

```js
entry: {
		index:'./src/index.js', //入口
		another:'./src/another-module.js'
	},
output: {
		filename:'[name].bundle.js',//输出文件名
		path:path.resolve(__dirname,'./dist'),
			//输出到的绝对路径
		//__dirname参数表示获取到当前webpack.config.js所在的物理路径
		//第二个参数表示基于第一个参数的路径再去找到解析到当前目录下的dist
		clean:true,
		assetModuleFilename:'images/[contenthash][ext]'
	},
```

结果打包出了两个js文件，一个为 `index.bundle.js`一个为`another.bundle.js`。

其中`[name]`这种格式称为 substitution 可替换的模板字符串。（会用原文件的名字替换这个位置）

并且dist中的`app.html`已经把我们的这两个js文件分别引入了，也就是我们实现了两个入口，并且效果显示正常。

但如果使用多入口的方法，如果在两个入口js里都引入了一个外部js，他会分别的把各自引用的本来通用的包都分别打包的自己的chunk里，这也是entry配置代码分离的一个问题。如果我们在入口的chunk之间包含一些重复代码，那么这些重复模块会被引入各自的bundle中，导致文件变大（等于下了两次外部js）

**第二种方法：（防止重复）**

#### **静态导入**

依旧在entry里做一些配置，不过可以把公共的一些文件给抽离成单独的chunk

entry之前使用的是一个 `key`加上一个字符串的方法，把这个改写一下，把index设置成一个对象，在对象里面哦通过import来导入这个模块，并加上重要属性 `dependOn`,把他的值设为shared，这样可以把共享的文件给定义出来，然后再去定义第二个key another，他也是一个对象里面有import,里面也需要配置一个`dependOn`，也是shared，最后在两个配置并列的地方配置一个shared，可以起名为`lodash`，意思是当我们这两个模块里面有`lodash`这个模块的时候，就会把他抽离出来，并取名为shared的这样一个chunk

```js
entry: {
		index:{
			import: './src/index.js',
			dependOn:'shared'
		}, //入口
		another:{
			import:'./src/another-module.js',
			dependOn:'shared'
		},
		shared:'lodash'
	},
```

打包后我们发现，多出来一个`shared.bundle.js`，也就是把我们的lodash单独抽离出来，放到`shared.bundle.js`里了，另外两个js文件大小缩小了，并且运行到服务器上，打印出的东西没有问题

还可以通过插件来实现,把入口复原，配置新的选项

optimization中添加

```js
	//优化配置
	optimization:{
		minimizer:[
			new CssMinimizerPlugin()
		],
     splitChunks:{
         chunks:'all'
    	}     
	}
}
```

也能实现防止重复的效果，lodash被单独分离出来了

**第三种方法：**

#### 动态导入

（使用import）

编写async-module.js

```js
function getComponent(){
	//imprt函数返回的是promise//  成功之后的回调函数
	return import('lodash')
	.then(({default: _})=>{
		const element = document.createElement('div')
		element.innerHTML = _.join(['hello','webpack'],' ')
		return element
	})
}
getComponent().then((element)=>{
	document.body.appendChild(element)
})
```

在index.js中用import引入这个js`import './async-module.js'`

发现在dist中出现了单独抽离出来的lodash文件

同时optimization中添加，动态静态结合

```js
	//优化配置
	optimization:{
		minimizer:[
			new CssMinimizerPlugin()
		],
     splitChunks:{
         chunks:'all'
    	}     
	}
}
```

就能发现所有的包都被导入到一个文件里来了

#### 懒加载

动态导入的第一个应用。懒加载又称为按需加载，可以优化网页。这种方式实际上是把你的代码在一些逻辑断点处分离开，然后在一些代码块中完成某些操作，比如单击按钮，他会立即引用或者即将引用一些代码块，这样会加快我们应用的初始加载速度，减轻我们的代码块的总体积，因为某些代码块可能永远不会加载

写一个新的js文件——math.js

```js
//math.js
export const add = (x,y)=>{
	return x + y
}
export const minus = (x,y)=>{
	return x - y
}

```

```js
//index.js添加
const button = document.createElement('button')
button.textContent = '点击执行加法运算'
button.addEventListener('click',()=>{
		import('./math.js').then(({ add })=>{
			console.log(add(4,5))
		})
})
document.body.appendChild(button)
```

打开浏览器network，发现加载文件里并没有打包的`src_math_js.bundle.js`文件，当我们点击按钮后，发现这个js文件才被下载下来，然后打开console发现9就被打印出来了。说明这个模块在页面第一次加载的时候并不加载，只有当我们点击按钮的时候才加载，如果用户从不点击，那这个模块就不在服务器上加载了，节省了我们网络的流量

math.js打包的文件名是可以修改的

```js
//index.js修改
const button = document.createElement('button')
button.textContent = '点击执行加法运算'
button.addEventListener('click',()=>{
		import(/*webpackChunkName:'math'*/'./math.js').then(({ add })=>{
			console.log(add(4,5))
		})
})
document.body.appendChild(button)

```

打包后，这个包的名字就变成`math.bundle.js`（注：之所以带bundle是因为我们output里filename写的是`[name].bundle.js`）

#### 预获取/预加载模块

动态导入的第二个应用。我们在声明`import`的时候，可以用下面的指令，让webpack输出resource.hint （资源提示），来告诉浏览器：

- prefetch（预获取）：将来某些导航下可能需要的资源
- preload（预加载）：当前导航下可能需要资源

```js
button.addEventListener('click',()=>{
		import(/*webpackChunkName:'math',webpackPrefetch:true*/'./math.js').then(({ add })=>{
			console.log(add(4,5))
		})
})
```

在import中加入`webpackPrefetch:true`后，再次打包，来到浏览器，发现加载文件里出现`math.bundle.js`，他已经被加载下来了（预获取），当点击按钮时，又加载了一遍，输出9。他有什么意义呢？

当我们首页面的内容都加载完毕，在网络空闲时再去加载我们打包好的`math.bundle.js`，这种方式比懒加载还要优秀。这就是所谓的prefetch（预获取）

```js
button.addEventListener('click',()=>{
		import(/*webpackChunkName:'math',webpackPreload:true*/'./math.js').then(({ add })=>{
			console.log(add(4,5))
		})
})
```

重新打包，启动服务，来到浏览器，刷新后发现math.bundle.js没有被下载，点击按钮后下载了。这就是preload，和懒加载效果有些类似。preload能实现模块的并行加载。

### 缓存

我们可以通过命中缓存来降低网络流量使网站加载速度更快。然而我们在部署新版本的时候，不更改资源文件名，浏览器可能会认为你没有更新，就会使用缓存版本。所以我们需要一些设置来确保webpack生成文件能被客户端缓存，而文件内容变化时又能请求到新文件。

#### 配置输出文件文件名

把webpack.config.js里面的output中的filename修改如下

```js
filename:'[name].[contenthash].js',//输出文件名
```

将bundle改为了`[contenthash]`，这样可以根据我们文件的内容来生成一个哈希的字符串，从而我们的文件名会随着文件内容变化而变化，这样就不怕缓存了。

打包后，发现dist里的文件已经被冠以一个哈希的名字字符串了

#### 缓存第三方库

上面是缓存自己的业务代码，那么像`lodash`这样的第三方代码需不需要缓存呢？推荐做法是：把`lodash`单独提取到一个`vendor chunk`里面。这是因为它们很少像本地源代码那样频繁修改，因此我们利用客户端或者浏览器的长效缓存的机制，命中的缓存来消除请求，从而减少向服务器获取资源的次数，同时还能保证客户端的代码和服务器代码版本一致。简而言之就是把第三方代码单独打包缓存到浏览器里，这样只有我们自己的代码变化时，我们可以去更新，但我们第三方的代码可以始终使用浏览器的缓存。

第三方内容是始终不变的，文件名字自然始终不变。所以把output中内容改回`filename:'[name].bundle.js'`，不再让随机生成哈希字符串改变文件名了

将`optimization`中的`minimizer`的`solitChunks`中` chunks:'all'`删掉

```js
 splitChunks:{
		         cacheGroups:{
					 vender:{
						test:/[\\/]node_modules[\\/]/,	//来保证正确获取到node_modules里面的这个文件夹的名字和文件
						name:'vendors',
						chunks:'all',	//定义对哪些chunk做处理
					 }
				 }
		    	}   
```

打包后，第三方的包都被打包到了vendors.bundle.js里面了

#### 将js文件放到一个文件夹

再次修改output中的内容`filename:'scripts/[name].bundle.js',`并打包，可以看到images，scripts，styles都就位了，里面分别装着图片，js与css，然后app.html分别去加载这些内容

![](D:\web前端\webpack note\img\3.png)

### 拆分开发环境和生产环境配置

#### 公共路径

使用`publicPath`来配置，我们可以使用它来指定应用程序中所有资源的基础路径

我们当前在 app.html中所有资源都是通过相对路径引入的，那可不可以根据服务器的路径来修改我们link上面的这个路径的前缀呢？

这时就需要publicPath来指定

```js
	output: {
		filename:'scripts/[name].[contenthash].js',//输出文件名
		path:path.resolve(__dirname,'./dist'),
			//输出到的绝对路径
		//__dirname参数表示获取到当前webpack.config.js所在的物理路径
		//第二个参数表示基于第一个参数的路径再去找到解析到当前目录下的dist
		clean:true,
		assetModuleFilename:'images/[contenthash][ext]',
		publicPath:'http://localhost:8080/'
	},
```

配置公共路径为`http://localhost:8080/`，此时再去看app.html里的引入文件

```html
<link href="http://localhost:8080/styles/a7fc9dac95324aeb1307.css" rel="stylesheet">

<script defer src="http://localhost:8080/scripts/vendors.458acba2a531eca3e330.js">
```

在所有资源路径的前面就多了这样一个域名。这个域名可以指定为我们项目的前端域名，或者cdn服务器的域名等等都可以。

#### 环境变量

可以帮助我们消除webpack.config.js这个配置文件里面的开发环境与生产环境之间的差异

在编译时传入参数

```
npx webpack --env production
```

但我们怎么使用这个环境变量呢？

首先我们需要把module.export后面的这个对象转化成一个函数,并把env当作参数传入

```js
module.exports = (env) =>{
	return{
		...
		}
}
```

我们可以把`mode: 'development'`修改一下。

比如看看用户是否有production这个配置，如果有的话设置成production，没有就用development

```js
mode: env.production ? 'production':'development'
```

打包后，发现打包成功，但是我们的js代码没有进行压缩。我们可以使用terser-webpack-plugin插件

安装

```
npm install terser-webpack-plugin -D
```

引用：

```js
const TerserPlugin = require('terser-webpack-plugin')
...
optimization:{
			minimizer:[
				new CssMinimizerPlugin(),
				new TerserPlugin()
				
			],
```

这是在生产环境中，当我们在终端输入

```
npx webpack --env development
```

转为开发环境，再去看scripts文件里的js文件，发现代码又不压缩了

#### 拆分配置文件

如果我们使用环境变量，将我们webpack这个配置里面的所有生产环境和开发环境的区别都通过这种判断的方式来进行配置，显然非常糟糕，那能不能简化这个配置呢？

那就是把刚刚的配置给拆成两个配置，一个配置专门做生产环境的配置，一个专门做开发环境的配置。创建一个新的文件夹config，config下面创建一个webpack.config.dev.js，显然为开发环境做的配置。我们可以把webpack.config.js的所有内容复制过来，然后把module.exports复原，从函数改回一个扁平的对象

#### 开发环境的配置

entry是必要的，output关于文件名的缓存我们需要删掉了，在开发环境里没有需要做publicPath，所以也删掉，mode改为development，在生产环境需要压缩，在开发环境没有必要压缩，所以将css和js的压缩插件删掉

```js
//webpack.config.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
	entry: {
		index: './src/index.js', //入口
		another: './src/another-module.js'
	},

	output: {
		filename: 'scripts/[name].js', //输出文件名
		path: path.resolve(__dirname, './dist'),
		//输出到的绝对路径
		//__dirname参数表示获取到当前webpack.config.js所在的物理路径
		//第二个参数表示基于第一个参数的路径再去找到解析到当前目录下的dist
		clean: true,
		assetModuleFilename: 'images/[contenthash][ext]',
	},
	mode: 'development',
	devtool: 'inline-source-map',
	plugins: [
		//插件使用需要引入并实例化
		new HtmlWebpackPlugin({
			template: './index.html', //模板
			filename: 'app.html', //输出文件名
			inject: 'body' //这样打包好的js文件就会在body里引入而不是head里引入
		}),
		new MiniCssExtractPlugin({
			filename: 'styles/[contenthash].css'
		})
	],
	devServer: {
		static: './dist' //该目录跑到服务器上
	},
	module: {
		rules: [{
				test: /\.jpg$/, //正则，表示以jpg为扩展名的文件
				type: 'asset/resource',
				generator: {
					filename: 'images/[contenthash][ext]'
				},
				//也可以自定义打包的资源的路径和文件名，但generator的优先级高于assetModuleFilename
			},
			{
				test: /\.svg$/,
				type: 'asset/inline'
			},
			{
				test: /\.png$/,
				type: 'asset',
				parser: {
					dataUrlCondition: {
						maxSize: 1 * 1024 * 1024
					}
				}
			},
			{
				test: /\.(css|less)$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
				//先写style-loader，再写css-loader是有顺序的
				//先css-loader会打包识别css文件然后style-loader会帮助我们把css放置到页面上
				//可以看作出栈
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/, //	字体文件各种格式
				type: 'asset/resource'
			},
			{
				test: /\.(csv|tsv)$/, //	字体文件各种格式
				use: 'csv-loader'
			},
			{
				test: /\.xml$/, //	字体文件各种格式
				use: 'xml-loader',
			},
			{
				test: /\.js$/, //js
				exclude: /node_modules/, //解析的js不包括node_modules里的js只包括本地
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'], //用刚刚下载的预设
						plugins: [
							[
								'@babel/plugin-transform-runtime'
							]
						]
					}
				},
			}

		]
	},
		splitChunks: {	//将第三方的包打到一个文件里
			cacheGroups: {
				vender: {
					test: /[\\/]node_modules[\\/]/, //来保证正确获取到node_modules里面的这个文件夹的名字和文件
					name: 'vendors',
					chunks: 'all', //定义对哪些chunk做处理
				}
			}
		}
	}
}

```

那开发环境的配置我们怎么运行呢？

```
npx webpack -c ./config/webpack.config.dev.js
```

打包后我们发现，在config文件里多了一个dist文件夹，而外部的dist文件夹没有被替换，dist里的东西还是原来的东西，config里的东西是新打包的东西，他真正的打包位置是condig文件夹，所以我们需要把他迁移到上一层位置，替换外部的dist

把webpack.config.js里的output里的path改成如下

`path: path.resolve(__dirname, '../dist')`

再次打包就到上一层的dist里了

#### 生产环境的配置

在config里创造一个新文件webpack.config.prod.js

把webpack.config.js复制过来，然后把module.exports复原，从函数改回一个扁平的对象，output里的filename不用变因为需要缓存文件，publicPath也需要，把path改成`../dist`来存储到上一层的dist文件，mode要改成生产环境，在生产环境里是不需要devtool的，dev server也是不需要的，压缩css和js的插件配置optimization优化是需要的。

重新打包`npx webpack -c ./config/webpack.config.prod.js`

再去打开dist文件夹，就看到js、css文件名的哈希值出来了，css、js代码也压缩了。我们就通过两个配置文件分离了生产环境和开发环境的配置

用指定模式开启服务器

```
npx webpack serve -c ./config/webpack.config.dev.js
```

#### npm脚本

每次打包都要在终端输入命令，那么我们有没有什么办法简化一下呢？

在当前文件夹根目录下创建一个package.json文件，写入脚本

```json
{
	"scripts" :{
		"start":"npx webpack serve -c ./config/webpack.config.dev.js",
		"build":"npx webpack -c ./config/webpack.config.prod.js"
	}
}
```

这样的话我们就可以运行这一串命令了，输入`npm run start`

就可以看到服务成功启动起来了

把scripts复制，打开最外层的package.json文件，把它的scripts替换掉，然后可以把当前的package.json先删掉。然后把外层的package.json,package-lock.json,node_modules复制到我们项目文件下。复制后，项目文件中就有自己的一些配置文件和模块了。

在终端中输入`npm run build`,项目被成功打包了

#### 提取公共配置

我们已经把生产环境和开发环境配置到了不同的文件里，但这两个文件有大量的重复代码，我们能不能把这些重复代码单独配置到一个文件里呢？

在`config`文件里新建一个`webpack.config.common.js`，把`webpack.config.js`内容复制过来，把`module.exports`从函数改成一个对象。

output这一块，filename生产环境和开发环境不一样，所以删掉，`publicPath`删掉，`mode`删掉，`devtool`删掉，`devserver`删掉，下面optimization的压缩部分的代码也删掉，保留通用代码

```js
//webpack.config.common.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
		entry: {
			index:'./src/index.js', //入口
			another:'./src/another-module.js'
		},
		
		output: {
			filename:'scripts/[name].[contenthash].js',//输出文件名
			path:path.resolve(__dirname,'../dist'),
				//输出到的绝对路径
			//__dirname参数表示获取到当前webpack.config.js所在的物理路径
			//第二个参数表示基于第一个参数的路径再去找到解析到当前目录下的dist
			clean:true,
			assetModuleFilename:'images/[contenthash][ext]',
			publicPath:'http://localhost:8080/'
		},
		devtool:'inline-source-map',
		plugins :[
			//插件使用需要引入并实例化
			new HtmlWebpackPlugin({
				template: './index.html',	//模板
				filename: 'app.html',//输出文件名
				inject:'body' //这样打包好的js文件就会在body里引入而不是head里引入
			}),
			new MiniCssExtractPlugin({
				filename:'styles/[contenthash].css'
		})
		],
		devServer:{
			static:'./dist' //该目录跑到服务器上
		},
		module:{
			rules:[
				{
					test:/\.jpg$/,//正则，表示以jpg为扩展名的文件
					type:'asset/resource',
					generator:{
						filename:'images/[contenthash][ext]'
					},
					//也可以自定义打包的资源的路径和文件名，但generator的优先级高于assetModuleFilename
				},
				{
					test:/\.svg$/,
					type:'asset/inline'
				},
				{	
					test:/\.png$/,
					type:'asset',
					parser:{
						dataUrlCondition:{
							maxSize:1 * 1024 * 1024
						}
					}
				},
				{
					test:/\.(css|less)$/,
					use:[MiniCssExtractPlugin.loader,'css-loader','less-loader'],
					//先写style-loader，再写css-loader是有顺序的
					//先css-loader会打包识别css文件然后style-loader会帮助我们把css放置到页面上
					//可以看作出栈
				},
				{
					test:/\.(woff|woff2|eot|ttf|otf)$/, //	字体文件各种格式
					type:'asset/resource'
				},
				{
					test:/\.(csv|tsv)$/, //	字体文件各种格式
					use:'csv-loader'
				},
				{
					test:/\.xml$/, //	字体文件各种格式
					use:'xml-loader',
				},
				{
					test:/\.js$/, //js
					exclude:/node_modules/, //解析的js不包括node_modules里的js只包括本地
					use:{
						loader:'babel-loader',
						options:{
							presets:['@babel/preset-env'],//用刚刚下载的预设
							plugins:[
								[
									'@babel/plugin-transform-runtime'
								]
							]
						}
					},
				}
				
			]
		},
			//优化配置
		optimization:{
			  splitChunks:{
			         cacheGroups:{
						 vender:{
							test:/[\\/]node_modules[\\/]/,	//来保证正确获取到node_modules里面的这个文件夹的名字和文件
							name:'vendors',
							chunks:'all',	//定义对哪些chunk做处理
						 }
					 }
			    	}   
		}
}
```



接下来去`webpack.config.dev.js`里把common文件里有的删掉（相同的删掉），留下自己私有的

```js
//webpack.config.dev.js
module.exports = {

	output: {
		filename: 'scripts/[name].js', //输出文件名
	},
	mode: 'development',
	devtool: 'inline-source-map',	
	devServer: {
		static: './dist' //该目录跑到服务器上
	}
	}

```

`webpack.config.prod.js`同样进行删去相同项

```js
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
	output: {
		filename: 'scripts/[name].[contenthash].js', //输出文件名
		publicPath: 'http://localhost:8080/'
	},
	mode: 'production',
	//优化配置
	optimization: {
		minimizer: [
			new CssMinimizerPlugin(),
			new TerserPlugin()

		],
	}
}

```

接下来进行三个文件的一个合并

我们使用`webpack-merge`来实现这个功能

全局安装webpack-merge`npm install webpack-merge -D`

在config文件夹里 新建一个webpack.config.js文件，来担当我们外部的webpack.config.js的重任，来帮我们把这三个文件merge到一起。先定义一个常量

```js
const { merge }= require('webpack-merge')

const commonConfig = require('./webpack.config.common.js')
const productionConfig = require('./webpack.config.prod.js')
const developmentConfig = require('./webpack.config.dev.js')

module.exports = (env) =>{
	switch(true){
		case env.development:
			return merge(commonConfig,developmentConfig)
		case env.production:
			return merge(commonConfig,productionConfig)
			default:
				return new Error('NO matching configuration was found')
	}
}
```

我们用到了env环境变量，需要传入参数，所以打开package.json，需要修改一下脚本

```json
		"start": "webpack serve -c ./config/webpack.config.js --env development",
		"build": "webpack -c ./config/webpack.config.js --env development"
```

这样在执行`npm start`/`npm run build`时就会传入env来判定此时的mode（为development），来选择相应配置了,若想改为production，只需要改脚本就可以了。