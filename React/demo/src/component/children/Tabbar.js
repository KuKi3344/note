import React, { Component } from 'react'

export default class Tabbar extends Component {
	render() {
		return (
			<div>
			<ul>
				{
						this.props.list.map((item,index)=>
						<li key={item.id} className={this.props.current === index ? 'active' : ''} onClick={()=>this.handleClick(index)}>{item.text}</li>)		
					}
			</ul>
			</div>
		)
	}
	handleClick(index){
		this.props.event(index)
	}
}
