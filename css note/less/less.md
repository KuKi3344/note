## less

### less的编译

各个编译器现在自带编译插件，编译后直接在html文件中引入编译出的css文件即可。也可以下载一个koala编译less，但是几乎不用，因为感觉有点慢而且不如插件方便

用less便于后期的维护，写起来也比较方便

### less中的注释

以//开头的注释，不会被编译到css文件中

以/**/包裹的注释会被编译到css文件中

### less中的变量

使用@来申明一个变量：`@color：pink`；

1. 作为普通属性值只来使用，直接使用@color
2. 作为选择器和属性名：

- id：`#@{selector的值}`
- class: `.@{selector的值}`
- tag：`@{selector的值}`

less中的变量都是块级作用域。

**注：**less里面变量延迟加载

```less
@var:0;
.class{
    @var:1;
    .brass{
        @var:2;
        three:@var;	//3
        @var:3;
    }
    one:@var;//1
}
```

` three:@var;`这行会等作用域里所有东西解析完，再看@var里面的东西是啥，所以最后输出3

### less中的嵌套规则

父子级关系以及&的使用

父子级嵌套

&代表平级，若是不加&，就默认:hover是.inner的子级，但实际上二者平级

```less
.wrap{
				margin:0 auto;
				position:absolute;
				left:300px;
				top:300px;
				height:400px;
				width:300px;
				background-color: @color;
				.inner{
					position: absolute;
					left:0;
					top:0;
					right:0;
					bottom:0;
					margin:auto;
					height:100px;
					width:100px;
					background-color: #fff;
					&:hover{
						background-color: pink;
					}
					}
			}
```

### less的混合

混合就是将一系列属性从一个规则集引入到另一个规则集的方式

1. 普通混合

   ```less
   .juzhong{
   	...
   }
   .inner1{
       .juzhong;
   }
   .inner2{
       .juzhong;
   }
   ```

   这时，.juzhong会输出到css文件里，不建议使用普通混合，会让css代码增多

2. 没有输出的混合

   ```less
   .juzhong(){
   	...
   }
   .inner1{
       .juzhong();
   }
   .inner2{
       .juzhong();
   }
   ```

   此时.juzhong不会输出到css文件中。只要带括号就不会输出

3. 带参数的混合

```less
	.juzhong(@w,@h,@c){
		position: absolute;
		left:0;
		top:0;
		right:0;
		bottom:0;
		margin:auto;
		height:@h;
		width:@w;
		background-color: @c;
		&:hover{
			background-color: pink;
		}
		
	}
	.wrap{
				margin:0 auto;
				position:absolute;
				left:300px;
				top:300px;
				height:400px;
				width:300px;
				background-color: deeppink;
				.inner{
					.juzhong(100px,100px,green);				
					}
				.inner2{
					.juzhong(200px,200px,blue);
					}
			}
```

编译结果：

```css
.wrap .inner {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  height: 100px;
  width: 100px;
  background-color: green;
}
.wrap .inner:hover {
  background-color: pink;
}
.wrap .inner2 {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  height: 200px;
  width: 200px;
  background-color: blue;
}
.wrap .inner2:hover {
  background-color: pink;
}
```

此时.juzhong不会输出到css文件里，css文件代码明显比普通混合的代码少了

4.带参数值且默认参数值的混合

可以不传参数，使用默认值

```less
	.juzhong(@w:10px,@h:10px,@c:pink){
			...
			}
		.inner{
			.juzhong(100px,100px,green);			
				}
		.inner2{
			.juzhong();
				}			
```

5.命名参数

当你想给混合传一个参数，其它参数使用默认值时，如果直接`.juzhong(black)`，那么编译后css文件里的内容是`width:#00000`,因为black位置对应的是width的值，所以传给width了，这个时候就需要命名参数。

```less
.juzhong(@c:black);
```

这样就能对应上参数了

5.匹配模式

可以给混合加上标识符,根据传入的标识符选择相对应的.triangle()

```less
#wrap > .sjx{
	.triangle(L,40px,red);
	}
.triangle(L,@w,@c){		//这里的L相当于标识符
	border-width:@w;
	border-color: transparent transparent transparent @c;
	.triangle();
	
}
.triangle(R,@w,@c){		
	border-width:@w;
	border-color: transparent @c transparent transparent;
	.triangle();
}
.triangle(T,@w,@c){		
	border-width:@w;
	border-color: @c transparent transparent transparent;
	.triangle();
}
.triangle(B,@w,@c){		
	border-width:@w;
	border-color: transparent transparent @c transparent;
	.triangle();
}
```

6.arguments

```less
.border(@1,@2,@3){
	border:@arguments;
}
#wrap .sjx{
	.border(1px,solid,black)
}
```

