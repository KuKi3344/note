import React, { Component } from 'react'
import '../css/index.css'
export default class List extends Component {
	constructor(){
		super()
		this.mytext = React.createRef()
		this.state = {
			list:[{
					id:1,
					text:"zhangsan",
					isCheck:true
				},
				{
						id:2,
						text:'wanglu',
						isCheck:false
				},
				{
						id:3,
						text:"lisi",
						isCheck:false
				}]
		}
	}
	render() {
		return (
			<div>
				<input ref={this.mytext}/>
				<button onClick={()=>this.add()}>add</button>
				<ul>
				{this.state.list.map((item,index)=><li key={item.id}>
				<input type="checkbox" checked={item.isCheck} onChange={()=>{this.handleChecked(index)}}/>
				<span style={{textDecoration:item.isCheck?"line-through":""}}>{item.text}</span>
				<button onClick={()=>this.delete(index)}>delete</button>
				</li>)}
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
	handleChecked(index){
		let newlist = [...this.state.list]
		newlist[index].isCheck = !this.state.list[index].isCheck
		this.setState({
			list : newlist
		})
	}
}