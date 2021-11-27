const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
	entry: './src/index.js', //入口
	
	output: {
		filename:'bundle.js',//输出文件名
		path:path.resolve(__dirname,'./dist'),
		clean:true
			//输出到的绝对路径
		//__dirname参数表示获取到当前webpack.config.js所在的物理路径
		//第二个参数表示基于第一个参数的路径再去找到解析到当前目录下的dist
	},
	mode: 'development',
	plugins :[
		//插件使用需要引入并实例化
		new HtmlWebpackPlugin({
			template: './index.html',	//模板
			filename: 'app.html',//输出文件名
			inject:'body' //这样打包好的js文件就会在body里引入而不是head里引入
		})
	],
	devServer:{
		static:'./dist'
	}
}