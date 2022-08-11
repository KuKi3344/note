## React 灵魂 23 问

### 1、setState 是异步还是同步？

1. 合成事件中是异步
2. 钩子函数中的是异步
3. 原生事件中是同步
4. setTimeout中是同步

### 2、聊聊 react@16.4 + 的生命周期



![img](https://pic3.zhimg.com/80/v2-34344a720b3e38ff64e2a26c2089680a_720w.jpg)

### 3、useEffect(fn, []) 和 componentDidMount 有什么差异？

`useEffect` 会捕获 `props` 和 `state`。所以即便在回调函数里，你拿到的还是初始的 `props` 和 `state`。如果想得到“最新”的值，可以使用 `ref`。

**那么useEffect和useLayoutEffect有什么区别？**简单来说就是调用时机不同，useLayoutEffect和原来componentDidMount&componentDidUpdate一致，在react完成DOM更新后马上同步调用的代码，会阻塞页面渲染。而useEffect是会在整个页面渲染完才会调用的代码。

官方建议优先使用useEffect

在实际使用时如果想避免页面抖动（在useEffect里修改DOM很有可能出现）的话，可以把需要操作DOM的代码放在useLayoutEffect里。关于使用useEffect导致页面抖动，参考git仓库git仓库示例。

不过useLayoutEffect在服务端渲染时会出现一个warning，要消除的话得用useEffect代替或者推迟渲染时机。

使用 这两个`hook`用法一致，第一个参数是回调函数，第二个参数是数组，数组的内容是依赖项`deps`,依赖项改变后执行回调函数；注意组件每次渲染会默认执行一次,如果不传第二个参数只要该组件有`state`改变就会触发回调函数,如果传一个空数组，只会在初始化执行一次。另外，如果用`return`返回了一个函数，组件每次重新渲染的时候都会先执行该函数再调用回调函数。

区别 表面上看，这两个`hook`的区别是执行时机不同，`useEffect`的回调函数会在页面渲染后执行；`useLayoutEffect`会在页面渲染前执行。实际上是`React`对这两个`hook`的处理不同，`useEffect`是异步调用，而`useLayoutEffect`是同步调用。 
那什么时候用`useEffect`，什么时候用`useLayoutEffect`呢？ 
我的理解是视情况而定 如果回调函数会修改`state`导致组件重新渲染,可以`useLayoutEffect`，因为这时候用`useEffect`可能会造成页面闪烁； 如果回调函数中去请求数据或者js执行时间过长，建议使用`useEffect`；因为这时候用`useLayoutEffect`堵塞浏览器渲染。

### 4、hooks 为什么不能放在条件判断里？

以 `useState` 为例，在 react 内部，每个组件(Fiber)的 hooks 都是以链表的形式存在 `memoizeState` 属性中：

![](React%20%E7%81%B5%E9%AD%82%2023%20%E9%97%AE.assets/v2-757dcc426ac298ac8d82306ff48f801c_720w.jpg)

update 阶段，每次调用 `useState`，链表就会执行 next 向后移动一步。如果将 `useState` 写在条件判断中，假设条件判断不成立，没有执行里面的 `useState` 方法，会导致接下来所有的 `useState` 的取值出现偏移，从而导致异常发生。

### 5、fiber 是什么？

**React Fiber 是一种基于浏览器的单线程调度算法。**

React Fiber 用类似 `requestIdleCallback` 的机制来做异步 diff。但是之前数据结构不支持这样的实现异步 diff，于是 React 实现了一个类似链表的数据结构，将原来的 递归diff 变成了现在的 遍历diff，这样就能做到异步可更新了。



![img](React%20%E7%81%B5%E9%AD%82%2023%20%E9%97%AE.assets/v2-8e691022bf76747599b85f7c7797206b_720w.jpg)

### 6、聊一聊 diff 算法

传统 diff 算法的时间复杂度是 O(n^3)，这在前端 render 中是不可接受的。为了降低时间复杂度，react 的 diff 算法做了一些妥协，放弃了最优解，最终将时间复杂度降低到了 O(n)。

那么 react diff 算法做了哪些妥协呢？，参考如下：

1、tree diff：只对比同一层的 dom 节点，忽略 dom 节点的跨层级移动

如下图，react 只会对相同颜色方框内的 DOM 节点进行比较，即同一个父节点下的所有子节点。当发现节点不存在时，则该节点及其子节点会被完全删除掉，不会用于进一步的比较。

这样只需要对树进行一次遍历，便能完成整个 DOM 树的比较。



![img](React%20%E7%81%B5%E9%AD%82%2023%20%E9%97%AE.assets/v2-d2cb592bc4da53a85dbf6cef2dd7c9ee_720w.jpg)



这就意味着，如果 dom 节点发生了跨层级移动，react 会删除旧的节点，生成新的节点，而不会复用。

2、component diff：如果不是同一类型的组件，会删除旧的组件，创建新的组件



![img](React%20%E7%81%B5%E9%AD%82%2023%20%E9%97%AE.assets/v2-d8d3646da454398e0defacb61b5e1081_720w.jpg)



3、element diff：对于同一层级的一组子节点，需要通过唯一 id 进行来区分

如果没有 id 来进行区分，一旦有插入动作，会导致插入位置之后的列表全部重新渲染。

这也是为什么渲染列表时为什么要使用唯一的 key。

### 7、调用 setState 之后发生了什么？

1. 在 `setState` 的时候，React 会为当前节点创建一个 `updateQueue` 的更新列队。
2. 然后会触发 `reconciliation` 过程，在这个过程中，会使用名为 Fiber 的调度算法，开始生成新的 Fiber 树， Fiber 算法的最大特点是可以做到异步可中断的执行。
3. 然后 `React Scheduler` 会根据优先级高低，先执行优先级高的节点，具体是执行 `doWork` 方法。
4. 在 `doWork` 方法中，React 会执行一遍 `updateQueue` 中的方法，以获得新的节点。然后对比新旧节点，为老节点打上 更新、插入、替换 等 Tag。
5. 当前节点 `doWork` 完成后，会执行 `performUnitOfWork` 方法获得新节点，然后再重复上面的过程。
6. 当所有节点都 `doWork` 完成后，会触发 `commitRoot` 方法，React 进入 commit 阶段。
7. 在 commit 阶段中，React 会根据前面为各个节点打的 Tag，一次性更新整个 dom 元素。··

### 8、为什么虚拟dom 会提高性能?

核心思想就是将真实dom映射为js的object，通过捕获收集object的差异，将对dom的操作一次性压入DocumentFragment，等待下一次事件循环再进行reflow，这样就有效减少了dom的操作次数，提升了渲染效率。牺牲js计算消耗的一些性能换取操作真实dom消耗的性能，从而提高性能

### 9、错误边界是什么？它有什么用？

在 React 中，如果任何一个组件发生错误，它将破坏整个组件树，导致整页白屏。这时候我们可以用错误边界优雅地降级处理这些错误。

### 11、React 组件间有那些通信方式?

**父组件向子组件通信**

1、 通过 props 传递

**子组件向父组件通信**

1、 主动调用通过 props 传过来的方法，并将想要传递的信息，作为参数，传递到父组件的作用域中

**跨层级通信**

1、 使用 react 自带的 `Context` 进行通信，`createContext` 创建上下文， `useContext` 使用上下文。

2、使用 Redux 或者 Mobx 等状态管理库

3、使用订阅发布模式

### 12、React 父组件如何调用子组件中的方法？

1、如果是在方法组件中调用子组件（`>= react@16.8`），可以使用 `useRef` 和 `useImperativeHandle`:

```react
const { forwardRef, useRef, useImperativeHandle } = React;

const Child = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    getAlert() {
      alert("getAlert from Child");
    }
  }));
  return <h1>Hi</h1>;
});

const Parent = () => {
  const childRef = useRef();
  return (
    <div>
      <Child ref={childRef} />
      <button onClick={() => childRef.current.getAlert()}>Click</button>
    </div>
  );
};
```

2、如果是在类组件中调用子组件（`>= react@16.4`），可以使用 `createRef`:

```react
const { Component } = React;

class Parent extends Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
  }

  onClick = () => {
    this.child.current.getAlert();
  };

  render() {
    return (
      <div>
        <Child ref={this.child} />
        <button onClick={this.onClick}>Click</button>
      </div>
    );
  }
}

class Child extends Component {
  getAlert() {
    alert('getAlert from Child');
  }

  render() {
    return <h1>Hello</h1>;
  }
}
```

参考阅读： [Call child method from parent](https://link.zhihu.com/?target=https%3A//stackoverflow.com/questions/37949981/call-child-method-from-parent)

### 13、React有哪些优化性能的手段?

**类组件中的优化手段**

1、使用纯组件 `PureComponent` 作为基类。

2、使用 `React.memo` 高阶函数包装组件。

3、使用 `shouldComponentUpdate` 生命周期函数来自定义渲染逻辑。

**方法组件中的优化手段**

1、使用 `useMemo`。

2、使用 `useCallBack`。

（最后面会有解释）

**其他方式**

1、在列表需要频繁变动时，使用唯一 id 作为 key，而不是数组下标。

2、必要时通过改变 CSS 样式隐藏显示组件，而不是通过条件判断显示隐藏组件。

3、使用 `Suspense` 和 `lazy` 进行懒加载，例如：

### 14、为什么 React 元素有一个 $$typeof 属性？



![img](React%20%E7%81%B5%E9%AD%82%2023%20%E9%97%AE.assets/v2-1d9e3361bd9ec0f42db7af5192497eb1_720w.jpg)



目的是为了防止 XSS 攻击。因为 Synbol 无法被序列化，所以 React 可以通过有没有 $$typeof 属性来断出当前的 element 对象是从数据库来的还是自己生成的。

如果没有 $$typeof 这个属性，react 会拒绝处理该元素。

在 React 的古老版本中，下面的写法会出现 XSS 攻击：

```js
// 服务端允许用户存储 JSON
let expectedTextButGotJSON = {
  type: 'div',
  props: {
    dangerouslySetInnerHTML: {
      __html: '/* 把你想的搁着 */'
    },
  },
  // ...
};
let message = { text: expectedTextButGotJSON };

// React 0.13 中有风险
<p>
  {message.text}
</p>
```

### 15、React 如何区分 Class组件 和 Function组件？

一般的方式是借助 typeof 和 Function.prototype.toString 来判断当前是不是 class，如下：

```ts
function isClass(func) {
  return typeof func === 'function'
    && /^class\s/.test(Function.prototype.toString.call(func));
}
```

但是这个方式有它的局限性，因为如果用了 babel 等转换工具，将 class 写法全部转为 function 写法，上面的判断就会失效。

React 区分 Class组件 和 Function组件的方式很巧妙，由于所有的类组件都要继承 React.Component，所以只要判断原型链上是否有 React.Component 就可以了：

```ts
AComponent.prototype instanceof React.Component
->Component.prototype.isReactComponent
```

### 16、HTML 和 React 事件处理有什么区别?

在 HTML 中事件名必须小写：

```html
<button onclick='activateLasers()'>
```

而在 React 中需要遵循驼峰写法：

```text
<button onClick={activateLasers}>
```

在 HTML 中可以返回 false 以阻止默认的行为：

```html
<a href='#' onclick='console.log("The link was clicked."); return false;' />
```

而在 React 中必须地明确地调用 `preventDefault()`：

```ts
function handleClick(event) {
  event.preventDefault()
  console.log('The link was clicked.')
}
```

### 18、为什么 JSX 中的组件名要以大写字母开头？

因为 React 要知道当前渲染的是组件还是 HTML 元素。

### 19、redux 是什么？

Redux 是一个为 JavaScript 应用设计的，可预测的状态容器。

它解决了如下问题：

- 跨层级组件之间的数据传递变得很容易
- 所有对状态的改变都需要 dispatch，使得整个数据的改变可追踪，方便排查问题。

但是它也有缺点：

- 概念偏多，理解起来不容易
- 样板代码太多

## useMemo && useCallback

这两个`hook`可用于性能优化，减少组件的重复渲染；现在就来看看这两个神奇的`hook`怎么用。

- uesMemo

```js
function MemoDemo() {
    let [count, setCount] = useState(0);
    let [render,setRender] = useState(false)
    const handleAdd = () => {
        setCount(count + 1);
    };
    const Childone = () => {
        console.log("子组件一被重新渲染");
        return <p>子组件一</p>;
    };
    const Childtwo = (props) => {
        return (
            <div>
                <p>子组件二</p>
                <p>count的值为：{props.count}</p>
            </div>
        );
    };
    const handleRender = ()=>{
        setRender(true)
    }
    return (
        <div style={{display:"flex",justifyContent:'center',alignItems:'center',height:'100vh',flexDirection:'column'}}>
            {
                useMemo(() => {
                    return <Childone />
                }, [render])
            }
            <Childtwo count={count} />
            <button onClick={handleAdd}>增加</button>
            <br/>
            <button onClick={handleRender} >子组件一渲染</button>
        </div>
    );
}
复制代码
```

`Childone`组件只有`render`改变才会重新渲染

这里顺带讲下，`React.memo`,用`React.memo`包裹的组件每次渲染时会和`props`会和旧的`props`进行浅比较，如果没有变化则组件不渲染；示例如下

```js
const Childone = React.memo((props) => {
    console.log("子组件一被重新渲染",props);
    return <p>子组件一{props.num}</p>;
})
function MemoDemo() {
    let [count, setCount] = useState(0);
    let [render,setRender] = useState(false)
    let [num,setNum] = useState(2)
    const handleAdd = () => {
        setCount(count + 1);
    };
   
    const Childtwo = (props) => {
        return (
            <div>
                <p>子组件二</p>
                <p>count的值为：{props.count}</p>
            </div>
        );
    };
    const handleRender = ()=>{
        setRender(true)
    }
    return (
        <div style={{display:"flex",justifyContent:'center',alignItems:'center',height:'100vh',flexDirection:'column'}}>
            {/* {
                useMemo(() => {
                    return <Childone />
                }, [render])
            } */}
            <Childone num={num}/>
            <Childtwo count={count} />
            <button onClick={handleAdd}>增加</button>
            <br/>
            <button onClick={handleRender} >子组件一渲染</button>
        </div>
    );
}

复制代码
```

这个例子是把上个例子中的`Childone`拆出来套上`React.memo`的结果，点击增加后组件不会该组件不会重复渲染，因为`num`没有变化

- useCallback 还是上面那个例子，我们把`handleRender`用`useCallback`包裹，也就是说这里`num`不变化每次都会传同一个函数，若是这里不用`useCallback`包裹，每次都会生成新的`handleRender`，导致`React.memo`函数中的`props`浅比较后发现生成了新的函数，触发渲染

```js
const Childone = React.memo((props) => {
    console.log("子组件一被重新渲染",props);
    return <p>子组件一{props.num}</p>;
})
export default function MemoDemo() {
    let [count, setCount] = useState(0);
    let [render,setRender] = useState(false)
    let [num,setNum] = useState(2)
    const handleAdd = () => {
        setCount(count + 1);
    };
   
    const Childtwo = (props) => {
        return (
            <div>
                <p>子组件二</p>
                <p>count的值为：{props.count}</p>
            </div>
        );
    };
    const handleRender = useCallback(()=>{
        setRender(true)
    },[num])
    return (
        <div style={{display:"flex",justifyContent:'center',alignItems:'center',height:'100vh',flexDirection:'column'}}>
            {/* {
                useMemo(() => {
                    return <Childone />
                }, [render])
            } */}
            <Childone num={num} onClick={handleRender}/>
            <Childtwo count={count} />
            <button onClick={handleAdd}>增加</button>
            <br/>
            <button onClick={handleRender} >子组件一渲染</button>
        </div>
    );
}
```

