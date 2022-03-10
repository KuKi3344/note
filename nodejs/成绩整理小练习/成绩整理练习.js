const fs = require('fs');
const path = require('path')
let url = path.join(__dirname,'./grade.txt')
let url2 = path.join(__dirname,'./grade_new.txt')
fs.readFile(url,'utf8',function(err,data){
	if(err){
		console.log('读取失败'+err.message);
	}else{
		let arr = data.split(' ');
		let arrnew = [];
		arr.forEach(item=>{
			arrnew.push(item.replace('=',':'));
		})
		const result = arrnew.join('\r\n');
		console.log(result);
		fs.writeFile(url2,result,'utf8',function(err){
			if(err){
				console.log('写入失败'+err.message);
			}else{
				console.log('写入成功')
			}
		})
	}
})
