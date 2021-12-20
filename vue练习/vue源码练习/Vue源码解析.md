#  Vue源码解析

### 数据代理

通过vm对象来代理data对象中所有属性的操作

**基本实现流程：**

- 通过Object.defineProperty()给vm添加与data对象属性对应的属性描述符
- 所有添加的属性都包含 getter/setter
- getter/setter 内部去操作data中对应的属性数据

**源码实现：**

先创建vue的实例对象vm，然后在data中添 加name，打印`vm.name`与`vm`

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

### **模板解析**

**基本流程**

- 将el的所有子节点取出，添加到一个新建的文档fragment对象中
- 对fragment中的所有层次子节点递归进行编译解析处理
  - 对大括号表达式文本节点进行解析
  - 对元素节点的指令属性进行解析
    - 时间指令解析
    - 一般指令解析

- 将解析后的fragment添加到el中显示

#### 大括号表达式

从new一个MVVM开始进入到MVVM的构造函数，首先是存储数据再变量中，然后对指定属性实现代理，紧接着就是创建一个用来编译模板的compile对象来实现模板解析。

进入Compile构造函数中，先保存el元素然后取出它的所有子节点封装在一个fragment对象中，编译fragment中所有层次子节点

![11](img/11.png)

重点是init()初始化，里面调用了compileElement函数并传入了fragment对象（即为el）

**核心源码**

![5](img/5.png)

先取出el中最外层所有子节点，遍历所有子节点，得到节点的文本内容。定义一个正则表达式去匹配大括号。判断该节点是不是文本节点并利用正则检验是不是大括号表达式，如果是的话就进入compileText函数，如果不符合这个条件但是有子节点且子节点长度不为零，就传入此时的node继续判断子节点符合不符合（递归）

compileText函数传入的参数中的`RegExp.$1`，为正则表达式中匹配到的小括号中的内容（大括号中的表达式），把它取出来，比如{{name}}，`RegExp.$1`取到的就是name。在complieText函数中嵌套了complieUtil.text()函数

![6](img/6.png)

complieUtil.text中利用bind绑定text指令![7](img/7.png)

compileUtil中包含许多指令的对应方法，但都是向bind中传入自己的参数与指令名称。为什么要传入指令名称呢？

进入bind，他调用的`updater`如下

![9](img/9.png)

当传入的value类型为未定义，那么value设为空，否则设置为value

那么bind是怎么根据不同指令调用这些方法呢？

![8](img/8.png)

这些bind里调用的相应的函数中的名字组成都是各自的指令名字加Updater组成，（例如：testUpdater），bind中的传入dir为compileUtil中传入的指令名称（指令不同传入不同的指令名称），所以当传入text时，就会定义一个updaterFn来接收updater中的textUpdater函数。然后通过判断调用是否存在来决定调用updaterFn并传入参数，借此来操控节点属性。

回到bind函数中，得到对应的更新节点函数后，<font color=green>`updaterFn && updaterFn(node,this._getVMVal(vm,exp))`</font>，意思是如果存在调用来更新节点的话，就调用updaterFn并且传入相应的参数来更新节点，如果不存在的话右边的也不执行。这是一种简洁的写法，左边存在右边就执行，左边不存在右边就不执行。这就是上面说的通过判断决定调用。

`this._getVMVal(vm,exp)`函数取到vm的data中对应的值并返回，通过updaterFn将节点的textcontent值改为返回的val值（也就是vm的data中对应的值）

**注：**写成这样是为了严谨性（比如去查找a.b.c这样的属性值，如果直接vm[exp]就不对了，取不出来数据了，vm中没有a.b.c这个属性名，必须先根据a取出个值,再从这个值里再取b，得到之后再在这个值里选c，所以需要一个遍历的过程，一个从一个里面取）

![10](img/10.png)

到此为止，大括号解析式解析完成

##### 总体流程总结

- 根据正则对象得到匹配出的表达式字符串：子匹配/`RegExp.$1`
- 从data中取出表达式对应的属性值
- 将属性值设置为文本节点的`textContent`

#### 事件指令解析

**`v-on`指令**

![12](img/12.png)

如果是大括号表达式的文本节点就进入大括号表达式的解析函数，如果是编译元素节点的指令属性，就进入compile中，编译指令。

![13](img/13.png)

node.attributes获得所有节点的集合，并且遍历得到属性名`v-on:click`赋值给attrName，通过判断是否为指令（通过判断名字前面有没有`v-`），如果是的话就取出attr.value，赋予给exp（为绑定的函数名test）。通过`attrName.substring(2)`，获取到指令名`on:click`赋予给dir，

通过`isEventDirective(dir)`来判断是否dir以on开头，然后解析事件指令，进入到`compileUtil`中的`eventHandler`函数中进行事件处理，传入参数为当前节点，vm对象，以及绑定的函数名exp，和指令名dir![14](img/14.png)

