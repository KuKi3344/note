//入口文件
const express = require('express')
const app = express()
//跨域
const cors = require('cors')
app.use(cors())
//解析表单数据，只能解析application/x-www-form-urlencoded格式的表单数据
app.use(express.urlencoded({extended:false}))

const userRouter = require('./router/user')
app.use('/api',userRouter)



app.listen(8848,()=>{
	console.log('runnning at 8848')
})