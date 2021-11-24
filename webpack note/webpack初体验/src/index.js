// webpack入口起始文件
//运行指令：
//开发环境：webpack ./src/index.js -o ./build/built.js --mode=development
//webpack会以./src/index.js为入口文件开始打包，打包后输出到./build/built.js
//整体打包环境是开发环境
//生成环境
function add(x,y){
	 return x+y;
	 }
console.log(add(1,2));