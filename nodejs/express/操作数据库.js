const mysql = require('mysql')
const db = mysql.createPool({
	host:'127.0.0.1',
	user:'root',
	password:'mysql123456',
	database:'my_db_01'
}) 

//查找
// const sqlstr = 'select * from user where status = 1'
// db.query(sqlstr,(err,result)=>{
// 	if(err){
// 		console.log(err.message)
// 		return
// 	}
// 		console.log(result)
// })

//插入

// const user = {username:'lulu',password:'wlqwq',status:1}
// const sqlstr = 'insert into user set ?'
// db.query(sqlstr,user,(err,result)=>{
// 	if(err){
// 		console.log(err.message)
// 		return;
// 	}
// 	if(result.affectedRows === 1){
// 		console.log('插入成功')
// 	}
// }) 

//更新

// const user = { id: 2 ,username:'王虎',password:'333333'}
// const sqlstr = 'update user set username = ?,password=? where id =?'
// db.query(sqlstr,[user.username,user.password,user.id],(err,result)=>{
// 	if(err){
// 		console.log(err.message)
// 		return
// 	}
// 	if(result.affectedRows === 1){
// 		console.log('更新成功')
// 	}
// })
//利用更新实现标记删除（逻辑删除）
// const user = { id: 2 ,status:0}
// const sqlstr = 'update user set status = ? where id =?'
// db.query(sqlstr,[user.status,user.id],(err,result)=>{
// 	if(err){
// 		console.log(err.message)
// 		return
// 	}
// 	if(result.affectedRows === 1){
// 		console.log('更新成功')
// 	}
// })

//删除
const sqlstr = 'delete from user where id = ?'
db.query(sqlstr,2,(err,result)=>{
	if(err){
		console.log(err.message)
		return
	}
	if(result.affectedRows ===1 ){
		console.log('删除成功')
	}
})