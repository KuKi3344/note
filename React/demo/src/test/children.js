import React from 'react'

export default class children extends React.Component {
	render() {
		var myname = "kuki"
		return (
			<div style={{background:"#99fff9"}}>
				{10+30}- {myname}
			</div>
		)
	}
}
