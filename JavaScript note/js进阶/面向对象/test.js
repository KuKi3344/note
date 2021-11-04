var that;
class Tab{
	constructor(id) {
	    //获取元素
		that = this;
		this.main = document.querySelector(id);	
		this.add = this.main.querySelector('.tabadd');		//因为add按钮不会动态添加,所以不用放在updateNode里
		//获取li的父元素
		this.ul = this.main.querySelector('.firstnav ul:first-child');
		//section的父元素
		this.fsection = this.main.querySelector('.tabscon');
		this.init();
	}
	//init初始化操作,让相关元素绑定事件
	init(){
		this.updateNode();
		this.add.onclick = this.addTab;
		for(var i = 0;i<this.lis.length;i++){
			this.lis[i].index = i;
			this.lis[i].onclick = this.toggleTab; //函数加小括号和不加的区别:不加点击才调用,加了后页面加载就调用
				// 调用toggleTab的是li,所以toggleTab里的this指向的是li
			this.remove[i].onclick = this.removeTab;
		}
	}
	//获取所有的li和section 因为这两个随时可能更新,因为我们动态添加元素需要重新获取对应的元素
	updateNode(){
		this.lis = this.main.querySelectorAll('li');
		this.sections = this.main.querySelectorAll('section');
		this.remove = this.main.querySelectorAll('.icon-guanbi');
	}
	// 1.切换功能
	toggleTab(){
		// console.log(this.index);
		that.clearClass();	//利用构造函数里的this调用这个方法才能li和sections都作用到
		this.className = 'liactive';	//this指向的是lis而非构造函数里的this,所以需要用全局变量that
		that.sections[this.index].className = 'conactive';	// conactive绑定的样式为下边框消失
	}
	// 清除li和section名字的函数
	clearClass(){
		for(var i = 0;i<this.lis.length;i++){
			this.lis[i].className = '';
			this.sections[i].className = '';
		}
	}
	
	//添加功能
	addTab(){
		that.clearClass();
		var random = Math.random();
		//创建li元素和section元素
		var li = '<li class = "liactive"><span>新选项卡</span><span class = "iconfont icon-guanbi">×</span></li>';	
		var section = '<section class = "conactive">新内容'+random+'</section>';
		//把两个元素追加到对应的父元素里面
		that.ul.insertAdjacentHTML('beforeend',li); //把li字符串追加到父元素里面,在最后面追加
		that.fsection.insertAdjacentHTML('beforeend',section); //把li字符串追加到父元素里面,在最后面追加
		that.init();	// 识别新加的li和section并让相关元素绑定事件
	}
	//删除功能
	removeTab(e){
		e.stopPropagation();	//阻止冒泡 ,防止触发li的切换点击事件
		var index = this.parentNode.index;
		console.log(index);
		that.lis[index].remove();
		that.sections[index].remove();
		that.init();	//因为数量发生变化所以需要重新获取元素
		// 当我们删除的不是选中状态的li时,让之前选中的li保持选中不变
		if (document.querySelector('.liactive')) return;
		// 当我们删除选中状态的这个li时,让它的前一个li处于选定状态
		index--;
		//手动调用点击事件,不需要鼠标触发
		//若删除了剩的最后一个,由于that.lis[index]为false,所以不处罚点击事件
		that.lis[index] && that.lis[index].click();
		
	}
	//修改功能
	editTab(){}
}
var tab = new Tab('#tab');