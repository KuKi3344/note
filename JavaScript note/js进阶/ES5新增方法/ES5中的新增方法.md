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