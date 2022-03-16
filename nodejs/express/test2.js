const express = require('express');
const app = express()
app.use((req,res,next)=>{
	next()
})
app.get('/',(req,res)=>{
	console.log('get/');
	res.send('get/')
})
app.get('/user',(req,res)=>{
	console.log('getuser')
	res.send('getuser')
})
