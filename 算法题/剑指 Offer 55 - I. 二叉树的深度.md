### 剑指 Offer 55 - I. 二叉树的深度

难度简单156

输入一棵二叉树的根节点，求该树的深度。从根节点到叶节点依次经过的节点（含根、叶节点）形成树的一条路径，最长路径的长度为树的深度。

例如：

给定二叉树 `[3,9,20,null,null,15,7]`，

```
    3
   / \
  9  20
    /  \
   15   7
```

返回它的最大深度 3 。

 

**提示：**

1. `节点总数 <= 10000`

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null)  
        return 0;
        int leftDepth = maxDepth(root.left);  //左子树深度
        int rightDepth = maxDepth(root.right);  //右子树深度
        int depth = 1 + Math.max(leftDepth, rightDepth);  //当前节点的深度
        return depth;
    }
}
```

