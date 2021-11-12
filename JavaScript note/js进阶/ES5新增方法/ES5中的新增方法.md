### ES5中的新增方法

#### 数组方法

迭代遍历方法：forEach(),map(),some(),every();

##### **forEach()**

```
array.forEach(function(currentValue,index,arr))
```

- currentValue :数组当前项的值

- index : 数组当前项的索引

- arr : 数组对象本身

  ```
  var forEach(function(value,index,array){
  console.log('每个数组元素'+value);
  console.log('每个数组元素的索引号'+index);
  console.log('数组本身'+array);
  sum += value;
  })
  console.log(sum);
  ```

##### filter()

filter()方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素，主要用于筛选数组

**注：**它直接返回一个新数组

```
array.filter(function(currentValue,index,arr))
```

currentValue:数组当前项值

index：数组当前项的索引

arr：数组对象本身

```
var arr = [12,64,4,88];
var newArr = arr.filter(function(value,index){
return value >= 20;
});
console.log(newArr);
```

##### some()

![1](D:\web前端\JavaScript note\js进阶\img\11.8\1.png)![2](D:\web前端\JavaScript note\js进阶\img\11.8\2.png)![3](D:\web前端\JavaScript note\js进阶\img\11.8\3.png)

##### some()和forEach(),filter()的区别

在forEach()里面遇到return不会终止，但some不一样，some遇到return会终止遍历迭代，效率更高

在some里return true会停止迭代。必须return true，说明找到了这个元素，然后迭代才终止。

**filter**和forEach一样遇到retuen也不会终止迭代

所以在查找唯一元素的时候应该用some，效率更高，是最好的选择

### 字符串方法

##### trim()

```
//trim 方法去除字符串两侧空格
var str = '		andy	';
console.log(str);
var str1 = str.trim();	//获得去除左右两侧空格的新字符串，但不会去除字符之间的空格
console.log(str1);
```

```
<input type = "text"> <button>点击</button>
<div></div>
<script>
var input = document.querySelector('input');
var btn = document.querySelector('button');
var div = document.querySelector('div');
btn.onclick = function(){
if (input.value === ''){
	alert('请输入内容')
}else{
console.log(input.value);
console.log(input.value.length);
div.innerHTML = input.value;
}
}
</script>
```

按上面这段代码来写，当输入一个空格时，由于判断值时里面有一个空格所以判断不为空不会出现提示。并且当输入的内容携带空格时，也不能识别出把空格去掉，因此就需要trim()函数,所以需要改成以下这样

```
var str = input.value.trim();
if (str === ''){
	alert('请输入内容')
}else{
console.log(str);
console.log(str.length);
div.innerHTML = str;
}
```

### Object对象方法

##### Object.keys()

遍历方法，可以遍历属性

##### Object.defineProperty()

![1](D:\web前端\JavaScript note\js进阶\img\11.12\1.png)

![2](D:\web前端\JavaScript note\js进阶\img\11.12\2.png)



```
var obj = {
id:1,
pname:'小米',
price:1999
};
//1.以前的对象添加和修改属性的方式
//obj.num = 1000;
//obj.price = 99;
//console.log(obj);
//2.Object.defineProperty()
Object.defineProperty(obj,'num',{
	value:1000
});
Object.defineProperty(obj,'price',{
	value:9.9
});
//没有这个属性的话就添加，如果有了这个属性就修改原有属性，修改成新定义的值
Object.defineProperty(obj,'id',{
	//不允许修改这个属性值
	writable:false,
});
obj.id = 2;
//尝试修改id看是否能修改
console.log(obj);
//结果id没变还是1
//但如果writable改成true就能修改，writable默认值为false
Object.defineProperty(obj,'address',{
	value:'大连xx小区',
	enumerable:false,
	// enumerable 如果值为false，则不允许遍历，不在方法里写这个属性的话默认的值为false
	configurable:false
	//configurable 如果为false，则不允许删除这个属性，也不允许修改这个属性第三个参数里面的特性（如改成可修改或可遍历），默认值为false.
});
console.log(Object.keys(obj));
delete obj.address;
//原先定义的pname是没有这些属性的，所以可删除可重写，课可遍历
```

