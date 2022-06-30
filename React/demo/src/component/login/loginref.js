import React, { Component } from 'react'

export default class Card extends Component {
	username=React.createRef()
	password=React.createRef()
	render() {
		return (
			<div>
				<h1>登陆页面</h1>
				<Filed label="用户名" type="text" ref={this.username}/>
				<Filed label="密码" type="password" ref={this.password}/>
				<button onClick={()=>{console.log(this.username.current,this.password.current)}}>登录</button>
				<button onClick={()=>{
					this.username.current.clear();
					this.password.current.clear();
					}}>重设</button>
			</div>
		)
	}
}

class Filed extends Component {
	state={
		value:''
	}
	clear(){
		this.setState({
			value:''
		})
	}
	render() {
		return (
			<div>
				<label>{this.props.label}</label>
				<input type={this.props.type} value={this.state.value} onChange={(evt)=>{this.setState({value:evt.target.value})}}/>
			</div>
		)
	}
}
