import React, { Component } from 'react'

export default class Card extends Component {
	state={
		username:'',
		password:''
	}
	render() {
		return (
			<div>
				<h1>登陆页面</h1>
				<Filed label="用户名" type="text" onChange={(value)=>{this.setState({username:value})}} value={this.state.username}/>
				<Filed label="密码" type="password" onChange={(value)=>{this.setState({password:value})}} value={this.state.password}/>
				<button onClick={()=>{}}>登录</button>
				<button onClick={()=>{this.setState({username:'',password:''})}}>重设</button>
			</div>
		)
	}
}

class Filed extends Component {
	render() {
		return (
			<div>
				<label>{this.props.label}</label>
				<input type={this.props.type} onChange={(evt)=>{this.props.onChange(evt.target.value)}} value={this.props.value}/>
			</div>
		)
	}
}
