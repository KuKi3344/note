const express = require('express')
const app = express()

//通过exoress.json()来解析表单中JSON格式的数据
app.use(express.json())
app.use(express.urlencoded({entended:false}))

app.post('/user',(req,res)=>{
	console.log(req.body)
	//在服务器可以用req.body这个属性，来接受客户端发送过来的请求体数据
	//默认情况下，如果不配置解析表单数据的中间件，req.body默认等于undefined
	//json数据是用postman在body里的x-www-form-urlencoded发送的模拟数据
	res.send('ok')
})

app.post('/book',(req,res)=>{
	//json数据是用postman在body里的row选择json格式发送的模拟数据
	console.log(req.body)
	res.send('ok')
})

app.listen(80,()=>{
	console.log('running')
})
