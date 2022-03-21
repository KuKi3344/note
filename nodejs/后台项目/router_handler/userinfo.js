const db = require('../db/index')

exports.getuserinfo = (req, res) => {
	let result = req.user;
	const sql = 'select * from user where id = ?'
	db.query(sql, result.id, (err, result) => {
		if (err) return res.send({
			code: 500,
			message: '数据库异常'
		})
		if (result.length !== 1) return res.send({
			code: 1001,
			message: '用户状态异常，获取信息失败'
		})
		result[0].password = '********'
		res.send({
			code: '200',
			message: '获取用户信息成功',
			data: result[0]
		})
	})
}
exports.updateinfo = (req, res) => {
	const body = req.body
	var regemail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
	if (!regemail.test(body.email)) return res.send({
		code: 1001,
		message: '邮箱验证错误'
	})
	if (body.nickname.length < 1 || body.nickname.length > 20) return res.send({
		code: 1001,
		message: '昵称长度异常'
	})
	const sql = `update user set ? where id = ?`
	db.query(sql, [body, body.id], (err, result) => {
		if (err) return res.send({
			code: 500,
			message: '数据库异常'
		})
		if (result.affectedRows !== 1) return res.send({
			code: 1002,
			message: '更新用户基本信息失败'
		})
		res.send({
			code: 200,
			message: '更新用户基本信息成功'
		})
	})
}
