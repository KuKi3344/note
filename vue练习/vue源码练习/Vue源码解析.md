# Vue源码解析

### Vue数据代理

通过vm对象来代理data对象中所有属性的操作

**基本实现流程：**

- 通过Object.defineProperty()给vm添加与data对象属性对应的属性描述符
- 所有添加的属性都包含 getter/setter
- getter/setter 内部去操作data中对应的属性数据

**源码实现：**

先创建vue的实例对象vm，然后在data中添加name，打印`vm.name`与`vm`

```js
		var vm = new Vue({
			el:'#container',
			data:{
				id:1,
				name:'lulu'
			}
		})
		console.log(vm.id,vm.name,vm);
```

![1](img/1.png)

打印的vm结果中的name现在还看不见值，鼠标悬浮上去显示`Invoke property getter`，即为调用属性的getter，也就是说它的属性本身没有存值，而是通过getter去 _data里取值，点开后，显示了name的值，再往下看，出现了`get name`和`set name`方法，用来去 _data里面取数据`

```js
console.log(vm.name,vm);	//lulu	读操作
vm.name = 'minmin';		    //写操作
console.log(vm._data.name,vm.name);	//minmin
```

打印vm._data.name的值，可以直接打印出name的值(等同于vm.name)，现在这就是用到了数据代理，打印时，vm代理对data数据的读操作，赋值时vm代理了对数据的写操作

现在不引入vue，通过引入MVVM的js来实现数据代理

```html
		<div id="container"></div>
		<script src="../mvvm/compile.js"></script>
		<script src="../mvvm/mvvm.js"></script>
		<script src="../mvvm/observer.js"></script>
		<script src="../mvvm/watcher.js"></script>
		<script>
		var vm = new MVVM({
			el:'#container',
			data:{
				name:'lulu'
			}
		})
		console.log(vm._data.name,vm);
		vm.name = 'minmin';
		console.log(vm.name);
```

将js引入，把Vue改成MVVM（现在不用Vue来实现，而是只用MVVM思想来实现，也可以接着用Vue或者其它名称，但对应的要去找引入的js中相应的函数源码修改名称），打印结果如下

![2](img/2.png)

也是有`get name`与`set name`方法，也有 _data，和之前一样，可以看出这个库也可以实现数据代理的效果，结果是没有什么问题的，现在开始通过debug分析结果

进入构造MVVM对象的函数

![4](img/4.png)

进入 _proxy函数，查看如何进行数据代理

**数据代理核心源码：**

![3](img/3.png)

给vm对象添加属性：通过`defineProperty`实现，给vm实例对象添加属性（通过数据描述符的方式添加）

configurable：意为定义完后不能再修改（增加安全性，防止被恶意修改）

enumerable：可枚举（可遍历）

最重要的是get和set方法，我们通过vm.name去读这个结果，就调用get，修改vm.name，就调用set方法，数据最终保存在 _data里面。数据代理就此实现。

**注意：**`console.log(vm._data.name)`不会触发get方法（不需要代理），`console.log(vm.name)`会触发



