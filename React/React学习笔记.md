##    React学习笔记

### 环境安装与项目创建

一、检查[node](https://so.csdn.net/so/search?q=node&spm=1001.2101.3001.7020)与npm是否已安装

```
   node --version
   npm -v
```

二、安装淘宝cnpm，设置淘宝源 便于快速下载

npm install -g cnpm --registry=https://registry.npm.taobao.org

npm config set registry https://registry.npm.taobao.org

三、安装create-react-app

    cnpm install -g create-react-app
四、下载完成create-react-app后在自己的项目目录下新建一个项目

    create-react-app my-react

至此，使用reract脚手架完成一个react项目的新建

之后，终端输入`npm start`即可启动React项目

### 元素渲染

元素是构成React应用的最小单位，它用于描述屏幕上输出的内容

```react
const element = <h1>Hello world</h1>;
```

与浏览器的 DOM 元素不同，React 当中的元素事实上是普通的对象，React DOM 可以确保 浏览器 DOM 的数据内容与 React 元素保持一致。

#### 将元素渲染到DOM中

首先在HTML页面中添加一个`id="example"`的`<div>`

```html
<div id="example"></div>
```

在此div中的所有内容都将由React DOM来管理，所以我们将其称为"根"DOM节点。

我们用React开发应用时一般只会定义一个根节点，但是如果你是在一个已有的项目当中引入React的话，你可能会需要在不同的部分单独定义React根节点。

要将React元素渲染到根DOM节点中，我们通过把它们都传递给`ReactDOM.render()`的方法来将其渲染到页面上

 ```React
const element = <h1>Hello, world!</h1>;
ReactDOM.render(
    element,
    document.getElementById('example')
);
 ```

React18的版本中，需要写成如下，否则会在控制台报错

```react
// import React from 'react'
import ReactDOM from 'react-dom/client'; 

ReactDOM.createRoot(document.getElementById('root')).render(<div><b>wo</b></div>);
```



#### 更新元素渲染

React元素都是不可变的，当元素被创建之后，你是无法改变其内容或属性的。

目前更新界面的唯一办法是创建一个新的元素，然后将它传入 `ReactDOM.render()`方法：

来看一下这个计时器的例子:

```react
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>现在是 {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('example')
  );
}
 
setInterval(tick, 1000);
```

以上实例通过 setInterval() 方法，每秒钟调用一次 ReactDOM.render()。

我们可以将要展示的部分封装起来，以下实例用一个函数来表示：

```react
function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>现在是 {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}
 
function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('example')
  );
}
 
setInterval(tick, 1000);
```

除了函数外我们还可以创建一个 React.Component 的 ES6 类，该类封装了要展示的元素，需要注意的是在 render() 方法中，需要使用 **this.props** 替换 **props**：

```react
class Clock extends React.Component {
  render() {
    return (
      <div 
        <h1>Hello, world!</h1>
        <h2>现在是 {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
 
function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('example')
  );
}
 
setInterval(tick, 1000);
```

>**React 只会更新必要的部分**
>
>值得注意的是 React DOM 首先会比较元素内容先后的不同，而在渲染过程中只会更新改变了的部分。

### 虚拟DOM

使用原生JavaScript或[jQuery](https://so.csdn.net/so/search?q=jQuery&spm=1001.2101.3001.7020)直接操作DOM元素时，很大可能会触发回流事件，此时浏览器需要重新渲染页面，设置整个文档，计算DOM节点浪费了性能，而且效率低，非常影响用户体验。

react提出了一个新的思想：始终整体刷新页面，当数据发生变化时，react会自动更新UI，这种方式虽然简单，但是有一个很明显的问题，慢。每次数据改变就重新渲染整个页面会做大量的**无用功**，而且无法保存节点状态，比如失去焦点，为了解决这个问题，react又提出了一个解决方案，就是虚拟DOM以及Diff算法。react根据原生DOM节点数创建了一个虚拟DOM，每次UI状态改变时生成新的虚拟DOM， 与原来的相比对，对于没有改变的节点，让其保持原样不动，只创建并替换发生改变的DOM节点。

这也是React高效的原因：

- react使用虚拟DOM，不总是直接操作页面真实DOM(原生JS直接操作DOM，浏览器会进行大量的重排重绘)

- react的DOM Diffing算法，最小化页面重绘(原生JS操作DOM繁琐且效率低)

- 原生JS没有组件化编码方案，代码复用率低

**React和vue的DOM更新策略有什么不同呢？**

react和vue的虚拟dom都是一样的， 都是用JS对象来模拟真实DOM，然后用虚拟DOM的diff来最小化更新真实DOM。

而对于后半部分（用虚拟DOM的diff来最小化更新真实DOM）两者算法也是类似的，包括replace delete insert等。

两者对于dom的更新策略不太一样， react采用自顶向下的全量diff，vue是局部订阅的模式。 但是这其实和虚拟dom并无关系。

vue和react都采用了虚拟dom算法，以最小化更新真实DOM，从而减小不必要的性能损耗。

react中数据发生变化（调用setstate时），render函数就会执行，重新生成一个新的虚拟dom，这个虚拟dom和旧的虚拟dom做比较，得出差异然后渲染。

而vue组件中数据发生变化，由于数据变化会触发setter，由于vue组件中数据的getter的作用，收集了依赖，setter触发会根据这些依赖，生成新的虚拟dom，然后对比新旧虚拟dom进行渲染。

react 函数式组件思想 当你 setstate 就会遍历 diff 当前组件所有的子节点子组件, 这种方式开销是很大的, 所以 react 16 采用了 fiber 链表代替之前的树，可以中断的，分片的在浏览器空闲时候执行

vue 组件响应式思想 采用代理监听数据，我在某个组件里修改数据，就会明确知道那个组件产生了变化，只用 diff 这个组件就可以了

#### fiber

React Fiber 是 React 16 中新的协调引擎，是对核心算法的一次重新实现。**那为什么要重写新的Fiber架构呢？**

在 React 16 以前，当元素较多，需要频繁刷新的时候页面会出现卡顿，究其原因是因为更新过程是同步的，大量的同步计算任务阻塞了浏览器的渲染。

当页面加载或者更新时，React 会去计算和比对 Virtual DOM，最后绘制页面，整个过程是同步进行的。当 JavaScript 在浏览器的主线程上长期运行，就会阻塞了样式计算、布局和绘制，导致页面无法得到及时的更新和响应。此时，无论用户如何点击鼠标或者敲击键盘都不会得到响应，当 React 更新完成后刚刚点击或敲击的事件才会得到响应。

由于 JavaScript 是单线程的特点，所以一个线程执行完成后才会执行下一个线程，当上一个线程任务耗时太长，程序就会对其他输入不作出响应。

React 的更新过程会先计算，一旦任务开始进行，就无法中断， js 将一直占用主线程， 直到整棵 Virtual DOM 树计算完成之后，才能把执行权交给渲染引擎，而 React Fiber 就是要改变现状。

##### fiber的优势

- 增量渲染
- 为不同任务分配优先极
- 更新时能暂停、终止、复用渲染任务
- 并发方面新的能力

Fiber 把耗时长的任务拆分成很多的小片，每个小片的运行时间很短，每次只执行一个小片，执行完后看是否还有剩余时间，如果有就继续执行下个小片，如果没有就挂起当前任务，将控制权交给 React 负责任务协调的模块，看有没有其他紧急任务要做，如果没有就继续更新当前任务，如果有紧急任务就去做紧急任务，等主线程不忙的时候在继续执行当前任务。

>分片之后，每执行一段时间，都会将控制权交给主线程。

这样唯一的线程不会被独占，其他任务依然有运行的机会。

这种策略叫做 Cooperative Scheduling（合作式调度），操作系统常用任务调度策略之一。

总而言之，我们了解到，Fiber 是一个最小工作单元，也是堆栈的重新实现，可以理解为是一个虚拟的堆栈帧。它将可中断的任务拆分成多个任务，通过优先级来自由调度子任务，分段更新，从而将之前的同步渲染改为异步渲染。

而维护每一个分片的数据结构，就是 Fiber。

### JSX

React使用JSX来代替常规的JavaScript。

JSX是一个看起来很像XML的JavaScript对语法扩展。

我们不需要一定使用JSX，但它有以下优点：

- JSX执行更快，因为他在编译为JavaScript代码后进行了优化
- 它是类型安全的，在编译过程中就能发现错误
- 使用JSX编写模板更加简单快速

如下：

```jsx
const element = <h1>hello world!</h1>;
```

这种看起来可能有些奇怪的标签语法既不是字符串也不是HTML，它就被称为JSX，一种JavaScript的语法扩展。在React中推荐使用JSX来描述用户节面，JSX实在JavaScript内部实现的。

元素是构成React应用的最小单位，JSX就是用来声明React当中的元素的。与浏览器的DOM元素不同，React当中的元素事实上是普通的对象，React DOM可以确保浏览器DOM的数据内容与React元素保持一致。

要将React元素渲染到根DOM节点中，我们通过把它们都传递给ReactDOM.render()的方法来将其渲染到页面上

```jsx
var mydivelement = <div className="foo"/>;
ReactDOM.render(
  mydivelement,
  document.getElementById('example')
);
```

>注意:
>
>由于 JSX 就是 JavaScript，一些标识符像 `class` 和 `for` 不建议作为 XML 属性名。作为替代，React DOM 使用 `className` 和 `htmlFor` 来做对应的属性。

#### 使用JSX

**JSX**看起来类似HTML，我们可以看以下实例：

```jsx
ReactDOM.render(
	<h1>Hello world!</h1>,
	document.getElementById('example')
);
```

我们可以在以上代码中嵌套多个HTML标签，需要使用一个div元素包裹它，实例中的p元素添加了自定义属性`data-myattribute`,添加自定义属性需要使用`data-`前缀

```jsx
ReactDOM.render(
    <div>
    <h1>菜鸟教程</h1>
    <h2>欢迎学习 React</h2>
    <p data-myattribute = "somevalue">这是一个很不错的 JavaScript 库!</p>
    </div>
    ,
    document.getElementById('example')
);
```

#### 独立文件

React JSX代码可以放在一个独立文件上，例如创建一个hello.js文件，代码如下：

```react
ReactDOM.render(
	<h1>hello world!</h1>,
	document.getElementById('example')
);
```

然后在HTML文件中引入该JS文件：

```html
<body>
  <div id="example"></div>
<script type="text/babel" src="helloworld_react.js"></script>
</body>
```

#### JavaScript 表达式

我们可以在JSX中使用JavaScript表达式。表达式写在花括号{}中。示例如下：

```react
ReactDOM.render(
    <div>
      <h1 className="title">{1+1}</h1>
    </div>
    ,
    document.getElementById('example')
);
```

在JSX中不能使用`if else`语句，但是可以使用三元运算表达式来替代。以下实例中如果变量i等于1，浏览器将输出true，如果修改i的值，则会输出false。

```react
ReactDOM.render(
    <div>
      <h1>{i == 1 ? 'True!' : 'False'}</h1>
    </div>
    ,
    document.getElementById('example')
);
```

我们还可以在大括号中写函数表达式，如下调用which函数

```jsx
{
	this.which()
}
```



#### 样式

React推荐使用内联样式。我们可以使用三元运算表达式语法来设置内联样式，React会在指定元素数字后自动添加px。以下实例演示了为h1元素添加**myStyle**内联样式:

```react
var myStyle = {
    fontSize: 100,
    color: '#FF0000'
};
ReactDOM.render(
    <h1 style = {myStyle}>菜鸟教程</h1>,
    document.getElementById('example')
);
```

若是想直接把样式写到JSX代码里，要像如下，在{}模板内再加一个{}，代表对象

```react
export default class children extends React.Component {
	render() {
		var myname = "kuki"
		return (
			<div style={{background:"#99fff9"}}>
				{10+30}- {myname}
			</div>
		)
	}
}
```

若想外部写CSS，和之前一样，建立一个css文件，在js中引入css模块

```js
import './css/index.css'
```

在React中，更推荐的是使用行内样式，因为React更觉得每一个组件都是一个独立的整体，都应该包含到一个组件内部。

此外，若是内联样式，若是类似`font-size`这类中间带'-'连接两个单词的属性，要用驼峰命名法，比如`fontSize`、`backgroundColor`等。

为了防止关键字问题（例如jsx中标签的class被当作创建类的class，JSX中class应当写作className，for应该写作htmlFor）

```html
<div className="active">333</div>
<label htmlFor="username">用户名：</label>
<input type="text" id="username"/>
```

用了htmlFor后，点击用户名label就自动聚焦到id为username的输入框了

#### 注释

注释需要写在花括号中，实例如下：

```react
ReactDOM.render(
    <div>
    <h1>菜鸟教程</h1>
    {/*注释...*/}
     </div>,
    document.getElementById('example')
);
```

#### 数组

JSX允许在模板中插入数组，数组会自动展开所有成员：

```react
var arr = [
  <h1>菜鸟教程</h1>,
  <h2>学的不仅是技术，更是梦想！</h2>,
];
ReactDOM.render(
  <div>{arr}</div>,
  document.getElementById('example')
);
```

要注意，{}中间只能是表达式或者属性，不能是函数方法，因为不会执行，是没有意义的。但是如果写在onClick={}的大括号中是可以的，代表点击后执行这个函数。

#### 关于JSX大括号插入富本文

```JSX
<div>{this.state.text}</div>}
```

就比如如上这种，如果text是用户在输入框输入的，里面输入了一些例如`<b>111</b>`,那么显示到页面上的是什么呢？显而易见，显示的是`<b>111</b>`而不是只有加粗过后的111，React为了保证安全性，防止xss攻击，是把所有当成文本插入的，而不是HTML代码。但我们可以通过`dangerouslySetInnerHTML`来让它当作HTML代码插入。

```jsx
<span dangerouslySetInnerHTML={
        {
            __html:item.mytext
        }
    }></span>
```

此时，若输入`<b>111</b>`插入到span中，显示的就是加粗后的111,插入的是HTML代码。但是这样很危险，所以很少会用到。

#### JSX的原理

JSX将HTML语法直接加入到JS代码中，再通过翻译器转换到纯JavaScript后由浏览器执行，在实际开发中，JSX在产品打包阶段都已经编译成纯JavaScript，不会带来任何副作用，反而会让代码更加直观并易于维护。编译过程由Babel的JSX编译器实现。若不使用JSX而是纯原生的JS该是怎么样的？（或者是JSX最终被编译成什么样子了）

```react
ReactDOM.render(React.createElement("div",{
	id:'container',
	className:"main"
},"hello"),document.getElementById("root"))
//以上等价于如下   
//React17的写法
ReactDOM.render(<div>hello</div>,document.getElementById("root"))
//React18的写法
ReactDOM.createRoot(document.getElementById('root')).render("hello");
```

### 组件

```js
import './component/class.js'
```

可以直接通过ES6语法引入组件的JS文件，引入后会自动执行。

首先在class.js定义App组件

```react
import React from 'react'
class App extends React.Component{
	render(){
		return <div>hello app conponent</div>
	}
}
export default App
```

然后在index.js中引入App然后渲染到页面上

```react
import React from 'react'
import ReactDOM from 'react-dom/client'; 
import App from './component/class.js'

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
```

1.我们试着封装一个输出"Hello World！"的组件，组件名为HelloMessage：

```react
function HelloMessage(props){
	return <h1>Hello World!</h1>;
}
const element= <HelloMessage />;
ReactDOM.createRoot(document.getElementById('example')).render(element);
```

**实例解析：**

首先我们用函数定义了一个组件（函数式组件）：

```react
function HelloMessage(props){
	return <h1>Hello World!</h1>;
}
```

我们也可以使用ES6 class来定义一个组件：

```react
class HelloMessage extends React.Component{
	render(){
		return <h1>Hello World!</h1>;
	}
}
```

在项目中，要保证组件的创建方法一致，要么全为ES6类声明方式，要么全为函数式，且函数式建议写成箭头函数，因为箭头函数的this指向和外部作用域的this指向一致，不用担心this指向问题。

```react
const HelloMessage = ()=>{
	render(){
		return <h1>Hello World!</h1>;
	}
}
const HelloMessage = () =><h1>Hello World!</h1>
```



2.`const element = <HelloMessage />`为用户自定义的组件。

>注意，原生 HTML 元素名以小写字母开头，而自定义的 React 类名以大写字母开头，比如 HelloMessage 不能写成 helloMessage。除此之外还需要注意组件类只能包含一个顶层标签，否则也会报错。

 此外，如果我们需要向组件传递参数，可以使用`this.props`  对象，实例如下：

```react
function HelloMessage(props){
	return <h1>Hello World!</h1>;
}
const element = <HelloMessage name="Runoob" />;
ReactDOM.createRoot(document.getElementById('example')).render(element);
```

以上实例中 **name** 属性通过 **props.name** 来获取。

> 注意，在添加属性时， class 属性需要写成 className ，for 属性需要写成 htmlFor ，这是因为 class 和 for 是 JavaScript 的保留字。

####  复合组件

我们可以通过创建多个组件来合成一个组件，即把组件的不同功能点进行分离。

以下实例我们实现了输出网站名字和网址的组件：

```react
function Name(props){
	return <h1>网站名称：{props.name}</h1>;
}
function Url(props){
	return <h1>网站地址：{props.url}</h1>; 
}
function Nickname(props){
	return <h1>网站别名：{props.nickname}</h1>
}
function App(){
	return(
		<div>
			<Name name="菜鸟教程" />
			<Url url = "http://www.runoob.com" />
			<Nickname nickname="Runoob" />
		</div>
	);
}
ReactDOM.createRoot(document.getElementById('example')).render(<App/>);
```

以下我们模拟页面的布局

```react
//index.js
import React from 'react'
import ReactDOM from 'react-dom/client'; 

class App extends React.Component{
	render(){
		return(
			<div>
				<Navbar />
				<Swiper />
				<Tabbar />
			</div>
		)
	}
}

class Navbar extends React.Component{
	render(){
		return(
			<div>
				navbar
			</div>
		)
	}
}

class Swiper extends React.Component{
	render(){
		return(
			<div>
				swiper
			</div>
		)
	}
}

class Tabbar extends React.Component{
	render(){
		return(
			<div>
				tabbar
			</div>
		)
	}
}
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
```

### ref的应用

若是直接获取`this.refs.mytext`获取到的就是`input`标签，所以需要再加个`.value`，才会获取到输入的值（用起来和vue的`this.$refs.xxx`差不多,只是少了一个`$`符号）。利用给定ref的属性，再在下面通过 `this.refs.xxx`来获取元素,拿到输入框的value值。（不过在ts中refs将被弃用）

```react
export default class List extends Component {
	a = 100
	render() {
		return (
			<div>
				<input ref="mytext"/>
				<button onClick={()=>this.handleClick()}>add</button>
			</div>
		)
	}
	handleClick(){
		console.log("click",this.a,this.refs.mytext.value)
	}
}
```

给标签设置`ref="username"`,通过这个获取`this.refs.username`,ref可以获取到应用的真实dom。

给组件设置`ref="username"`，通过这个获取`this.refs.username`,ref可以获取到组件对象

由于这种方案将被弃用，所以用**第二种方案**,这种写法是比较推荐的。

```react
export default class List extends Component {
	mytext = React.createRef()
	render() {
		return (
			<div>
				<input ref={this.mytext}/>
				<button onClick={()=>this.handleClick()}>add</button>
			</div>
		)
	}
	handleClick(){
		console.log("click",this.mytext.current.value)
	}
}
```

#### 表单的受控和非受控

##### 非受控组件

React要编写一个非受控组件，可以使用ref来从DOM节点中获取表单数据，就是非受控组件。如上面的例子就是非受控组件接受一个表单的值。

> **注意：**广义范围的说法，React组件的数据渲染是否被调用者传递的props完全控制，控制则为受控组件，否则非受控组件。

另外还可以使用`defaultValue`设置输入框输入内容前的初始值，但是不去控制后续的更新。

```react
<input ref={this.myusername} defaultValue="lulu"/>
```

##### 受控组件

在HTML中，表单元素(如<input>、<textarea>和<select>)通常自己维护state，并根据用户输入进行更新，而在React中，可变状态通常保存在组件的state属性中，并且只能通过setState来更新。

```react
<input value={this.state.username} onChange={(e)=>{
        this.setState({
            username:e.target.value
        })
    }}/>
```

由于在表单元素上设置了value属性，因此显示的值始终为`this.state.username`，这使得React的state成为唯一数据源，由于onChange在每次改变时都会执行并更新React的state，因此显示的值将随着用户输入而更新。

对于受控组件来说，输入的值始终由React的state驱动，你也可以将value传递给其它UI元素，或者通过其他事件处理函数重置，但这意味着你需要编写更多的代码。

### State(状态)

React 把组件看成是一个状态机（State Machines）。通过与用户的交互，实现不同状态，然后渲染 UI，让用户界面和数据保持一致。

`this.state`是纯js对象，在vue中，data属性是利用`object.defineProperty`处理过的，更改data的数据的时候会触发数据的getter和setter，但是React中没有做这样的处理，如果直接更改的话，react是无法得知的，所以，需要使用特殊的更改状态的方法setState。

React 里，只需更新组件的 state，然后根据新的 state 重新渲染用户界面（不要操作 DOM）。

以下实例创建一个名称扩展为 React.Component 的 ES6 类，在 render() 方法中使用 this.state 来修改当前的时间。

添加一个类构造函数来初始化状态 this.state，类组件应始终使用 props 调用基础构造函数。

```react
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
 
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>现在是 {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
 
ReactDOM.render(
  <Clock />,
  document.getElementById('example')
);

```

个人认为，作用方面来说，React的State的作用和Vue的data的作用是一致的，概念上称他们为“状态”，但是其实现与用法不同，React更新状态是通过setState方法，vue里面是使用赋值操作符。vue是双向数据绑定，React是向下传递数据，Vue，当你把一个普通的 JavaScript 对象传给 Vue 实例的`data`选项，Vue 将遍历此对象所有的属性，并使用`Object.defineProperty`把这些属性全部转为`getter/setter`。从而实现响应式。React，是通过setState函数来更改属性，而setState函数是异步更新状态的，接受一个回调函数，调用完之后不会立即更新状态。

#### setState

在 React 的生命周期以及绑定的事件流中，所有的 setState 操作会先缓存到一个队列中，在整个事件结束后或者 mount 流程结束后，才会取出之前缓存的 setState 队列进行一次计算，触发 state 更新。setState既不是微任务也不是宏任务，本质上还是在一个事件循环中，是同步执行的，它并没有切换到另外宏任务或者微任务中，在运行上是基于同步代码实现，只是行为上看起来像异步，而State的更新可能是异步的。

出于性能考虑，React 可能会把多个 `setState()` 调用合并成一个调用。

setState处在同步的逻辑中，异步更新状态，更新真实DOM。setState处在异步的逻辑中，同步更新状态。同步更新真实DOM。

因为 `this.props` 和 `this.state` 可能会异步更新，所以你不要依赖他们的值来更新下一个状态。

所以可以利用这一点，setState接受第二个参数，是一个回调函数，状态和dom更新完后就会被触发，在回调函数中依赖他们更新下一个状态就可以实现。

**简单练习：**

```react
export default class App extends Component {
	state = {
		show:true,
         name:'kuki'
	}
	render() {
		return (
			<div>
                <h1>{this.state.name}</h1>
				<button onClick={()=>{
					this.setState({
					    show:!this.state.show,
                          name:'xiaohong'
					})
				}}>{this.state.show?"收藏":"取消收藏"}</button>
			</div>
		)
	}
}

```

**或者写成如下：**

```react
export default class App extends Component {
	// state = {
	// 	show:true
	// }
	constructor() {
	    super()
		this.state = {
			show:true,
             name:'kuki'
		}
	}
	render() {
		return (
			<div>
                 <h1>{this.state.name}</h1>
				<button onClick={()=>{
					this.setState({
						show:!this.state.show,
                           name:'xiaoming'
					})
				}}>{this.state.show?"收藏":"取消收藏"}</button>
			</div>
		)
	}
}
```

`super()`一定要有，因为是继承`React.Component`，所以要通过`super`把之前的组件类的属性继承过来。

**如果state中的某个值是数组该如何渲染呢？**

#### State中的数组

React不会把已经有的可以使用的原生方法再给你封装一次，所以在渲染循环列表时，需要用到原生的`map()`方法。

```react
export default class List extends Component {
	constructor() {
	    super()
		this.state = {
			list:["zhangsan","lisi","wangwu"]
		}
	}
	render() {
		return (
			<div>
				<ul>{
					this.state.list.map(item=><li>{item}</li>)
				}</ul>
			</div>
		)
	}
}
```

**或者这么写(之前已经说过JSX中数组的渲染方法了)**

```react
export default class List extends Component {
	constructor() {
	    super()
		this.state = {
			list:["zhangsan","lisi","wangwu"]
		}
	}
	render() {
		var newlist = this.state.list.map(item=><li>{item}</li>)
		return (
			<div>
				<ul>{newlist}</ul>
			</div>
		)
	}
}
```

但是这时看控制台，发现报错了，提示没有key。

通过之前的vue的学习，我们可以知道，key是唯一的标识，在进行diff的时候，通过比对元素的key值，来辨认是否是同一节点，可以更高效的更新VDOM，减少不必要的元素更新，所以要确保每个节点key值都不同，每个key值都是独一无二的。

key也不能用索引，因为如果进行删除操作，那么从这条数据开始后的所有数据索引都会变化。那么diff就会计算出后面的item的key-index映射都发生了变化,就会全部重新渲染,大大影响了性能。而且这也会导致一些bug,比如当删除了item2的时候,再选中item3就会变成选中item4。”

**将ref的应用和上面的混合应用一下实现记事本记录的增加与删除的功能**

```react
export default class List extends Component {
	constructor(){
		super()
		this.mytext = React.createRef()
		this.state = {
			list:[{
					id:1,
					text:"zhangsan"
				},
				{
						id:2,
						text:'wanglu'
				},
				{
						id:3,
						text:"lisi"
				}]
		}
	}
	render() {
		return (
			<div>
				<input ref={this.mytext}/>
				<button onClick={()=>this.add()}>add</button>
				<ul>
				{this.state.list.map((item,index)=><li key={item.id}>{item.text} <button onClick={()=>this.delete(index)}>delete</button></li>)}
				</ul>
			</div>
		)
	}
	add(){
		let newlist = this.state.list
		newlist.push({
			id:Date.now(),
			text:this.mytext.current.value})
		this.setState({
			list:newlist
		})
		this.mytext.current.value=""
	}
	delete(index){
		let newlist = this.state.list
		newlist.splice(index,1)
		this.setState({
			list:newlist
		})
	}
}
```

在增加完我们可以直接通过修改`this.mytext.current.value=""`获取到输入框的值，并将输入框的值清空

React不建议直接修改state的值，因为可能会造成不能预料的问题，所以克隆一个新的数组，然后修改这个新的数组的值，最后通过setState修改状态。

此外关于slice的补充：

![image-20220619214657378](React%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0.assets/image-20220619214657378.png)

#### 条件渲染

我们再来润色一下上面记事本的案例，当没有记录时，显示暂无待办事项，有记录时则不显示。

由于我们在JSX中可以直接在大括号里写js表达式，所以可以写成如下

```jsx
{条件?<div>暂无待办事项</div>:null}
```

或者写成这样

```jsx
{条件 && <div>暂无待办事项</div>}
```

再或者这种通过类名来实现不同样式的方式，它在之前也经常用。

```jsx
<div className={this.state.list.length<1 ? '':'hidden'}>暂无待办事项</div>
```

```css
//index.css
.hidden{
	display: none;
}
```

这样子性能比较好

目前完善的全部代码：

```react
export default class List extends Component {
	constructor(){
		super()
		this.mytext = React.createRef()
		this.state = {
			list:[{
					id:1,
					text:"zhangsan"
				},
				{
						id:2,
						text:'wanglu'
				},
				{
						id:3,
						text:"lisi"
				}]
		}
	}
	render() {
		return (
			<div>
				<input ref={this.mytext}/>
				<button onClick={()=>this.add()}>add</button>
				<ul>
				{this.state.list.map((item,index)=><li key={item.id}>{item.text} <button onClick={()=>this.delete(index)}>delete</button></li>)}
				</ul>
				{this.state.list.length<1?<div>暂无待办事项</div>:null}
			</div>
		)
	}
	add(){
		let newlist = this.state.list
		newlist.push({
			id:Date.now(),
			text:this.mytext.current.value})
		this.setState({
			list:newlist
		})
		this.mytext.current.value=""
	}
	delete(index){
		let newlist = this.state.list
		newlist.splice(index,1)
		this.setState({
			list:newlist
		})
	}
}
```

#### 资源的挂载与卸载

在具有许多组件的应用程序中，在销毁时释放组件所占用的资源非常重要。

生命周期函数里适合用来发送ajax请求。

每当 Clock 组件第一次加载到 DOM 中的时候，我们都想生成定时器，这在 React 中被称为**挂载**。

同样，每当 Clock 生成的这个 DOM 被移除的时候，我们也会想要清除定时器，这在 React 中被称为**卸载**。

我们可以在组件类上声明特殊的方法，当组件挂载或卸载时，来运行一些代码：

```react
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
 
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
 
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
 
  tick() {
    this.setState({
      date: new Date()
    });
  }
 
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>现在是 {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
 
ReactDOM.createRoot(document.getElementById('example')).render(<Clock />);
```

**实例解析：**

**`componentDidMount()`** 与 **`componentWillUnmount()`** 方法被称作生命周期钩子。

在组件输出到 DOM 后会执行 **componentDidMount()** 钩子，我们就可以在这个钩子上设置一个定时器。

this.timerID 为定时器的 ID，我们可以在 **componentWillUnmount()** 钩子中卸载定时器。

**代码执行顺序：**

- 当 `<Clock />` 被传递给 `ReactDOM.render()` 时，React 调用 `Clock` 组件的构造函数。 由于 `Clock` 需要显示当前时间，所以使用包含当前时间的对象来初始化 `this.state` 。 我们稍后会更新此状态。

- React 然后调用 `Clock` 组件的 `render()` 方法。这是 React 了解屏幕上应该显示什么内容，然后 React 更新 DOM 以匹配 `Clock` 的渲染输出。

- 当 `Clock` 的输出插入到 DOM 中时，React 调用 `componentDidMount()` 生命周期钩子。 在其中，`Clock` 组件要求浏览器设置一个定时器，每秒钟调用一次 `tick()`。

- 浏览器每秒钟调用 `tick()` 方法。 在其中，`Clock` 组件通过使用包含当前时间的对象调用 `setState()` 来调度UI更新。 通过调用 `setState()` ，React 知道状态已经改变，并再次调用 `render()` 方法来确定屏幕上应当显示什么。 这一次，`render()` 方法中的 `this.state.date` 将不同，所以渲染输出将包含更新的时间，并相应地更新 DOM。

- 一旦 `Clock` 组件被从 DOM 中移除，React 会调用 `componentWillUnmount()` 这个钩子函数，定时器也就会被清除。

#### 数据自顶向下流动

父组件或子组件都不能知道某个组件是有状态还是无状态，并且它们不应该关心某组件是被定义为一个函数还是一个类。

在React中，数据是自顶向下流动的，即父组件到子组件，这条原则让组件之间的关系变得简单且可预测。

state与props是React组件中最重要的概念。如果顶层组件初始化props，那么React只会向下遍历整棵组件树，重新渲染相关的子组件，而state只关心每个组件自己内部的状态，这些状态只能在组件内改变。<font color="green">把组件看成一个函数，那么它接受了props作为参数，内部由state作为函数的内部参数，返回Virtual DOM的实现。</font>

这就是为什么状态通常被称为局部或封装。 除了拥有并设置它的组件外，其它组件不可访问。

**vue也是单向数据流，**父组件可以向子组件传递props，但是子组件不能修改父组件传递来的props，子组件只能通过事件通知（emit）父组件进行数据更改。因为当父组件 可能存在多个子组件,假如子组件可以修改父组件的数据,那么会导致其他依赖父组件的子组件都会受到影响。这样可以防止从子组件意外改变父及组件的状态,从而导致你的应用的数据流向难以理解。

以下实例中 FormattedDate 组件将在其属性中接收到 date 值，并且不知道它是来自 Clock 状态、还是来自 Clock 的属性、亦或手工输入：  

```react
function FormattedDate(props) {
  return <h2>现在是 {props.date.toLocaleTimeString()}.</h2>;
}
 
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
 
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
 
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
 
  tick() {
    this.setState({
      date: new Date()
    });
  }
 
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <FormattedDate date={this.state.date} />
      </div>
    );
  }
}
 
ReactDOM.createRoot(document.getElementById('example')).render(<Clock />);
```

这通常被称为**自顶向下或单向数据流。** 任何状态始终由某些特定组件所有，并且从该状态导出的任何数据或 UI 只能影响树中下方的组件。

如果你想象一个组件树作为属性的瀑布，每个组件的状态就像一个额外的水源，它连接在一个任意点，但也流下来。

再比如实现一个计数器组件：

 ```react
import React,{ Component } from 'React';
 
class Counter extends Component {
    constructor(props) {  //初始化
        super(props);
        this.handleClick = this.handleClick.bind(this);
            //这里要绑定this指向的原因在事件处理部分已解答

        this.state = {
            count: 0,
        };
    }
    handleClick(e){   //
        e.preventDefault();
        this.setState({
            count: this.state.count + 1;
        });
    }
    render() {  
        return (
            <div>
            <p>{this.state.count}</p>
            <a href="#" onClick={this.handleClick}>更新</a>
            </div>
        );    
    }
}
 ```

a标签中监听点击事件，点击则执行handleClick，实现了点击一次计数加一。state中的count就是我们需要操作的数据。

为了表明所有组件都是真正隔离的，我们可以创建一个 App 组件，它渲染三个Clock：

```react
function FormattedDate(props) {
  return <h2>现在是 {props.date.toLocaleTimeString()}.</h2>;
}
 
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
 
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
 
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
 
  tick() {
    this.setState({
      date: new Date()
    });
  }
 
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <FormattedDate date={this.state.date} />
      </div>
    );
  }
}
 
function App() {
  return (
    <div>
      <Clock />
      <Clock />
      <Clock />
    </div>
  );
}
 
ReactDOM.createRoot(document.getElementById('example')).render(<App />);
```

以上实例中每个 Clock 组件都建立了自己的定时器并且独立更新。

在 React 应用程序中，组件是有状态还是无状态被认为是可能随时间而变化的组件的实现细节。

我们可以在有状态组件中使用无状态组件，也可以在无状态组件中使用有状态组件。

state是用来管理组件自身内部状态的。当组件内部使用库内置的setState方法时，最大的表现行为就是该组件会尝试重新渲染。这很好理解，因为我们改变了内部状态，组件需要更新了。

**React函数式组件是利用hooks有了自己的状态（从React 16.7后），它们使我们无需编写类即可使用状态和其他React功能**

### hooks

#### hooks 的优势是什么

- 简化组件逻辑
- 复用状态逻辑
- 使用了无状态组件，但又需要状态时

#### 常用 hooks

**useState、useEffect、useRef**

### props

props是React中另一个重要的概念，它是properties的缩写。props是React用来让组件之间相互联系的一种机制，通俗地说就像方法的参数一样。

**props本身是不可变的。**当我们试图改变props的原始值时，React会报出类型错误的警告。这就是state和props主要的区别，props是不可变的，而state可以根据与用户交互来改变。这就是为什么有些容器组件需要定义state来更新和修改数据，而子组件只能通过props来传递数据。     

React追求直观，所以在定义内容区域只显示子组件的集合，而把具体的功能留给子组件去实现。

以下演示了如何在组件中使用props:

```react
function HelloMessage(props) {
    return <h1>Hello {props.name}!</h1>;
}
 
const element = <HelloMessage name="Runoob"/>;
 
ReactDOM.createRoot(document.getElementById('example')).render(element);
```

#### 默认Props

还可以通过组件类的defaultProps属性为props设置默认值，实例如下：

```react
class HelloMessage extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}
 
HelloMessage.defaultProps = {
  name: 'Runoob'
};
 
const element = <HelloMessage/>;
 
ReactDOM.createRoot(document.getElementById('example')).render(element);
```

#### state和Props

以下实例演示了如何在应用中组合使用 state 和 props 。我们可以在父组件中设置 state， 并通过在子组件上使用 props 将其传递到子组件上。在 render 函数中, 我们设置 name 和 site 来获取父组件传递过来的数据。

```react
class WebSite extends React.Component {
  constructor() {
      super();
 
      this.state = {
        name: "菜鸟教程",
        site: "https://www.runoob.com"
      }
    }
  render() {
    return (
      <div>
        <Name name={this.state.name} />
        <Link site={this.state.site} />
      </div>
    );
  }
}
 
 
 
class Name extends React.Component {
  render() {
    return (
      <h1>{this.props.name}</h1>
    );
  }
}
 
class Link extends React.Component {
  render() {
    return (
      <a href={this.props.site}>
        {this.props.site}
      </a>
    );
  }
}
 
ReactDOM.createRoot(document.getElementById('example')).render(WebSite);
```

#### Props验证

**React.PropTypes 在 React v15.5 版本后已经移到了prop-types库。**

Props 验证使用 **propTypes**，它可以保证我们的应用组件被正确使用，React.PropTypes 提供很多验证器 (validator) 来验证传入数据是否有效。当向 props 传入无效数据时，JavaScript 控制台会抛出警告。

以下实例创建一个 Mytitle 组件，属性 title 是必须的且是字符串，非字符串类型会自动转换为字符串 ：

```react
import React, { Component } from 'react'
import PropTypes from 'prop-types'
var title = "菜鸟教程";
// var title = 123;
class MyTitle extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.title}</h1>
    );
  }
}
 
MyTitle.propTypes = {
  title: PropTypes.string
};
ReactDOM.createRoot(document.getElementById('example')).render(<MyTitle title={title} />);
```

或写成如下：

```react
var title = "菜鸟教程";
// var title = 123;
var MyTitle = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
  },
 
  render: function() {
     return <h1> {this.props.title} </h1>;
   }
});
ReactDOM.createRoot(document.getElementById('example')).render(<MyTitle title={title} />);
```

 更多验证器说明如下：

```react
MyComponent.propTypes = {
    // 可以声明 prop 为指定的 JS 基本数据类型，默认情况，这些数据是可选的
   optionalArray: React.PropTypes.array,
    optionalBool: React.PropTypes.bool,
    optionalFunc: React.PropTypes.func,
    optionalNumber: React.PropTypes.number,
    optionalObject: React.PropTypes.object,
    optionalString: React.PropTypes.string,
 
    // 可以被渲染的对象 numbers, strings, elements 或 array
    optionalNode: React.PropTypes.node,
 
    //  React 元素
    optionalElement: React.PropTypes.element,
 
    // 用 JS 的 instanceof 操作符声明 prop 为类的实例。
    optionalMessage: React.PropTypes.instanceOf(Message),
 
    // 用 enum 来限制 prop 只接受指定的值。
    optionalEnum: React.PropTypes.oneOf(['News', 'Photos']),
 
    // 可以是多个对象类型中的一个
    optionalUnion: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
      React.PropTypes.instanceOf(Message)
    ]),
 
    // 指定类型组成的数组
    optionalArrayOf: React.PropTypes.arrayOf(React.PropTypes.number),
 
    // 指定类型的属性构成的对象
    optionalObjectOf: React.PropTypes.objectOf(React.PropTypes.number),
 
    // 特定 shape 参数的对象
    optionalObjectWithShape: React.PropTypes.shape({
      color: React.PropTypes.string,
      fontSize: React.PropTypes.number
    }),
 
    // 任意类型加上 `isRequired` 来使 prop 不可空。
    requiredFunc: React.PropTypes.func.isRequired,
 
    // 不可空的任意类型
    requiredAny: React.PropTypes.any.isRequired,
 
    // 自定义验证器。如果验证失败需要返回一个 Error 对象。不要直接使用 `console.warn` 或抛异常，因为这样 `oneOfType` 会失效。
    customProp: function(props, propName, componentName) {
      if (!/matchme/.test(props[propName])) {
        return new Error('Validation failed!');
      }
    }
  }
}
```

二者结合实现

```react
import React, { Component } from 'react'
import PropTypes from 'prop-types'
export default class Navbar extends Component {
	state = {
		
	}
	render() {
		return (
			<div>
			{this.props.leftshow && <button>返回</button>}
			nav-bar{this.props.title}
			{!this.props.leftshow && <button>home</button>}
			</div>
		)
	}
}
Navbar.protoTypes = {
	title:PropTypes.string,
	leftshow:PropTypes.bool,
}
Navbar.defaultProps = {
	leftshow:false
}
```

![image-20220623122356712](React%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0.assets/image-20220623122356712.png)

#### 属性vs状态

二者都是纯js对象，都会触发render更新，都具有确定性（状态/属性相同，结果相同）

**不同点：**

- 属性能从父组件获取，状态不能
- 属性可以由父组件修改，状态不能
- 属性能在内部设置默认值，状态也可以，设置方式不一样
- 属性不在组件内部修改，状态要在组件内部修改
- 属性能设置子组件初始值，状态不可以
- 属性可以修改子组件的值，状态不可以

state的主要作用是用于组件保存、控制、修改自己的可变状态。state在组件内部初始化，可以被组件自身修改，而外部不能访问也不能修改/你可以认为state是一个局部的、只能被组件自身控制的数据源，state中状态可以通过`this.setState`方法进行更新，`setState`会导致组件的重新渲染。

props的主要作用是让使用该组件的父组件可以传入参数来配置该组件/它是外部传进来的配置参数。组件内部无法控制也无法修改，除非外部组件主动传入新的props，否则组件的props永远保持不变。

没有state的组件叫无状态组件，设置了state的叫做有状态组件。因为状态会带来管理的复杂性，我们尽量多写无状态组件，尽量少些有状态的组件，这样会降低维护代码的难度，也会在一定程度上增强组件的可复用性。

###  事件处理

如下这种是将方法放在onClick里面定义

```react
import React, { Component } from 'react'

export default class List extends Component {
	render() {
		return (
			<div>
				<input />
				<button onClick={()=>{
					console.log('click')
				}}>add</button>
			</div>
		)
	}
}
```

**或者外部定义**

```react
import React, { Component } from 'react'

export default class List extends Component {
	render() {
		return (
			<div>
				<input />
				<button onClick={ this.handleClick }>add</button>
			</div>
		)
	}
	handleClick(){
		console.log("click")
	}
}
```

 **注：**{}引用的函数后千万不能加小括号()，否则就会立即执行，还没点击按钮就执行，而且函数名前要加this.

**再或者写成这样**

```react
<button onClick={ ()=>this.handleClick() }>add</button>
```

利用箭头函数的方式写，当点击后触发箭头函数，箭头函数中立即调用方法。

如上三种方法都可以 绑定事件，但是有一些区别，就是this指向的不同。

比如利用箭头函数绑定方法虽然看起来必要性不大，写起来没有直接绑定外部定义的方法简便，但是它有一点好处，就是this指向始终和外部一致，即和render函数一致，当你想要在`onClick`事件中，打印App组件（类）的某一个属性，比如this.a，利用箭头函数就不用考虑this指向是否正确的问题。

```react
export default class List extends Component{
    a=100;
	render() {
		return (
<button onClick={ ()=>{console.log(this.a)} }>add</button>
      )
    }
}
```

比如上面这个例子，利用箭头函数就不用考虑a会找不到的问题，可以正确打印出100，为访问状态打好了基础。

但如果不使用箭头函数，且想要访问a属性，直接`onClick={ this.handleClick}`就会在控制台报错，如下

```react
export default class List extends Component {
	a = 100
	render() {
		return (
			<div>
				<input />
				<button onClick={ this.handleClick }>add</button>
			</div>
		)
	}
	handleClick(){
		console.log("click",this.a)
	}
}
```

![image-20220617112433922](React%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0.assets/image-20220617112433922.png)

然后我们试着在handleClick方法中，打印一下它的this指向

```react
handleClick(){
		console.log("click",this)
	}
```

结果如下

![image-20220617112605524](React%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0.assets/image-20220617112605524.png)

所以上面报错便可以解释了，this指向当前是undefined，当然读取不了a属性，连this指向都undefined，怎么读取this.a呢?

那这种方法怎么让它的this指向指向这个App实例呢？

我们需要用到bind来**修正指向**。

```react
export default class List extends Component {
	a = 100
	render() {
		return (
			<div>
				<input />
				<button onClick={ this.handleClick.bind(this)}>add</button>
			</div>
		)
	}
	handleClick(){
		console.log("click",this)
	}
}
```

这时我们就能发现，this已经指向这个App实例了，就解决了this指向的问题。

**注：**不能使用apply或者call来改变this指向，因为使用apply和call改变指向后会直接调用此方法，而我们需要的只是绑定指向，不是直接调用，就好比之前不加()一样，让它触发事件后再调用方法而不是直接调用。

**综上所述**，我们推荐第一种或者第三种写法（箭头函数）,当逻辑过多时，使用第三种，逻辑较少时写成第一种。我们不推荐第二种写法，因为这种写法需要bind来修正this指向问题。

**React的事件绑定和原生的事件绑定有什么区别呢？**

在React中，并不会真正的绑定事件到每一个具体的DOM节点（元素）上，因为绑定在每一个DOM上是比较消耗内存的，它采用的是事件代理的模式。

#### event对象

和普通浏览器一样，事件handler会被自动传入一个event对象，这个对象和普通的浏览器event对象所包含的方法和属性都基本一致，不同的是React中的event对象并不是浏览器提供的，而是它自己内部所构建的。它同样具有`event.stopPropagation`、`event.preventDefault`这种常用方法。

**提示：**`event.stopPropagation`方法是用来**阻止当前事件在DOM树上冒泡**。使用stopPropagation()函数可以阻止当前事件向祖辈元素的冒泡传递，也就是说该事件不会触发执行当前元素的任何祖辈元素的任何事件处理函数。

该函数只阻止事件向祖辈元素的传播，不会阻止该元素自身绑定的其他事件处理函数的函数。`event.preventDefault()`方法是用于取消事件的默认行为，例如，当点击提交按钮时阻止对表单的提交。但此方法并不被ie支持，在ie下需要用`window.event.returnValue = false; `来实现。

