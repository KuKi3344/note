# JavaScript

### （*）操作DOM对象

DOM：文档对象模型，

> 核心

浏览器网页就是一个DOM树形结构

- 更新：更新DOM节点
- 遍历DOM 节点：得到DOM节点
- 删除：删除一个DOM节点
- 添加：添加一个新的DOM节点

要操作一个DOM节点，就必须要先获得这个DOM节点

> 获得DOM节点

```js
var h1 = document.getElementByTagName(h1);
var p1 = document.getElementById('p1');
var p2 = document.getElementByClassName('p2');
var father = document.getElementById('father');

var childrens = father.children; // 获取父节点下的所有子节点
//father.firstChild
//father.lastChild
```

这是原生代码，之后我们尽量都使用jQuery

> 更新节点

```js
<div id = "id1">
    </div>

<script>
    var id1 = document.getElementById('id1');
</script>
```

操作文本

- `id1.innerText='456'` 修改文本的值
- ` id1.innerHTML = '<strong>123</strong>'`

操作css

```js
id1.style.color = 'yellow';	//属性使用 字符串 包裹
id.style.fontsize = '20px';	// - 转 驼峰命名问题
id1.style.padding = '2em'
```

> 删除节点

删除节点的步骤：先获取父节点，再通过父节点删除自己

```js
	var self = document.getElementById('p1');
	var father = p1.parentElement;
	father.removeChild(self)

	father.removeChild(father.Children[0])
	father.removeChild(father.Children[1])
	father.removeChild(father.Children[2])
```

注意：删除多个节点的时候，children是时刻变化的，删除时要注意。

比如先删去children[0],原来的children[1]就会变成children[0], 依次往前顶替位置

> 插入节点