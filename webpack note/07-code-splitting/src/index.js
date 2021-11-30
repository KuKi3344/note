import hello from './hello.js'
import imgsrc from './asset/花店.jpg'
import logSvg from './asset/arrow-up.svg'
import pngmap from './asset/2.png'
import './style.css'
import './style.less'
import Data from './asset/data.xml'
import Notes from './asset/data.csv'
import './async-module.js'

hello();
const img = document.createElement('img')
img.style.cssText = 'width:200px;height:200px'
img.src = imgsrc
document.body.appendChild(img)

const img2 = document.createElement('img')
img2.style.cssText = 'width:200px;height:200px'
img2.src = logSvg
document.body.appendChild(img2)

const img3 = document.createElement('img')
img3.style.cssText = 'width:400px;height:400px;display:block'
img3.src = pngmap
document.body.appendChild(img3)

console.log(Data);
console.log(Notes);


//index.js添加
const button = document.createElement('button')
button.textContent = '点击执行加法运算'
button.addEventListener('click',()=>{
		import(/*webpackChunkName:'math',webpackPrefetch:true*/'./math.js').then(({ add })=>{
			console.log(add(4,5))
		})
})
document.body.appendChild(button)