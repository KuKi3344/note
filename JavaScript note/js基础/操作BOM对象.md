# JavaScript

### （*）操作BOM对象

> 浏览器介绍

JavaScript 和浏览器的关系

JavaScript诞生就是为了能够让它再浏览器中运行

BOM：浏览器对象模型

- IE 6-11
- Chrome
- Safari
- FireFox
- Opera

三方

- QQ浏览器
- 360浏览器

>window(*)

window 代表浏览器窗口

```js
window.outerwidth
919	//外部宽度
```

> Navigator（不建议使用）

Navigator 封装了浏览器的信息

```js
navigator.platform
"win32"
```

大多数时候，我们不会使用`nabigator`对象，因为会被人为修改

不建议使用这些属性来判断和编写代码

> screen

代表屏幕尺寸

```js
screen.width
1920
screen.height
1080
```

> location(*)

location 代表当前页面的URL信息

```js
host:"www.baidu.com"
href:"https://www.baidu.com/"
protocol:"https:"
reload:f reload() //刷新网页
//设置新的地址
location.assign('https://xxxx.com')
// 会直接调转到这个网址
```

> document（文本内容）

document 代表当前的页面，HTML DOM文档树

```js
document.title
"百度一下，你就知道"
document.title='你好'
"你好"
```

获取具体的文档树节点

```js
<dl id="app">
    <dt>JAVA</dt>
	<dd>javase</dd>
	<dd>javaee</dd>
</dl>
<script>
    var dl = document.getElementById('app');
</script>
```

作用：能动态增删节点，动态修改网页

获取cookie

```js
document.cookie
"............"
```

劫持cookie原理

www.taobao.com

```js
<script src = "aa.js"></script>
//恶意人员窃取你的cookie上传到他的服务器
```

服务器端可以设置cookie：httpOnly //只读

> history（不建议使用）

```js
history.back() //后退
history.forward() // 前进
```



