import React, { Component } from 'react'
import PropTypes from 'prop-types'
export default class Navbar extends Component {
	state = {
		
	}
	render() {
		return (
			<div>
			{this.props.leftshow && <button>返回</button>}
			nav-bar{this.props.title}
			{!this.props.leftshow && <button>home</button>}
			</div>
		)
	}
}
Navbar.protoTypes = {
	title:PropTypes.string,
	leftshow:PropTypes.bool,
}
Navbar.defaultProps = {
	leftshow:false
}
