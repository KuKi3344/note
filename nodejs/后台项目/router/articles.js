const express = require('express')
const router = express.Router()

//导入用户路由处理函数对应的模块
const articlehandler = require('../router_handler/articlehandler')
router.post('/publish',articlehandler.publisharticle)

module.exports = router