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

模式改为生产模式

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