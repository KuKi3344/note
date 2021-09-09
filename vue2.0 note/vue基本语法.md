

# Vue2.0笔记

#### vue基本语法

![1](D:\web前端\vue2.0 note\1.png)![2](D:\web前端\vue2.0 note\2.png)

![3](D:\web前端\vue2.0 note\3.png)

![4](D:\web前端\vue2.0 note\4.png)![5](D:\web前端\vue2.0 note\5.png)

![6](D:\web前端\vue2.0 note\6.png)
v-bind单向绑定
v-model双向绑定
v-bind对象改变值，被绑定到这个对象的属性不变
v-model的对象改变值，被绑定到这个对象的属性同时改变

例如绑定了str的input通过输入改变值
影响了vm的data的str（前提是这些元素都在这个vm绑定到的id标签里）
然后又由于上面的str从vm中的str取值
所以会发生下面输入使值变化，上面会同时动态变化

（v-model双向绑定只能使用在表单输入标签）

（v-model：value 可以简写为v-model）