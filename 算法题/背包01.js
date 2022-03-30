const w = [0,2,3,5,5]
const v = [0,2,4,3,7]

function go(){
	console.log(bag(4,10))
}

function bag(a,b){
	let result = 0;
	if(a===0||b===0){
		result = 0
	}else if(w[a]>b){
		result = bag(a-1,b)
	}else{
		//如果容量没超过剩余容量，可以选择放或者不放，取二者最大值
		result = Math.max(bag(a-1,b),bag(a-1,b-w[a])+v[a])
	}
	return result
}
go()