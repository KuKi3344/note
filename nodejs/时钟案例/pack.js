const fs = require('fs');
const path = require('path');
//定义正则
const regStyle = /<style>[\s\S]*<\/style>/;
const regScript = /<script>[\s\S]*<\/script>/;
fs.readFile(path.join(__dirname,'./index.html'),'utf8',(err,data)=>{
	if(err){
		console.log('读取失败'+err.message);
		return;
	}
	let url = path.join(__dirname,'./dist');
	 if(!fs.existsSync(url)){
		fs.mkdirSync(url);
	}
	resolveCSS(data);
	resolveJS(data);
	resolveHTML(data);
})

var resolveCSS = function(data){
	let css = regStyle.exec(data);
	const newCSS = css[0].replace('<style>','').replace('</style>','');
	fs.writeFile(path.join(__dirname,'./dist/index.css'),newCSS,err=>{
		if(err){
			console.log('写入CSS错误',+err.message);
			return;
		}
		console.log('写入CSS样式成功');
	})
}

var resolveJS = function(data){
	let js = regScript.exec(data);
	const newJS = js[0].replace('<script>','').replace('</script>','');
	fs.writeFile(path.join(__dirname,'./dist/index.js'),newJS,err=>{
		if(err){
			console.log('写入JS错误',+err.message);
			return;
		}
		console.log('写入JS样式成功');
	})
}

var resolveHTML = function(data){
	let css = regStyle.exec(data);
	let js = regScript.exec(data);
	const newHTML = data.replace(js,'<script src="./index.js"></script>').replace(css,'<link rel="stylesheet" type="text/css"  href="./index.css">');
	fs.writeFile(path.join(__dirname,'./dist/index.html'),newHTML,err=>{
		if(err){
			console.log('写入HTML错误',+err.message);
			return;
		}
		console.log('写入HTML成功')
	})
}
