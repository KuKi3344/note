import React, { Component } from 'react'

export default class List extends Component {
	constructor() {
	    super()
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
	render(){
		var newlist = this.state.list.map(item=><li key={item.id}>{item.text}</li>)
		return (
			<div>
				<ul>{newlist}</ul>
			</div>
		)
	}
}
