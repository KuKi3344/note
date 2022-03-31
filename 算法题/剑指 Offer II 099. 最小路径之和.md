## [剑指 Offer II 099. 最小路径之和](https://leetcode-cn.com/problems/0i0mDW/)

给定一个包含非负整数的 m x n 网格 grid ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。

说明：一个机器人每次只能向下或者向右移动一步。

 

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/0i0mDW
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

![](https://assets.leetcode.com/uploads/2020/11/05/minpath.jpg)

```java
class Solution {
    public int minPathSum(int[][] grid) {
        int[][] dp = new int[grid.length][grid[0].length];
        dp[0][0] = grid[0][0];
        for(int i=1;i<grid.length;i++){
            dp[i][0] = dp[i-1][0] + grid[i][0];
        }
        for(int i=1;i<grid[0].length;i++){
            dp[0][i] = dp[0][i-1] + grid[0][i];
        }
        for(int i=1;i<grid.length;i++){
            for(int j=1;j<grid[0].length;j++){
                dp[i][j] = Math.min(dp[i-1][j],dp[i][j-1])+grid[i][j];
            }
    }
         return dp[grid.length-1][grid[0].length-1];
    }
}
```

