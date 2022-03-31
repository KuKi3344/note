## [剑指 Offer II 098. 路径的数目](https://leetcode-cn.com/problems/2AoeFn/)

一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。

问总共有多少条不同的路径？

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/2AoeFn
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

![](https://assets.leetcode.com/uploads/2018/10/22/robot_maze.png)

```java
class Solution {
    public int uniquePaths(int m, int n) {
            int [][]dp = new int[m+1][n+1];
            return path(m,n,dp);
             
    }
    public int path(int x,int y,int[][] dp){
        if(dp[x][y]>0){
            return dp[x][y];
        }
            if(x==1||y==1){
                dp[x][y] = 1;
            }else{
                dp[x][y] = path(x,y-1,dp)+path(x-1,y,dp);
            }
            return dp[x][y];
    }
}

```

