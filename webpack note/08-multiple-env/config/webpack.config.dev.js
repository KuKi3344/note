module.exports = {

	output: {
		filename: 'scripts/[name].js', //输出文件名
	},
	mode: 'development',
	devtool: 'inline-source-map',	
	devServer: {
		static: './dist' //该目录跑到服务器上
	}
	}
