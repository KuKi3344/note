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
//查询我的草稿
router.get('/article/nopub',userinfohandler.getnopub)
//获取你本月文章数目和本月新增文章数
router.get('/article/month',userinfohandler.getmonthcount)
module.exports = router