import React, { Component } from 'react'
import axios from 'axios'
export default class Cinema extends Component {
	constructor() {
	    super()
		this.state={
			cinemaList:[],
			filterList:[]
		}
		this.handleInput = this.handleInput.bind(this)
		//请求数据
		// axios.get("https://m.maizuo.com/gateway?cityId=210200&pageNum=1&pageSize=10&type=1&k=9054155").then(res=>{
		// 	console.log(res)
		// }).catch(err=>{console.log(err)})
		axios({
			url:'https://m.maizuo.com/gateway?cityId=210200&ticketFlag=1&k=3872937',
			methods:'get',
			headers:{
				'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.0","e":"16557821981743048052572161"}',
				'X-Host': 'mall.film-ticket.cinema.list'
				}
			}).then(res=>{
				console.log(res.data)
				this.setState({
					cinemaList:res.data.data.cinemas,
					filterList:res.data.data.cinemas
				})
			}).catch(err=>{
				console.log(err)
			})
	}
	render() {
		return (
			<div className="list">
			<div className="head">
			<input placeholder="请输入查询内容" className="searchCinema" onInput={this.handleInput}/>
			</div>
				{
					this.state.filterList.map(item=>
					<dl key={item.cinemaId}>
					<dt>{item.name}</dt>
					<dd>{item.address}</dd>
					</dl>
					)
				}
			</div>
		)
	}
	handleInput(event){
		let newlist = this.state.cinemaList.filter(item=>item.name.toUpperCase().includes(event.target.value.toUpperCase())||
		item.address.toUpperCase().includes(event.target.value.toUpperCase()))
		this.setState({
			filterList:newlist
		})
	}
}
