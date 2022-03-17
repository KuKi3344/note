const qs = require('querystring')

function bodyparSer(req,res,next){
	let str = '';
	//监听req的data事件
	req.on('data',(chunk)=>{
		str+=chunk;
	})
	//监听req的end事件
	req.on('end',()=>{
		req.body = qs.parse(str);
		next()
	})
}
module.exports = bodyparSer