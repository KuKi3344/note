import React, { Component } from 'react'

export default class Navbar extends Component {
	state = {
		
	}
	render() {
		return (
			<div>
			nav-bar{this.props.title}
			{this.props.leftshow && <button>返回</button>}
			</div>
		)
	}
}
