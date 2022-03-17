const express = require('express')
const app = express()
const bodyparSer = require('./custom-parse.js')
app.use(bodyparSer)

app.post('/user',(req,res)=>{
	res.send(req.body)
})

app.listen(80,()=>{
	console.log('running');
})