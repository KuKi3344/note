const express = require('express')
const router = express.Router()

//导入用户路由处理函数对应的模块
const userhandler = require('../router_handler/userhandler')
//api
router.post('/reguser',userhandler.reUser)
router.post('/login',userhandler.login)
module.exports = router