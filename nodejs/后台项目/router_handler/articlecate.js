const db = require('../db/index')

//获取文章分类模块
exports.getallcategory = (req, res) => {
	const sql = 'select * from article_cate where status = 1 order by id asc'
	db.query(sql, (err, result) => {
		if (err) return res.send({
			code: 500,
			message: '数据库异常'
		})
		res.send({
			code: 200,
			message: '获取文章分类成功',
			data: result
		})
	})
}
//新增文章分类模块
exports.addcategory = (req, res) => {
	if (req.body.name.length < 1 || req.body.alias.length < 1 || req.body.intro.length < 1) return res.send({
		code: 1001,
		message: '参数格式不合法'
	})
	const sql = 'select * from article_cate where name = ? or alias = ?'
	db.query(sql, [req.body.name, req.body.alias], (err, result) => {
		if (err) return res.send({
			code: 500,
			message: '数据库异常'
		})
		if (result.length === 2) return res.send({
			code: 1002,
			message: '分类名称与别名都被占用,请更换后重试'
		})
		if (result.length === 1 && result[0].name === req.body.name && result[0].alias === req.body.alias) {
			return res.send({
				code: 1002,
				message: '分类名称与别名都被占用,请更换后重试'
			})
		}
		if (result.length === 1 && result[0].name === req.body.name) return res.send({
			code: 1002,
			message: '分类名称被占用,请更换后重试'
		})
		if (result.length === 1 && result[0].alias === req.body.alias) return res.send({
			code: 1002,
			message: '分类别名被占用,请更换后重试'
		})
		const sqlstr = 'insert into article_cate set ?'
		req.body.originator = req.user.id;
		db.query(sqlstr, req.body, (err, result) => {
			if (err) return res.send({
				code: 500,
				message: '数据库异常'
			})
			if (result.affectedRows !== 1) return res.send({
				code: 1002,
				message: '添加文章分类失败'
			})
			res.send({
				code: 200,
				message: '新增文章分类成功'
			})
		})
	})
}
// //删除文章分类
// exports.removecategory = (req, res) => {
// 	req.params.id = parseInt(req.params.id)
// 	if (Number.isNaN(req.params.id)) return res.send({
// 		code: 1001,
// 		message: '参数不合法'
// 	})
// 	//对比请求用户是否是创始人
// 	const sql = 'select * from article where categoryid = ?'
// 	db.query(sql, req.params.id, (err, result) => {
// 		if (err) return res.send({
// 			code: 500,
// 			message: '数据库异常'
// 		})
// 		if (result.length>0) {
// 			return res.send({
// 				code: 401,
// 				message: '当前分类中还有文章，禁止删除'
// 			})
// 		}
// 		const sqlstr = 'update article_cate set status = 0 where id = ?'
// 		db.query(sqlstr,req.params.id,(err,result)=>{
// 			if (err) return res.send({
// 				code: 500,
// 				message: '数据库异常'
// 			})
// 			if(result.affectedRows !== 1) return res.send({code:1002,message:'删除文章分类失败'})
// 			res.send({code:200,message:'删除文章分类成功'})
// 		})
// 	})
// }
//根据id获取文章分类
exports.getsomecategory = (req,res)=>{
	req.params.id = parseInt(req.params.id)
	if (Number.isNaN(req.params.id)) return res.send({
		code: 1001,
		message: '参数不合法'
	})
	const sql = 'select article_cate.*,user.nickname from article_cate , user where article_cate.status = 1 and article_cate.id = ? and user.id  = article_cate.originator '
	db.query(sql,req.params.id, (err, result) => {
		if (err) return res.send({
			code: 500,
			message: '数据库异常'+err.message
		})
		res.send({
			code: 200,
			message: '获取该分类成功',
			data: result
		})
	})
	
}
//根据id更新文章分类数据
exports.updatecate = (req, res) => {
	const body = req.body
	if (body.name.length < 1 || body.name.length > 30) return res.send({
		code: 1001,
		message: '分类名长度异常'
	})
	if (body.alias.length < 1 || body.alias.length > 20) return res.send({
		code: 1001,
		message: '别名长度异常'
	})
	if (body.intro.length < 1 || body.intro.length > 150) return res.send({
		code: 1001,
		message: '简介长度异常'
	})
	console.log(body.originator,req.user.id)
	if(body.originator != req.user.id) return res.send({code:401,message:'暂无权限'})
	const sql = `update article_cate set ? where id = ?`
	db.query(sql, [body, body.id], (err, result) => {
		if (err) return res.send({
			code: 500,
			message: '数据库异常'
		})
		if (result.affectedRows !== 1) return res.send({
			code: 1002,
			message: '更新文章类别失败'
		})
		res.send({
			code: 200,
			message: '更新文章类别成功'
		})
	})
}
