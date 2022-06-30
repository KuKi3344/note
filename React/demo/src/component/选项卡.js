import React, { Component } from 'react'
import Film from './children/Film.js'
import Cinema from './children/Cinema.js'
import Center from './children/Center.js'
import Tabbar from './children/Tabbar.js'
import Navbar from './children/Navbar.js'
import '../css/choose.css'

export default class Card extends Component {
	constructor() {
	    super()
		this.state = {
			current:0,
			list:[{
					id:1,
					text:'电影'
				},
				{
					id:2,
					text:"影院"
				},
				{
					id:3,
					text:'我的'
				}]
		}
	}
	render() {
		return (
			<div>
			<Navbar gocenter={()=>this.setState({current:2})}/>
				{
					this.which()
				}
				<Tabbar list={this.state.list} current={this.state.current} event={
					(index)=>{this.setState({
						current:index
					})}
					}/>
			</div>
		)
	}
	which(){
		switch(this.state.current){
			case 0:
				return <Film></Film>
			case 1:
				return <Cinema></Cinema>
			case 2:
				return <Center></Center>
			default:
				return;
				
		}
	}
}