获取dir中的冒号后的事件名/类型：click，赋值给eventType，如果vm中存在方法就去找到vm中方法中名为exp（即为绑定的函数名）的函数test()，并赋给fn。如果eventType与fn都存在（即为存在事件类型（click）且有绑定的函数方法（show）），则绑定事件监听，将click绑定到fn事件上，并改变fn的this指向指为vm。

回到compile函数，`node.removeAttribute(attrName)`移除指令属性(移除`v-on:click`)

##### 总体流程总结

- 从指令名中取出事件名
- 根据指令的值（表达式）从methods中得到对应的事件处理函数对象
- 给当前元素节点绑定指定事件名和回调函数的dom事件监听
- 指令解析完后，移除此指令属性

#### 一般指令解析

`v-text`,`v-html`,`v-class`

```html
<p v-text="msg"></p>
<p v-html="msg"></p>
```

##### v-text

循环解析标签属性节点

![15](img/15.png)

以text为例，先得到attrName为`v-text`，得到text的值为vm中的msg，获取指令名dir为text，如果是普通指令，如果`compileUtil[dir]`这个函数存在的话，就进入到`compileUtil[dir]`中，在这里是指compileUtil中的text函数，并传入当前节点，vm，exp（v-test绑定的值msg）

![7](img/7.png)

进入到bind方法，和之前一样，通过传入的指令名称，来组成即将调用的函数名，和大括号表达式的过程同理

![8](img/8.png)

当传入text时，就会定义一个updaterFn来接收updater中的textUpdater函数。然后通过判断调用是否存在来决定调用updaterFn并传入参数，借此来操控节点属性。

回到bind函数中，得到对应的更新节点函数后，<font color=green>`updaterFn && updaterFn(node,this._getVMVal(vm,exp))`</font>，意思是如果存在调用来更新节点的话，就调用updaterFn并且传入相应的参数来更新节点，如果不存在的话右边的也不执行。这是一种简洁的写法，左边存在右边就执行，左边不存在右边就不执行。这就是上面说的通过判断决定调用。

`this._getVMVal(vm,exp)`函数取到vm的data中对应的（msg）的值并返回，并传入updater的textUpdater函数中

![9](img/9.png)

进入到updaterFn（即为`updater中的textUpdater`），如果存在value(vm中对应值)就把刚刚取到的value插入到节点的文本内容中，否则为插入为空

`v-text`与大括号表达式其实原理是一样的，都是调用了text指令对应的函数，区别是一个是通过正则获取节点的文本内容中大括号中的文本，也就是获取exp（vm中对应内容），一个是解析节点，获取节点的value来获取vm中的对应内容exp，并且因为指令格式都为`v-xxx`，所以可以通过节点的name调用substring（2）方法来获取v-后面的指令名，来调用不同指令方法，最后移除指令属性。

##### v-html

`v-html`也是同理，也是这个过程，区别是通过bind函数调用了updater中的`htmlUpdater`，然后在该节点插入html代码，同样通过`this._getVMVal(vm,exp)`获取到vm中对应属性的value，然后通过通过`node.innerHTML`=value插入节点中。

##### 总结

- 得到指令名和指令值（表达式）  text/html   msg
- 从data中根据表达式得到对应的值
- 根据指令名确定需要操作元素节点的什么属性
  - v-text——textContent属性
  - v-html——innerHTML属性

- 将得到的表达式的值设置到对应的属性上
- 移除元素的指令属性

#### 数据绑定

一旦更新了data中的某个属性数据，所有界面上直接使用或间接使用了此属性的节点都会更新

**基本原理：**给data中的属性（xxx），提供get和set（重点是set），监视这个值的变化。当输入`this.xxx = xxx（vm.xxx=xxx）`时，改变了vm的xxx的值，触发了vm 的set，vm的set会改变data里xxx的值，就会触发data的set，之后就会更新界面。

**简而言之就是**给data中的所有属性提供set方法，监视data中属性的变化，若有变化就更新界面

vm里的set和data的set作用是不太一样的，vm的set用来数据代理，data里的set用来实现数据绑定。

##### 数据劫持

数据劫持是vue中用来实现数据绑定的一种技术

**基本思想**：通过defineProperty()来监视data中所有属性（任意层次）数据的变化，一旦变化就去更新界面

![17](img/17.png)

核心实现：通过observe对data进行监视

![18](img/18.png)

new一个观察者，监视value值。![19](img/19.png)

保存当前data， 进入到walk()，遍历data中所有属性后，每个属性进行处 理，进入convert函数

![20](img/20.png)

再从convert跳入到defineReactive![ ](img/21.png)

更新界面利用的是bind里的监听器Watcher()，监听exp的变化，当exp有变化的时候，调用updater![22](img/22.png)

 