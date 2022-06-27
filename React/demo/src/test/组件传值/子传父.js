import React, { Component } from 'react'
import Navbar from './Navbar.js'
import Sidebar from './Sidebar.js'

export default class List extends Component {
	constructor() {
	    super()
		this.state={
			isShow:false
		}
	}
	render() {
		return (
			<div>
				<Navbar event={()=>{
					this.setState({
						isShow:!this.state.isShow
					})
				}} />
				{this.state.isShow&&<Sidebar />}
			</div>
		)
	}
}
