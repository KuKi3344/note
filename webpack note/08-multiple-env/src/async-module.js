function getComponent(){
	//imprt函数返回的是promise//  成功之后的回调函数
	return import('lodash')
	.then(({default: _})=>{
		const element = document.createElement('div')
		element.innerHTML = _.join(['hello','webpack'],' ')
		return element
	})
}
getComponent().then((element)=>{
	document.body.appendChild(element)
})