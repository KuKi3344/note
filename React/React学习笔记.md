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