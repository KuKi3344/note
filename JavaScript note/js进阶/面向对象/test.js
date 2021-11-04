var that;
class Tab{
	constructor(id) {
	    //获取元素
		that = this;
		this.main = document.querySelector(id);
		this.lis = this.main.querySelectorAll('li');
		this.sections = this.main.querySelectorAll('section');
		this.init();
	}
	//init初始化操作,让相关元素绑定事件
	init(){
		for(var i = 0;i<this.lis.length;i++){
			this.lis[i].index = i;
			this.lis[i].onclick = this.toggleTab; //函数加小括号和不加的区别:不加点击才调用,加了后页面加载就调用
				// 调用toggleTab的是li,所以toggleTab里的this指向的是li
		}
	}
	// 1.切换功能
	toggleTab(){
		// console.log(this.index);
		that.clearClass();	//利用构造函数里的this调用这个方法才能li和sections都作用到
		this.className = 'liactive';	//this指向的是lis而非构造函数里的this,所以需要用全局变量that
		that.sections[this.index].className = 'conactive';
	}
	clearClass(){
		for(var i = 0;i<this.lis.length;i++){
			this.lis[i].className = '';
			this.sections[i].className = ';'
		}
	}
	
	//添加功能
	addTab(){}
	//删除功能
	removeTab(){}
	//修改功能
	editTab(){}
}
var tab = new Tab('#tab');