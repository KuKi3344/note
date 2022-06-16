import React from 'react'
import ReactDOM from 'react-dom/client'; 
import List from './component/todolist.js'

class App extends React.Component{
	render(){
		return(
			<div>
				<List />
			</div>
		)
	}
}
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);

