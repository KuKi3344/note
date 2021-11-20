//原始方式 引入fs模块
const fs = require("fs");

fs.readFile('./为学.md',(err,data1)=>{
	fs.readFile('./观书.md',(err,data2)=>{
		fs.readFile('./劝学.md',(err,data3)=>{
			let result = data1 +data2+data3;
			console.log(result);
		});
	});
});
//使用promise实现
const p = new Promise((resolve,reject)=>{
	fs.readFile('./为学.md',(err,data)=>{
		resolve(data);
	});
});
p.then(value=>{
	return new Promise((resolve,reject)=>{
		fs.readFile('./观书.md',(err,data)=>{
		resolve([value,data]);
	});
	})
}).then(value => {
	return new Promise((resolve,reject)=>{
		fs.readFile('./劝学.md',(err,data)=>{
		//压入
		value.push(data);
		resolve(value)
	});
	})
}).then(value=>{
	console.log(value.join('\r\n'));
});