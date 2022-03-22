const db = require('../db/index')
const bcrypt = require('bcryptjs')

//获取信息
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
//更新信息(昵称和邮箱)
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
	db.query(sql, [body, req.user.id], (err, result) => {
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
//重置密码
exports.updatepwd = (req,res)=>{
	const body = req.body
	if(body.newpwd.length < 6){
		return res.send({code:1001,message:'密码长度不合法'})
	}
	if(body.newpwd === body.oldpwd) return res.send({code:1001,message:'新旧密码相同，无需修改'})
	const sql  = 'select password from user where id = ?'
	db.query(sql,req.user.id,(err,result)=>{
		if (err) return res.send({
			code: 500,
			message: '数据库异常'
		})	
		if(result.length !==1) return res.send({code:1002,message:'用户状态异常'})
		const compareresult = bcrypt.compareSync(req.body.oldpwd, result[0].password);
		if (!compareresult) {
			return res.send({
				code: 1002,
				message: '旧密码密码错误'
			})
		}
		let password = bcrypt.hashSync(body.newpwd, 10);
		const sqlstr = 'update user set password = ? where id = ?'
		db.query(sqlstr,[password,req.user.id],(err,result)=>{
			if (err) return res.send({
				code: 500,
				message: '数据库异常'+err.message
			})	
			if (result.affectedRows !== 1) return res.send({
				code: 1003,
				message: '更新用户密码失败'
			})
			res.send({
				code: 200,
				message: '更新用户密码成功'
			})
		})
	})
}
//更新头像
exports.updateavatar = (req,res)=>{
	if(req.body.face.length<1) return res.send({code:'1001',message:'头像不能为空'})
	const sql = 'update user set face = ? where id = ?'
	db.query(sql,[req.body.face,req.user.id],(err,result)=>{
		if (err) return res.send({
			code: 500,
			message: '数据库异常'+err.message
		})	
		if (result.affectedRows !== 1) return res.send({
			code: 1003,
			message: '更新用户头像失败'
		})
		res.send({code:200,message:"更新用户头像成功"})
	})
}