import React from 'react'
import ReactDOM from 'react-dom/client'; 
import Card from './component/props.js'

class App extends React.Component{
	render(){
		return(
			<div>
				<Card />
			</div>
		)
	}
}
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
