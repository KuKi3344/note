const express = require('express')
const router = express.Router()

const articlecatehandler = require('../router_handler/articlecate')
//获取文章所有类别
router.get('/all',articlecatehandler.getallcategory)
//新增文章分类
router.post('/add',articlecatehandler.addcategory)
// //删除文章分类
// router.get('/removecate/:id',articlecatehandler.removecategory)
//根据id获取文章分类数据
router.get('/get/:id',articlecatehandler.getsomecategory)
//根据id更新文章分类数据
router.post('/update',articlecatehandler.updatecate)
module.exports = router