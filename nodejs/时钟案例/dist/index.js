
			window.onload = function(){
				setInterval(()=>{
					var dt = new Date()
					var HH = dt.getHours()
					var mm = dt.getMinutes()
					var ss = dt.getSeconds()
					document.getElementById('box').innerText = HH+':'+mm+':'+ss;
				},1000)
			}