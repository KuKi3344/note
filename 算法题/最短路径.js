let map = new Array();
for (let i = 0; i < 2030; i++) {
  map[i] = new Array();
  for (let j = 0; j < 2030; j++) {
    map[i][j] = 0;
  }
}
  function gcd(a,b) {
        return b == 0 ? a : gcd(b, a % b);
    }

    function lcm(a,b) {
        return a * b / gcd(a, b);
    }

    function solution() {
        // 初始化建图
        for (let i = 1; i <= 2021; i++) {
            for (let j = 1; j <= 2021; j++) {
                map[i][j] = Infinity;
            }
        }
        // 邻接矩阵边权重填充
        for (let i = 1; i <= 2021; i++) {
            for (let j = 1; j <= 2021; j++) {
                if (Math.abs(i - j) <= 21) {
                    map[i][j] = lcm(i, j);
                }
            }
        }

        for (let k = 1; k <= 2021; k++) {
            for (let i = 1; i <= 2021; i++) {
                for (let j = 1; j <= 2021; j++) {

                    map[i][j] = Math.min(map[i][j], map[i][k] + map[k][j]);
                }
            }
        }
        
       console.log(map[1][2021]);
    }

solution();


//  function findCheapestPrice(n, flights,src, dst,  k) {
// 		let map = new Array();
// 		for (let i = 0; i < n; i++) {
// 		  map[i] = new Array();
// 		  for (let j = 0; j < n; j++) {
// 		    map[i][j] = 0;
// 		  }
// 		}
// 		let  count= new Array();
// 		for (let i = 0; i < 2030; i++) {
// 		  count[i] = new Array();
// 		  for (let j = 0; j < 2030; j++) {
// 		   count[i][j] = 0;
// 		  }
// 		}
//         for(let i=0;i<n;i++){
//             for(let j=0;j<n;j++){
//                 map[i][j] = Infinity;
//             }
//         }
//         for(let i=0;i<flights.length;i++){
//             map[flights[i][0]][flights[i][1]] = flights[i][2];
//             count[flights[i][0]][flights[i][1]] =1;
//         }
//         for(let i=0;i<n;i++){
//             for(let j=0;j<n;j++){//i = 0,j =2,q = 1; 500 < 100 + 100
//                 for(let q = 0;q<n;q++){
//                     if(map[i][j]<map[i][q]+map[q][j]){
//                         continue;
//                     }else{
//                         let num = count[i][q]+count[q][j];//2
//                         if(num>k+1){
//                             break;
//                         }else{
//                             map[i][j] = map[i][q]+map[q][j];
//                             count[i][j] = count[i][q]+count[q][j];
//                         }
//                     }
//                 }
//             }
//         }
//         return map[src][dst]===Infinity ? -1:map[src][dst];
//     }
// let arr = [[0,1,100],[1,2,100],[0,2,500]];
// let a = findCheapestPrice(3, arr, 0, 2, 1);
// console.log(a);