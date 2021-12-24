## 剑指 Offer 54. 二叉搜索树的第k大节点

给定一棵二叉搜索树，请找出其中第 k 大的节点的值。

 

示例 1:

输入: root = [3,1,4,null,2], k = 1
   3
  / \
 1   4
  \
   2
输出: 4
示例 2:

输入: root = [5,3,6,2,4,null,null,1], k = 3
       5
      / \
     3   6
    / \
   2   4
  /
 1
输出: 4


限制：

1 ≤ k ≤ 二叉搜索树元素个数

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/er-cha-sou-suo-shu-de-di-kda-jie-dian-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

首先要明确二叉搜索树的概念，了解二叉搜索树中序遍历为递增序列，那么二叉搜索树的中序遍历的倒序就为递减序列了，所以二叉搜索树第k大的节点可以转化为求此树的中序遍历倒序的第k个节点

```java
class Solution {
    int res;
    int index = 0; //计数器
    public int kthLargest(TreeNode root, int k) {
        dfs(root,k);
        return res;
    }
    void dfs(TreeNode root ,int k) 
    {
        if(root == null) return;
        dfs(root.right,k); //右   
        //每有一个根节点，index就++
        index++;
        if(k == index) res = root.val; //根
        dfs(root.left,k); //左
    }
}

```

