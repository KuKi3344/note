## 关于vue3的一些记录

### ref函数和reactive函数

#### ref

- **ref**创建一个包含响应式数据的引用对象
- JS中操作数据` xxx.value`
- 模板中读取数据，不需要value，直接`<div>xxxx</div>`

> **注：**
>
> - 接收的数据可以是：基本类型（也可以是对象类型，不过内部会自动通过reactive转为代理对象）
>
> - 基本数据类型：响应式依然是依靠Object.defineProperty()的get/set完成的
>
> - 对象类型的就要看稍后的reactive部分了。

#### reactive

**作用：**定义一个**对象类型**的响应式数据（基本类型不用它，要用ref）

**语法**：const 代理对象 = reactive(源对象)，接收一个对象（或者数组），返回一个代理对象（Proxy的实例对象，简称proxy对象）

reactive定义的响应式数据是**'深层次'**的，会影响对象内部所有嵌套的属性。

它的内部是基于ES6的proxy实现，通过代理对象操作源对象内部数据，返回的代理对象**不等于**原始对象。建议仅使用代理对象而避免依赖原始对象。作用是帮助我们创建响应式数据对象。

##### 二者对比

从定义数据角度对比：

>ref用来定义**基本类型数据**，reative用来定义**对象（数组）类型**数据
>
>ref也可以用来定义对象（或数组）类型数据，它内部会自动通过reactive转为代理对象。

从远离角度：

> ref通过Object.defineProperty()的get/set来实现响应式（数据劫持）
>
> reactive通过使用Proxy来实现响应式（数据劫持），并通过Reflect操作源对象内部的数据。

从使用角度：

> ref定义得数据，操作数据需要.value，读取时模板中直接读取不需要.value
>
> reactive定义得数据，操作数据与读取数据均不需要.value

### 关于Setup

1. setup函数是处于生命周期函数`beforeCreate` 和 `Created` 两个钩子函数之间的函数，也就是说在setup函数中无法使用data和methods中的数据和方法。
2. setup函数是`Composition API（组合API）`的入口
3. 与模板一起使用：需要返回一个对象，在setup函数中定义得变量和方法最后都是需要return出去的，不然无法在模板中使用。
4. setup函数接收两个参数（props、context）
5. 执行 setup 时，组件实例尚未被创建（在 setup() 内部，this 不会是该活跃实例的引用，即不指向vue实例，Vue 为了避免我们错误的使用，直接将 setup函数中的`this`修改成了 `undefined`）
6. 使用渲染函数：可以返回一个`渲染函数`，该函数可以直接使用在同一作用域中声明的`响应式状态`

setup函数中使用需要注意的点：

- 由于在执行setup函数的时候还没有执行created生命周期方法，所以在setup函数中无法使用methods和data中的方法和变量。
- setup中this指向为undefined而不是Vue实例
- setup函数只能是同步的不能是异步的，setup函数中的props是响应式的，当传入新的prop时，它将被更新。因为props的响应式，所以不能使用ES6结构，因为它会消除prop的响应性。

**为什么解构赋值会消除prop的响应性呢？**

首先我们要知道，proxy通过和Reflect的配合，就能实现对于对象的拦截，**建了一个代理对象将其保存在内部并返回，Proxy对数据进行了拦截，当数据发生变化，通知Vue进行视图变化**

 **reactive 方法其实就是创建了一个Proxy对象**，**以及进行了一系列处理，但是他不会有失去响应性的情况，那么就说明问题出在了Proxy对象本身**

来看一下Proxy的原理。

```js
        const obj = {
            count: 1
        };
        const proxy = new Proxy(obj, {
            get(target, key, receiver) {
                console.log("这里是get");
                return Reflect.get(target, key, receiver);
            },
            set(target, key, value, receiver) {
                console.log("这里是set");
                return Reflect.set(target, key, value, receiver);
            }
        });

        console.log(proxy)
        console.log(proxy.count)
```

如此依赖，就能实现响应式了，大家可以发现，这个obj的整个对象就被拦截了，但是你发现对象在嵌套深一层,他就无法拦截，我们必须要来个包装

