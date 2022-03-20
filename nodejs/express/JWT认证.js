var express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const expressJWT = require('express-jwt')
//操作数据库
const mysql = require('mysql')
const db = mysql.createPool({
	host: '127.0.0.1',
	user: 'root',
	password: 'mysql123456',
	database: 'my_db_01'
})

//密钥
const secretKey = 'kukiqwq55'
//解析URL-encoded格式的请求体数据
app.use(express.urlencoded({
	extended: false
}))
//中间件解析请求头部Authorization中携带的token
app.use(expressJWT({
	secret: secretKey,
	algorithms: ['HS256']
}).unless({
	path: [/^\/api\//]
}))
//错误中间件，分析抛出的错误
app.use((err, req, res, next) => {
	if (err.name === 'UnauthorizedError') {
		return res.send({
			status: 401,
			message: '无效的token'
		})
	}
	res.send({
		status: 500,
		message: '未知错误'
	})
})

app.post('/api/login', (req, res) => {
	let username = req.body.username;
	let password = req.body.password
	const sqlStr = 'select * from user where username = ? and password = ?'
	//查询数据库
	db.query(sqlStr, [username, password], (err, result) => {
		if (err) {
			console.log(err)
			return res.send({
				status: 1,
				msg: '登陆失败'
			})
		}
		//小于1说明没查到这个人
		if (result.length < 1) return res.send({
			status: 403,
			message: '用户名或者密码错误'
		});
		//生成token
		const tokenStr = jwt.sign({
			data: result
		}, secretKey, {
			expiresIn: '30s'
		})
		//把token发送给客户端
		res.send({
			status: 200,
			msg: '登陆成功',
			token: tokenStr
		})
	})
})

app.get('/admin/getinfo', function(req, res) {
	//通过中间件解析出来的token会自动挂载到req.user，上面已经全局使用了解析token的中间件
	console.log(req.user)
	res.send({
		status: 200,
		message: 'success',
		data: req.user.data
	})
})

app.listen(80, () => {
	console.log('running')
})
