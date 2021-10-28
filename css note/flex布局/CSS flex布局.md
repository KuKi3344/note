## CSS flex布局

Flex是Flexible Box的缩写，意为”弹性布局”，用来为盒状模型提供最大的灵活性。

任何一个容器都可以指定为Flex布局。

```
.box{
  display: flex;
}
```

行内元素也可使用

```
.box{
  display: inline-flex;
}
```

采用Flex布局的元素，称为Flex容器（flex container），简称”容器”。它的所有子元素自动成为容器成员，称为Flex项目（flex item），简称”项目”。

容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。

### flex-direction属性（即项目的排列方向）

决定主轴的方向（即项目的排列方向）

![img](https://www.runoob.com/wp-content/uploads/2015/07/0cbe5f8268121114e87d0546e53cda6e.png)

- row（默认值）：主轴为水平方向，起点在左端。
- row-reverse：主轴为水平方向，起点在右端。
- column：主轴为垂直方向，起点在上沿。
- column-reverse：主轴为垂直方向，起点在下沿。
- flex-wrap

###  flex-wrap属性(定义如何换行)

默认情况下，项目都排在一条线（又称”轴线”）上。flex-wrap属性定义，如果一条轴线排不下，如何换行。

它可能取三个值。

（1）nowrap（默认）：不换行。

（2）wrap：换行，第一行在上方。

（3）wrap-reverse：换行，第一行在下方。

![img](https://www.runoob.com/wp-content/uploads/2015/07/903d5b7df55779c03f2687a7d4d6bcea.png)

###  flex-flow（是flex-direction属性和flex-wrap属性的简写形式）

flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。

###  justify-content属性（主轴对齐方式）

justify-content属性定义了项目在主轴上的对齐方式。

它可能取5个值，具体对齐方式与轴的方向有关。下面假设主轴为从左到右。

- flex-start（默认值）：左对齐
- flex-end：右对齐
- center： 居中
- space-between：两端对齐，项目之间的间隔都相等。
- space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。
- ![img](https://www.runoob.com/wp-content/uploads/2015/07/c55dfe8e3422458b50e985552ef13ba5.png)

### align-items属性（交叉轴上如何对齐）

它可能取5个值。具体的对齐方式与交叉轴的方向有关，下面假设交叉轴从上到下。

- flex-start：交叉轴的起点对齐。
- flex-end：交叉轴的终点对齐。
- center：交叉轴的中点对齐。
- baseline: 项目的第一行文字的基线对齐。
- stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。
- ![img](https://www.runoob.com/wp-content/uploads/2015/07/2b0c39c7e7a80d5a784c8c2ca63cde17.png)

### align-content属性（定义了多根轴线的对齐方式）

align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

- flex-start：与交叉轴的起点对齐。
- flex-end：与交叉轴的终点对齐。
- center：与交叉轴的中点对齐。
- space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
- space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
- stretch（默认值）：轴线占满整个交叉轴。

## 项目的属性

以下6个属性设置在项目上。

- order
- flex-grow
- flex-shrink
- flex-basis
- flex
- align-self

### order属性（项目的排列顺序）

order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。

![img](https://www.runoob.com/wp-content/uploads/2015/07/59e399c72daafcfcc20ede36bf32f266.png)

### flex-grow属性（定义项目的放大比例）

flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。

```
.item {
  flex-grow: <number>; /* default 0 */
}
```

如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

### flex-shrink属性（定义了项目的缩小比例）

flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

```
.item {
  flex-shrink: <number>; /* default 1 */
}
```

 ![img](https://www.runoob.com/wp-content/uploads/2015/07/240d3e960043a729bb3ff5e34987904f.jpg)

如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。

负值对该属性无效。

###  flex-basis属性（定义了在分配多余空间之前，项目占据的主轴空间（main size））

flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。

```
.item {
  flex-basis: <length> | auto; /* default auto */
}
```

它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。

###  flex属性（是flex-grow, flex-shrink 和 flex-basis的简写）

flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。

```
.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```

该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。

建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

### align-self属性（允许单个项目有与其他项目不一样的对齐方式）

align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。

![img](https://www.runoob.com/wp-content/uploads/2015/07/55b19171b8b6b9487d717bf2ecbba6de.png)

```
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```

该属性可能取6个值，除了auto，其他都与align-items属性完全一致。