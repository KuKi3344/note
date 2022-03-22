const db = require('../db/index')

exports.publisharticle = (req,res)=>{
	//需要前端的数据格式
	// {
	// 	title:'',
	// 	content:'',
	// 	ispub:'',
	// 	categoryid:'',
	// }
	req.body.authorid = req.user.id
		const sql = 'insert into articles set ?'
		db.query(sql,req.body,(err,result)=>{
			if(err) return res.send({code:500,message:'数据库异常'+err.message})
			if(result.affectedRows !== 1) return res.send({code:1001,message:'发布文章失败'})
			res.send({code:200,message:'发布文章成功'})
		})
}