const fs = require('fs')

fs.writeFile('./2.txt','我是KuKi!!','utf8',function(err){
	if(err){
		console.log('文件写入失败'+ err.message);
		return;
	}else{
		console.log('写入成功')
	}
})