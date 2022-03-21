const express = require('express')
const router = express.Router()

const userinfohandler = require('../router_handler/userinfo')
router.get('/userinfo',userinfohandler.getuserinfo)
router.post('/updateinfo',userinfohandler.updateinfo)

module.exports = router