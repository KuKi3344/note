const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
	output: {
		filename: 'scripts/[name].[contenthash].js', //输出文件名
		publicPath: 'http://localhost:8080/'
	},
	mode: 'production',
	//优化配置
	optimization: {
		minimizer: [
			new CssMinimizerPlugin(),
			new TerserPlugin()

		],
	}
}
