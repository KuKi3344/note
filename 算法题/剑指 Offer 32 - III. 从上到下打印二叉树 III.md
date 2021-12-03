## 剑指 Offer 32 - III. 从上到下打印二叉树 III

请实现一个函数按照之字形顺序打印二叉树，即第一行按照从左到右的顺序打印，第二层按照从右到左的顺序打印，第三行再按照从左到右的顺序打印，其他行以此类推。

 

例如:
给定二叉树: [3,9,20,null,null,15,7],

    3
   / \
  9  20
    /  \
   15   7
返回其层次遍历结果：

[
  [3],
  [20,9],
  [15,7]
]


提示：

节点总数 <= 1000

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/cong-shang-dao-xia-da-yin-er-cha-shu-iii-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```java
class Solution {
  public List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> res = new ArrayList<>();
    if (root == null) return res;
    Deque<TreeNode> queue = new LinkedList<>();
    queue.add(root);
    boolean odd = true;
    while (!queue.isEmpty()) {
      int size = queue.size();
      List<Integer> list = new ArrayList<>();
      // 遍历当前层
      for (int i = 0; i < size; i++) {
        TreeNode node = queue.poll();
        // 将当前层节点值存入list中
        list.add(node.val);
        // 将左子节点放入queue
        if (node.left != null) queue.offer(node.left);
        // 将右子节点放入queue
        if (node.right != null) queue.offer(node.right);
      }
      // 奇数层：从左向右，偶数层：从右向左
      if (!odd) Collections.reverse(list);
      res.add(list);
      odd = !odd;
    }
    return res;
  }
}
```

