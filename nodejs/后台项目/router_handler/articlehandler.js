const db = require('../db/index')

//发布文章
exports.publisharticle = (req, res) => {
	// //需要前端的数据格式
	// {
	// 	title:'',
	// 	content:'',
	// 	ispub:'',
	// 	categoryid:'',
	// }
	req.body.authorid = req.user.id
	const sql = 'insert into articles set ?'
	db.query(sql, req.body, (err, result) => {
		if (err) return res.send({
			code: 500,
			message: '数据库异常' + err.message
		})
		if (result.affectedRows !== 1) return res.send({
			code: 1001,
			message: '发布文章失败'
		})
		res.send({
			code: 200,
			message: '发布文章成功'
		})
	})
}
//更新文章
exports.updatearticle = (req, res) => {
	if(req.body.title.length < 1 ||req.body.content.length<1||req.body.ispub.length<1|| req.body.cayegoryid.length<1) return res.send({code:1001,message:'参数不合法'})
	const sql = 'select * from articles where id = ? and state = 1'
	db.query(sql, req.body.id, (err, result) => {
		if (err) return res.send({
			code: 500,
			message: '数据库异常' + err.message
		})
		if (result[0].authorid != req.user.id) return res.send({
			code: 401,
			message: '无权限修改他人文章'
		})
		let article = {
			id: req.body.id,
			title: req.body.title,
			content: req.body.content,
			ispub: req.body.ispub,
			categoryid: req.body.categoryid
		}
		const sqlstr = 'update articles set ? where id = ?'
		db.query(sqlstr, [article, req.body.id], (err, result) => {
			if (err) return res.send({
				code: 500,
				message: '数据库异常' + err.message
			})
			if (result.affectedRows !== 1) return res.send({
				code: 1002,
				message: '更新文章失败'
			})
			res.send({
				code: 200,
				message: '编辑文章成功'
			})
		})
	})
}
//查询全部文章
exports.getallarticle = (req, res) => {
	const sql =
		'select articles.*,article_cate.name,user.nickname from articles,article_cate,user where articles.state = 1 and articles.ispub = "发布" and user.id = articles.authorid and article_cate.id = articles.categoryid order by articles.first_pub asc'
	db.query(sql, (err, result) => {
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
			message: '查询所有文章成功',
			data: result
		})
	})
}
//查询某个文章
exports.getsomearticle = (req, res) => {
	const sql =
		'select articles.*,article_cate.name,user.nickname from articles,article_cate,user where articles.id = ? and articles.state = 1 and articles.ispub = "发布" and user.id = articles.authorid and article_cate.id = articles.categoryid'
		db.query(sql,req.params.id,(err, result) => {
			if (err) return res.send({
				code: 500,
				message: '数据库异常' + err.message
			})		
				result[0] = {
					id: result[0].id,
					title: result[0].title,
					content: result[0].content,
					ispub: result[0].ispub,
					category: {
						id: result[0].categoryid,
						name: result[0].name
					},
					author: {
						id: result[0].authorid,
						nickname: result[0].nickname
					},
					cover_img: result[0].cover_img,
					first_pub: result[0].first_pub,
					last_pub: result[0].last_pub
				}
			res.send({
				code: 200,
				message: '查询文章成功',
				data: result
			})
		})
}
//删除文章
exports.deletearticle = (req,res)=>{
	const sql = 'select * from articles where id = ?'
	db.query(sql,req.body.id,(err,result)=>{
		if (err) return res.send({
			code: 500,
			message: '数据库异常' + err.message
		})	
		if (result[0].authorid != req.user.id) return res.send({
			code: 401,
			message: '无权限删除他人文章'
		})
		const sqlstr = 'update articles set state = 0 where id = ?'
		db.query(sqlstr,req.body.id, (err, result) => {
			if (err) return res.send({
				code: 500,
				message: '数据库异常' + err.message
			})
			if (result.affectedRows !== 1) return res.send({
				code: 1002,
				message: '删除文章失败'
			})
			res.send({
				code: 200,
				message: '删除文章成功'
			})
		})
	})
}
//获取某人的发布文章
exports.getmypubarticle = (req,res)=>{
	const sql =
		'select articles.*,article_cate.name,user.nickname from articles,article_cate,user where articles.state = 1 and articles.ispub = "发布" and user.id = articles.authorid and article_cate.id = articles.categoryid and articles.authorid = ? order by articles.first_pub asc'
	db.query(sql,req.params.id,(err,result)=>{
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
			message: '查询某人所有文章成功',
			data: result
		})
	})
}
//通过分类获取文章
exports.getcatearticle = (req,res)=>{
	const sql =
		'select articles.*,article_cate.name,user.nickname from articles,article_cate,user where articles.state = 1 and articles.ispub = "发布" and user.id = articles.authorid and article_cate.id = articles.categoryid and article_cate.id = ? order by articles.first_pub asc'
	db.query(sql,req.params.id,(err,result)=>{
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
			message: '查询某分类所有文章成功',
			data: result
		})
	})
}