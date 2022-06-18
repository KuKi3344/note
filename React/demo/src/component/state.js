import React, { Component } from 'react'

export default class App extends Component {
	// state = {
	// 	show:true
	// }
	constructor() {
	    super()
		this.state = {
			show:true
		}
	}
	render() {
		return (
			<div>
				<button onClick={()=>{
					this.setState({
						show:!this.state.show
					})
				}}>{this.state.show?"收藏":"取消收藏"}</button>
			</div>
		)
	}
}