```js
    const obj = {
            a: {
                count: 1
            }
        };
        function reactive(obj) {
            return new Proxy(obj, {
                get(target, key, receiver) {
                    console.log("这里是get");
                    // 判断如果是个对象在包装一次，实现深层嵌套的响应式
                    if (typeof target[key] === "object") {
                        return reactive(target[key]);
                    };
                    return Reflect.get(target, key, receiver);
                },
                set(target, key, value, receiver) {
                    console.log("这里是set");
                    return Reflect.set(target, key, value, receiver);
                }
            });
        };
        const proxy = reactive(obj);
```

以上是proxy的原理

再回归正题。

我们知道解构赋值，区分原始类型的赋值和引用类型的赋值，**原始类型的赋值相当于按值传递，引用类型的值就相当于按引用传递**

**相当于**

```js
  // 假设a是个响应式对象
  const a={ b:1}
  // c 此时就是一个值跟当前的a 已经不沾边了
  const c=a.b
// 你直接访问c就相当于直接访问这个值 也就绕过了 a 对象的get ，也就像原文中说的失去响应式
```

a为什么具有响应式？因为a是引用类型，如果他是个object那么就如上面的原理，重新包装为响应式

正因为这个特性，导致了如果是引用类型，你再去访问其中的内容的时候并不会失去响应式。

```js
  // 假设a是个响应式对象
 const a={ b:{c:3}}
 // 当你访问a.b的时候就已经重新初始化响应式了（因为b是一个对象），此时的c就已经是个代理的对象
 const c=a.b
// 你直接访问c就相当于访问一个响应式对象，所以并不会失去响应式
```

以上就大致解释了为什么解构赋值，可能会失去响应式，可以理解为绕过了a的代理直接拿到基本类型的值了，那肯定就失去了响应性，就如第一个例子一般。

