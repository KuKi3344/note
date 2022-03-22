const express = require('express')
const router = express.Router()

const userinfohandler = require('../router_handler/userinfo')
//获取用户信息
router.get('/userinfo',userinfohandler.getuserinfo)
//更新用户信息
router.post('/updateinfo',userinfohandler.updateinfo)
//重置密码
router.post('/updatepwd',userinfohandler.updatepwd)
//更换头像
router.post('/update/avatar',userinfohandler.updateavatar)
module.exports = router