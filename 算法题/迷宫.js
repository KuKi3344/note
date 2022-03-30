var visit = [];
	for (let i = 0; i <= 5; i++) {
		visit.push([0,0,0,0,0])
	}
	console.log(visit)
var arr = [[1,1,1,1,1],
			[1,0, 0, 0,1],
			[1,0, 1, 0,1],
			[1,0, 0, 0,1],
			[1,1,1,1,1]
		]
var min = 99999;
	function dfs(m, n, p, q, step) {
		if (m === p && n === q) {
			if(step<min) min = step
			return;
		}
		//往右走
		if (n+1<=qarr[m][n + 1] === 0 && visit[m][n + 1] === 0  ) {
			visit[m][n + 1] = 1;
			dfs(m, n + 1, p, q, step + 1);
			visit[m][n + 1] = 0;
		}
		//往左走
		if (n-1>=1&&arr[m][n - 1] === 0 && visit[m][n - 1] === 0) {
			visit[m][n - 1] = 1;
			dfs(m, n - 1, p, q, step + 1);
			visit[m][n - 1] = 0;
		}
		//往下走
		if (m+1<=p&&arr[m + 1][n] === 0 && visit[m + 1][n] === 0) {
			visit[m + 1][n] = 1;
			dfs(m + 1, n, p, q, step + 1);
			visit[m + 1][n] = 0;
		}
		//往上走

		if (m-1>=1&&arr[m - 1][n] === 0 && visit[m - 1][n] === 0) {
			visit[m - 1][n] = 1;
			dfs(m - 1, n, p, q, step + 1);
			visit[m - 1][n] = 0;
		}
	}

	function main() {
		var m = 1;
		var n = 1;
		var p = 3;
		var q = 3;
		visit[1][1] = 1;
		dfs(m, n, p, q, 0);
		console.log(min)
	}
	main()
