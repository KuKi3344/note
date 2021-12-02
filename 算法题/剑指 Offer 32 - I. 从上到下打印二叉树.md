## 剑指 Offer 32 - I. 从上到下打印二叉树

从上到下打印出二叉树的每个节点，同一层的节点按照从左到右的顺序打印。

 

例如:
给定二叉树: [3,9,20,null,null,15,7],

​	3

   / \
  9  20
    /  \
   15   7
返回：

[3,9,20,15,7]


提示：

节点总数 <= 1000

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/cong-shang-dao-xia-da-yin-er-cha-shu-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```java
class Solution {
    public int[] levelOrder(TreeNode root) {
        if (root == null){
            return new int[0];
        }
        int [] list = new int[1009];
        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root);
        int idx = 0;
        while (queue.size()>0){
            TreeNode node = queue.poll();
            list[idx++] = node.val;
            if (node.left != null){
                queue.add(node.left);
            }
            if (node.right != null){
                queue.add(node.right);
            }
        }
        int[] res= new int[idx];
        for(int i = 0;i<idx;i++){
            res[i] = list[i];
        }
        return res;
    }
}

```

