# JavaScript

### jQuery

JS和jQuery库

jQuery 库，里面存在大量的JavaScript函数

> **获取jQuery**

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Title</title>
	<!-- <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js"></script> -->
    // cdn在线引入jQuery
	<script src="jQuery/jquery-3.6.0.js"></script>  // 本地引入jQuery
	</head>
	<body>
<!-- 	公式： $(selector).action() -->
	<a href = "" id = "test-jQuery">点我</a>
	
	<script>
	
	// 选择器就是css的选择器
	$('#test-jQuery').click(function (){
		alert('hello');
	}
	)
	</script>
		
	</body>
</html>


```

> 选择器

```js
// 原生js，选择器少，麻烦不好记
//标签
document.getElementsByTagName();
// id
document.getElementById();
//类
document.getElementByClassName();

//jQuery  css 中的选择器他都能用
$('p').click();			//标签选择器
$('#id1').click();		//id选择器 
$('.class1').click();	//class选择器
```

文档工具站：(https://jquery.cuishifeng.cn/)

> **事件**

鼠标事件，键盘事件，其他事件

**鼠标事件**：

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Title</title>
	<script src="jQuery/jquery-3.6.0.js"></script>
	<style>
	 #divMove{
		 width: 500px;
		 height:500px;
		 border: 1px solid aquamarine;
	 }
	</style>
	</head>
	<body>
	mouse :<span id = "mouseMove"></span>
	<div id = "divMove">
		在这里移动鼠标试一下
		</div>
		<script>
		// 当网页元素加载完毕后响应事件
		$(function (){
			$('#divMove').mousemove(function (e){
				$('#mouseMove').text('x:'+e.pageX + 'y:'+e.pageY)
			} )
		});
		</script>
	</body>
</html>

```

> **操作DOM**

节点文本操作

```js
$('#test-ul li[name=python]').text();	// 获得值
$('#test-ul li[name=python]').text('设置值');	// 设置值
$('#test-ul').html();	//获得值
$('#test-ul').html('设置值');	//设置值
```

css的操作

```js
$('#test-ul li[name=python]').css({"color","red"});
```

元素的显示和隐藏：本质`display:none`;

```js
$('#test-ul li[name=python]').show()
$('#test-ul li[name=python]').hide()
```

