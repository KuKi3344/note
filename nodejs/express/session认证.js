var express = require('express')
const app = express()
var session = require('express-session')

app.use(session({
	secret:'keyboard cat', //secret 属性的值可以是任意字符串
	resave:false,		  //固定写法
	saveUninitialized:true //固定写法
}))

app.post('/api/login',(req,res)=>{
	if(req.body.username !=='admin'||req.body.password !=='000000'){
	res.send({status:1,msg:'登陆失败'})
	return;
	}
	req.session.user = req.body
	req.session.islogin = true
	res.send({status:0,msg:'登陆成功'})
})