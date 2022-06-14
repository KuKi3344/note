##   React学习笔记

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
      <h1>{1+1}</h1>
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

### 组件

1.首先我们试着封装一个输出"Hello World！"的组件，组件名为HelloMessage：

```react
function HelloMessage(props){
	return <h1>Hello World!</h1>;
}
const element= <HelloMessage />;
ReactDOM.render(
	element,
	document.getElementById('example')
);
```

**实例解析：**

首先我们用函数定义了一个组件：

```react
function HelloMessage(props){
	return <h1>Hello World!</h1>;
}
```

我们也可以使用ES6 class来定义一个组件：

```react
class Welcome extends React.Component{
	render(){
		return <h1>Hello World!</h1>;
	}
}
```

2.`const element = <HelloMessage />`为用户自定义的组件。

>注意，原生 HTML 元素名以小写字母开头，而自定义的 React 类名以大写字母开头，比如 HelloMessage 不能写成 helloMessage。除此之外还需要注意组件类只能包含一个顶层标签，否则也会报错。

 此外，如果我们需要向组件传递参数，可以使用`this.props`  对象，实例如下：

```react
function HelloMessage(props){
	return <h1>Hello World!</h1>;
}
const element = <HelloMessage name="Runoob" />;
ReactDOM.render(
	element,
	document.getElementById('example');
)
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
ReactDOM.render(
	<App />,
	document.getElementById('example')
)；
```

### State(状态)

React 把组件看成是一个状态机（State Machines）。通过与用户的交互，实现不同状态，然后渲染 UI，让用户界面和数据保持一致。

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



个人认为，作用方面来说，React的State的作用和Vue的data的作用是一致的，概念上称他们为“状态”，但是其实现与用法不同，React更新状态是通过setState方法，vue里面是使用赋值操作符。vue是双向数据绑定，React是向下传递数据，Vue，当你把一个普通的 JavaScript 对象传给 Vue 实例的`data`选项，Vue 将遍历此对象所有的属性，并使用`Object.defineProperty`把这些属性全部转为`getter/setter`。从而实现响应式。React，是通过setState函数来更改属性，而setState函数是异步的，接受一个回调函数。

接下来，我们将使Clock设置自己的计时器并每秒更新一次。

#### 将生命周期方法添加到类中

在具有许多组件的应用程序中，在销毁时释放组件所占用的资源非常重要。

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
 
ReactDOM.render(
  <Clock />,
  document.getElementById('example')
);
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
 
ReactDOM.render(
  <Clock />,
  document.getElementById('example')
);
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
 
ReactDOM.render(<App />, document.getElementById('example'));
```

以上实例中每个 Clock 组件都建立了自己的定时器并且独立更新。

在 React 应用程序中，组件是有状态还是无状态被认为是可能随时间而变化的组件的实现细节。

我们可以在有状态组件中使用无状态组件，也可以在无状态组件中使用有状态组件。

state是用来管理组件自身内部状态的。当组件内部使用库内置的setState方法时，最大的表现行为就是该组件会尝试重新渲染。这很好理解，因为我们改变了内部状态，组件需要更新了。

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
 
ReactDOM.render(
    element,
    document.getElementById('example')
);
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
 
ReactDOM.render(
  element,
  document.getElementById('example')
);
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
 
ReactDOM.render(
  <WebSite />,
  document.getElementById('example')
);
```

#### Props验证

**React.PropTypes 在 React v15.5 版本后已经移到了prop-types库。**

Props 验证使用 **propTypes**，它可以保证我们的应用组件被正确使用，React.PropTypes 提供很多验证器 (validator) 来验证传入数据是否有效。当向 props 传入无效数据时，JavaScript 控制台会抛出警告。

以下实例创建一个 Mytitle 组件，属性 title 是必须的且是字符串，非字符串类型会自动转换为字符串 ：

```react
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
ReactDOM.render(
    <MyTitle title={title} />,
    document.getElementById('example')
);
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
ReactDOM.render(
    <MyTitle title={title} />,
    document.getElementById('example')
);
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

