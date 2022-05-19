## React学习笔记

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

### React JSX

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



