import React, { Component } from 'react'
import Navbar from './Navbar/Navbar.js'
export default class Card extends Component {
	render() {
		return (
			<div>
			<div>
			首页
			<Navbar title="首页" leftshow={true}/>
			</div>
			<div>
			分类
			<Navbar title="分类"  leftshow={true}/>
			</div>
			<div>
			我的
			<Navbar title="我的"  leftshow={false}/>
			</div>
			</div>
		)
	}
}
