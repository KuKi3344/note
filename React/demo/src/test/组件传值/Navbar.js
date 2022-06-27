import React, { Component } from 'react'

export default class Navbar extends Component {
	render() {
		return (
			<div style={{background:"red"}}>
				<button onClick={()=>{this.props.event()}}>click</button>
				<span>navbar</span>
			</div>
		)
	}
}
