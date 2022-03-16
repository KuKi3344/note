//路由模块
const express = require('express');
//创建路由对象
const router = express.Router();
//挂载具体的理由
router.get('/user',(req,res)=>{
	res.send('get user');
})
router.post('/user',(req,res)=>{
	res.send('post user');
})
//向外导出路由对象
module.exports = router