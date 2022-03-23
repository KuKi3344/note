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
exports.updatepwd = (req, res) => {
	const body = req.body
	if (body.newpwd.length < 6) {
		return res.send({
			code: 1001,
			message: '密码长度不合法'
		})
	}
	if (body.newpwd === body.oldpwd) return res.send({
		code: 1001,
		message: '新旧密码相同，无需修改'
	})
	const sql = 'select password from user where id = ?'
	db.query(sql, req.user.id, (err, result) => {
		if (err) return res.send({
			code: 500,
			message: '数据库异常'
		})
		if (result.length !== 1) return res.send({
			code: 1002,
			message: '用户状态异常'
		})
		const compareresult = bcrypt.compareSync(req.body.oldpwd, result[0].password);
		if (!compareresult) {
			return res.send({
				code: 1002,
				message: '旧密码密码错误'
			})
		}
		let password = bcrypt.hashSync(body.newpwd, 10);
		const sqlstr = 'update user set password = ? where id = ?'
		db.query(sqlstr, [password, req.user.id], (err, result) => {
			if (err) return res.send({
				code: 500,
				message: '数据库异常' + err.message
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
exports.updateavatar = (req, res) => {
	if (req.body.face.length < 1) return res.send({
		code: '1001',
		message: '头像不能为空'
	})
	const sql = 'update user set face = ? where id = ?'
	db.query(sql, [req.body.face, req.user.id], (err, result) => {
		if (err) return res.send({
			code: 500,
			message: '数据库异常' + err.message
		})
		if (result.affectedRows !== 1) return res.send({
			code: 1003,
			message: '更新用户头像失败'
		})
		res.send({
			code: 200,
			message: "更新用户头像成功"
		})
	})
}
//获取我的草稿
exports.getnopub = (req, res) => {
	const sql =
		'select articles.*,article_cate.name,user.nickname from articles,article_cate,user where articles.state = 1 and articles.ispub = "草稿" and user.id = articles.authorid and article_cate.id = articles.categoryid and articles.authorid = ? order by articles.first_pub asc'
	db.query(sql, req.user.id, (err, result) => {
		if (err) return res.send({
			code: 500,
			message: '数据库异常' + err.message
		})
		for (let i = 0; i < result.length; i++) {
			result[i] = {
				id: result[i].id,
				title: result[i].title,
				content: result[i].content,
				ispub: result[i].ispub,
				category: {
					id: result[i].categoryid,
					name: result[i].name
				},
				author: {
					id: result[i].authorid,
					nickname: result[i].nickname
				},
				cover_img: result[i].cover_img,
				first_pub: result[i].first_pub,
				last_pub: result[i].last_pub
			}
		}
		res.send({
			code: 200,
			message: '查询我的所有草稿成功',
			data: result
		})
	})
}
//获取自己本月文章数目和所有人加一起的文章总数
exports.getmonthcount = (req, res) => {
	let month = new Date().getMonth() + 1
	let data = {
		mypubcount:'',
		allpubcount:''
	}
	const sql = 'select * from articles where month(first_pub) = ? and authorid = ?'
	db.query(sql, [month, req.user.id], (err, result) => {
		if (err) return res.send({
			code: 500,
			message: '数据库异常' + err.message
		})
		data.mypubcount = result.length
		const sqlstr = 'select * from articles where month(first_pub) = ?'
		db.query(sqlstr, month, (err, result) => {
			if (err) return res.send({
				code: 500,
				message: '数据库异常' + err.message
			})	
			data.allpubcount = result.length;
			res.send({code:'200',message:'查询本月你的发布文章数目与本月发表全部文章数目成功',data:data})
		})
	})

}
