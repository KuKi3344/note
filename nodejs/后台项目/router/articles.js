const express = require('express')
const router = express.Router()

//导入用户路由处理函数对应的模块
const articlehandler = require('../router_handler/articlehandler')
//发布
router.post('/publish',articlehandler.publisharticle)
//更新
router.post('/update',articlehandler.updatearticle)
//获取全部
router.get('/get',articlehandler.getallarticle)
//根据id查询
router.get('/get/:id',articlehandler.getsomearticle)
//删除文章
router.post('/delete',articlehandler.deletearticle)
//查询某人的已发布文章
router.get('/author/:id',articlehandler.getmypubarticle)
//根据分类获取文章
router.get('/category/:id',articlehandler.getcatearticle)
module.exports = router