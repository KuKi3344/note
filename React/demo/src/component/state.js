import React, { Component } from 'react'

export default class App extends Component {
	// state = {
	// 	show:true
	// }
	constructor() {
	    super()
		this.state = {
			show:true,
			name:'kuki',
		}
	}
	render() {
		return (
			<div>
			<h1>{this.state.name}</h1>
				<button onClick={()=>{
					this.setState({
						show:!this.state.show,
						name:"xiaohong"
					})
				}}>{this.state.show?"收藏":"取消收藏"}</button>
			</div>
		)
	}
}
