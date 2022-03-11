const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer()

server.on('request',function(req,res){
	const url = req.url;
	const fpath = path.join(__dirname,url);
	fs.readFile(fpath,'utf8',(err,data)=>{
		if(err) return res.end('request error')
		res.end(data)
	})
})

server.listen(80,function(){
	console.log('server running at http://127.0.0.1')
})