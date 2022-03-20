const db = require('../db/index')
const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')
const expressJWT = require('express-jwt')

exports.reUser = (req,res)=>{
	const userinfo = req.body
	if(!userinfo.username || !userinfo.password){
		return res.send({code:1001,message:'用户名或密码不合法'})
	}
	const sql = 'select * from user where username = ?'
	db.query(sql,[userinfo.username],(err,result)=>{
		if(err){
			return res.send({code:500,message:'数据库异常'+err.message})
		}
		if(result.length>0){
			return res.send({code:1002,message:'用户名已存在,请更换'})
		}
		//调用bcryptjs的hashSync()对密码进行加密
		userinfo.password = bcrypt.hashSync(userinfo.password,10);
		const insertsql = 'insert into user set ?';
		userinfo.status = 1
		db.query(insertsql,userinfo,(err,result)=>{
			if(err){
				return res.send({code:500,message:'数据库异常'+err.message})
			}
			if(result.affectedRows !== 1) return res.send({code:1003,message:'注册失败，请稍后再试'})
			//注册成功
			res.send({code:200,message:'注册成功'})
		})
	})
	
}

const secretKey = 'kukiqwq55'
exports.login = (req,res)=>{
	let userinfo = req.body
	const sqlStr = 'select * from user where username = ?'
	//查询数据库
	db.query(sqlStr, userinfo.username, (err, result) => {
		if (err) {
			return res.send({
				code:500,
				msg: '数据库异常'+err.message
			})
		}
		//小于1说明没查到这个人
		if (result.length < 1) return res.send({
			code: 1001,
			message: '不存在此用户'
		})
		const compareresult = bcrypt.compareSync(userinfo.password,result[0].password);
		if(!compareresult){
		return res.send({code:1002,message:'密码错误'})
		}
		//生成token
		console.log(result[0].id)
		const tokenStr = jwt.sign({
			id: result[0].id,
			username:result[0].username
		}, secretKey, {
			expiresIn: '30s'
		})
		//把token发送给客户端
		res.send({
			code: 200,
			msg: '登陆成功',
			token: tokenStr
		})
	})
}