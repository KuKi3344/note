//导入fs模块
const fs = require('fs');
//调用fs.readFile()方法来读取文件
//参数一：读取文件的存放路径
//参数二：读取文件时候采用的编码格式，默认是 utf8
//参数三：回调函数，拿到读取失败和成功的结果 err dataStr
fs.readFile('./12.txt','utf8',function(err,dataStr){
	if(err){
		console.log('失败了，'+err.message)
		return;
	}else{
		console.log('文件读取内容是：'+ dataStr);
	}
})
