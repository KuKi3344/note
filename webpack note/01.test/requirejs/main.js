require(['./add.js','./minus.js'],function(add,minus){	//这里的路径是相对于index.html的路径
	console.log(add(4,5));
})