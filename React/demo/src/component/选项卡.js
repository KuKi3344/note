import React, { Component } from 'react'
import Film from './children/Film.js'
import Cinema from './children/Cinema.js'
import Center from './children/Center.js'
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
				{
					this.which()
				}
				<ul>
				{
						this.state.list.map((item,index)=>
						<li key={item.id} className={this.state.current === index ? 'active' : ''} onClick={()=>this.handleClick(index)}>{item.text}</li>)		
					}
				</ul>
			</div>
		)
	}
	handleClick(index){
		this.setState({
			current:index
		})
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
