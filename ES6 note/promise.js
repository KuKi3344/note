// const fs = require('fs');
// //引入fs模块

// 调用方法读取文件
// fs.readFile('./为学.md',(err,data)=>{
// 	//如果失败则抛出错误
// 	if(err) throw err;
// 	//如果没有出错，则输出内容
// 	console.log(data.toString());
// })

// //使用Promise封装
// const p = new Promise(function(resolve,reject){
// 	fs.readFile('./为学.md',(err,data)=>{
// 		//判断如果失败
// 		if(err) reject(err);
// 		//如果成功
// 		resolve(data);
// 	});
// });
// p.then(function(value){
// 	console.log(value.toString());
	
// },function(reason){
// 	console.log("读取失败");
// });



	//引入fs模块
			const fs = require("fs");

			//读取 为学 
			function readweixue() {
				return new Promise((resolve, reject) => {
					fs.readFile("./为学.md", (err, data) => {
						//失败
						if (err) reject(err);
						//成功
						resolve(data);
					})
				})
			}
			//读取 观书
			function readguanshu() {
				return new Promise((resolve, reject) => {
					fs.readFile("./观书.md", (err, data) => {
						//失败
						if (err) reject(err);
						//成功
						resolve(data);
					})
				})
			}
			//读取 劝学
			function readquanxue() {
				return new Promise((resolve, reject) => {
					fs.readFile("./劝学.md", (err, data) => {
						//失败
						if (err) reject(err);
						//成功
						resolve(data);
					})
				})
			}
			//声明一个async函数
			async function main() {
				//获取为学内容
				let weixue = await readweixue();
				//获取劝学内容
				let quanxue = await readquanxue();
				//获取观书内容
				let guanshu = await readguanshu();
				console.log(weixue.toString());
				console.log(quanxue.toString());
				console.log(guanshu.toString());
			}
			main();