import React, { Component } from 'react'
import '../css/index.css'
export default class List extends Component {
	constructor(){
		super()
		this.mytext = React.createRef()
		this.state = {
			list:[{
					id:1,
					text:"zhangsan"
				},
				{
						id:2,
						text:'wanglu'
				},
				{
						id:3,
						text:"lisi"
				}]
		}
	}
	render() {
		return (
			<div>
				<input ref={this.mytext}/>
				<button onClick={()=>this.add()}>add</button>
				<ul>
				{this.state.list.map((item,index)=><li key={item.id}>{item.text} <button onClick={()=>this.delete(index)}>delete</button></li>)}
				</ul>
				<div className={this.state.list.length<1 ? '':'hidden'}>暂无待办事项</div>
			</div>
		)
	}
	add(){
		let newlist = this.state.list
		newlist.push({
			id:Date.now(),
			text:this.mytext.current.value})
		this.setState({
			list:newlist
		})
		this.mytext.current.value=""
	}
	delete(index){
		let newlist = this.state.list
		newlist.splice(index,1)
		this.setState({
			list:newlist
		})
	}
}