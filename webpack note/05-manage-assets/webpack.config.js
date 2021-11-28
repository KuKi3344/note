const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
module.exports = {
	entry: './src/index.js', //入口
	
	output: {
		filename:'bundle.js',//输出文件名
		path:path.resolve(__dirname,'./dist'),
			//输出到的绝对路径
		//__dirname参数表示获取到当前webpack.config.js所在的物理路径
		//第二个参数表示基于第一个参数的路径再去找到解析到当前目录下的dist
		clean:true,
		assetModuleFilename:'images/[contenthash][ext]'
	},
	mode: 'production',
	devtool:'inline-source-map',
	plugins :[
		//插件使用需要引入并实例化
		new HtmlWebpackPlugin({
			template: './index.html',	//模板
			filename: 'app.html',//输出文件名
			inject:'body' //这样打包好的js文件就会在body里引入而不是head里引入
		}),
		new MiniCssExtractPlugin({
			filename:'styles/[contenthash].css'
	})
	],
	devServer:{
		static:'./dist' //该目录跑到服务器上
	},
	module:{
		rules:[
			{
				test:/\.jpg$/,//正则，表示以jpg为扩展名的文件
				type:'asset/resource',
				generator:{
					filename:'images/[contenthash][ext]'
				},
				//也可以自定义打包的资源的路径和文件名，但generator的优先级高于assetModuleFilename
			},
			{
				test:/\.svg$/,
				type:'asset/inline'
			},
			{	
				test:/\.png$/,
				type:'asset',
				parser:{
					dataUrlCondition:{
						maxSize:1 * 1024 * 1024
					}
				}
			},
			{
				test:/\.(css|less)$/,
				use:[MiniCssExtractPlugin.loader,'css-loader','less-loader'],
				//先写style-loader，再写css-loader是有顺序的
				//先css-loader会打包识别css文件然后style-loader会帮助我们把css放置到页面上
				//可以看作出栈
			}
		]
	},
		//优化配置
	optimization:{
		minimizer:[
			new CssMinimizerPlugin()
		]
	}
}