![](https://img-blog.csdnimg.cn/2021031713374814.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg0ODEzMA==,size_16,color_FFFFFF,t_70#pic_center)

因为解构赋值相当于直接跳过了代理那一层，在下面直接获取值，get/set无法被调用。

**有时间自己研究一下为什么React可以对props解构赋值，且他们什么时候重新渲染等。**



#### 关于使用

`setup` 选项应该是一个接受 `props` 和 `context` 的函数。
 此外，我们从 `setup` 返回的所有内容都将暴露给组件的其余部分 (计算属性、方法、生命周期钩子等等) 以及组件的模板。

　　个人觉得可以理解为：

1. `setup` 选项应该为一个函数
2. `setup` 选项函数接受两个参数： `props` 和 `context`
3. `setup` 选项函数需要返回要暴露给组件的内容

##### props（toRefs解构）

就如期望一般，setup函数中的props是响应式的，当传入新的prop时它将被更新。

```js
export default {
  props: {
    title: String
  },
  setup(props) {
    console.log(props.title)
  }
}
```

如果需要解构 prop，可以通过使用 setup 函数中的 toRefs 来完成此操作,它支持es6的解构赋值，同时保持响应式的特性

```js
//导入语法
import { reactive,toRefs } from 'vue'
export default {
  setup() {
    // 语法
    const {name,age,sex} = toRefs(reactive({
      name: '测试',
      age: 18,
      sex: '女'
    }));
    return {
        name,
        age,
        sex
    }
  }
}
```

##### context

`context` 上下文是一个普通的 JavaScript 对象，它暴露三个组件的 property：

```js
export default {
  setup(props, context) {
    // Attribute (非响应式对象)
    console.log(context.attrs)

    // 插槽 (非响应式对象)
    console.log(context.slots)

    // 触发事件 (方法)
    console.log(context.emit)
  }js
}
```

context是一个普通的js对象，它不是响应式的，你可以安全的对context使用ES6结构。

`attrs` 和 `slots` 是有状态的对象，它们总是会随组件本身的更新而更新。这意味着你应该避免对它们进行解构，并始终以 `attrs.x` 或 `slots.x` 的方式引用 property。请注意，与 `props` 不同，`attrs` 和 `slots` 是非响应式的。如果你打算根据 `attrs` 或 `slots` 更改应用副作用，那么应该在 `onUpdated` 生命周期钩子中执行此操作。

#### 返回值

##### 对象

　　如果 `setup` 返回一个对象，则可以在组件的模板中像传递给 `setup` 的 `props` property 一样访问该对象的 property：

```js
<template>
  <!-- 模板中使用会被自动解开，所以不需要 .value  -->
  <div>{{ readersNumber }} {{ book.title }}</div>
</template>

<script>
  import { ref, reactive } from 'vue'

  export default {
    setup() {
      const readersNumber = ref(0)
      const book = reactive({ title: 'Vue 3 Guide' })

      // expose to template
      return {
        readersNumber,
        book
      }
    }
  }
</script>
```

注意，从 `setup` 返回的 [refs](https://link.juejin.cn?target=https%3A%2F%2Flinks.jianshu.com%2Fgo%3Fto%3Dhttps%3A%2F%2Fvue3js.cn%2Fdocs%2Fzh%2Fapi%2Frefs-api.html%23ref) 在模板中访问时是被自动解开的，因此不应在模板中使用 `.value`。

##### 渲染函数

setup还可以返回一个渲染函数，该函数可以直接使用在同一作用域中声明的响应式状态。

```js
import { h, ref, reactive } from 'vue'

export default {
  setup() {
    const readersNumber = ref(0)
    const book = reactive({ title: 'Vue 3 Guide' })
    // Please note that we need to explicitly expose ref value here
    return () => h('div', [readersNumber.value, book.title])
  }
}
```

#### script setup语法糖

虽然`Composition API`用起来已经非常方便了，但是我们还是有很烦的地方，比如

- 组件引入了还要注册
- 属性和方法都要在`setup`函数中返回，有的时候仅一个`return`就十几行甚至几十行
- 不想写啊怎么办

好办，`Vue3`官方提供了`script setup`语法糖

只需要在script标签中添加setup，组件只需引入不用注册，属性和方法也不用返回，setup函数也不需要，甚至export default都不用写了，不仅是数据，计算属性和方法，甚至是自定义指令也可以在我们的template中自动获得。

但是这么过瘾的语法糖，还是稍微添加了一点点心智负担，因为没有了setup函数，那么props，emit，attrs怎么获取呢，就要介绍一下新的语法了。

setup script`语法糖提供了三个新的`API`来供我们使用：`defineProps`、`defineEmits`和`useContext

defineProps 用来接收父组件传来的值props。

defineEmits 用来声明触发的事件表。

useContext 用来获取组件上下文context。
`<script setup>` 中的代码会在每次组件实例被创建的时候执行,与普通的 `<script>` 只在组件被首次引入的时候执行一次不同。

当使用 `<script setup>` 的时候，任何在 `<script setup>` 声明的顶层的绑定 (包括变量，函数声明，以及 `import` 引入的内容) 都能在模板中直接使用：

```js
<script setup>
// 变量
const msg = 'Hello!'

// 函数
function log() {
  console.log(msg)
}
</script>

<template>
  <div @click="log">{{ msg }}</div>
</template>

</script>
```

`import` 导入的内容也会以同样的方式暴露。意味着可以在模板表达式中直接使用导入的 helper 函数，并不需要通过 methods 选项来暴露它：

```js
<script setup>
import { capitalize } from './helpers'
</script>

<template>
  <div>{{ capitalize('hello') }}</div>
</template>
```

**响应式**

响应式状态需要明确使用响应式 APIs 来创建。和从 `setup()` 函数中返回值一样，ref 值在模板中使用的时候会自动解包：

```js
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button @click="count++">{{ count }}</button>
</template>
```

**使用组件**

`<script setup>`范围里的值也能被直接作为自定义组件的标签名使用

```js
<script setup>
import MyComponent from './MyComponent.vue'
</script>

<template>
  <MyComponent />
</template>
```

将 MyComponent 看做被一个变量所引用。

#### defineProps 和 defineEmits

在 `<script setup>` 中必须使用 `defineProps` 和 `defineEmits` API 来声明 props 和 emits ，它们具备完整的类型推断并且在 `<script setup>` 中是直接可用的：

```js
<script setup>
const props = defineProps({
  foo: String
})

const emit = defineEmits(['change', 'delete'])
// setup code
</script>
```

`defineProps` 和 `defineEmits` 都是只在 `<script setup>` 中才能使用的编译器宏。他们不需要导入且会随着 `<script setup>` 处理过程一同被编译掉。

`defineProps` 接收与 props 选项相同的值，`defineEmits` 也接收 emits 选项相同的值。

`defineProps` 和 `defineEmits` 在选项传入后，会提供恰当的类型推断。

传入到 `defineProps` 和 `defineEmits` 的选项会从 setup 中提升到模块的范围。因此，传入的选项不能引用在 setup 范围中声明的局部变量。这样做会引起编译错误。但是，它可以引用导入的绑定，因为它们也在模块范围内。