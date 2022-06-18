import React, { Component } from 'react'

export default class List extends Component {
	mytext = React.createRef()
	render() {
		return (
			<div>
				<input ref={this.mytext}/>
				<button onClick={()=>this.handleClick()}>add</button>
			</div>
		)
	}
	handleClick(){
		console.log("click",this.mytext.current.value)
	}
}