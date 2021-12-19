### 剑指 Offer 52. 两个链表的第一个公共节点

输入两个链表，找出它们的第一个公共节点。

如下面的两个链表：

![](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/14/160_statement.png)

在节点 c1 开始相交。

 

示例 1：

![](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/14/160_example_1.png)

输入：intersectVal = 8, listA = [4,1,8,4,5], listB = [5,0,1,8,4,5], skipA = 2, skipB = 3
输出：Reference of the node with value = 8
输入解释：相交节点的值为 8 （注意，如果两个列表相交则不能为 0）。从各自的表头开始算起，链表 A 为 [4,1,8,4,5]，链表 B 为 [5,0,1,8,4,5]。在 A 中，相交节点前有 2 个节点；在 B 中，相交节点前有 3 个节点。


示例 2：

![](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/14/160_example_2.png)

输入：intersectVal = 2, listA = [0,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1
输出：Reference of the node with value = 2
输入解释：相交节点的值为 2 （注意，如果两个列表相交则不能为 0）。从各自的表头开始算起，链表 A 为 [0,9,1,2,4]，链表 B 为 [3,2,4]。在 A 中，相交节点前有 3 个节点；在 B 中，相交节点前有 1 个节点。


注意：

如果两个链表没有交点，返回 null.
在返回结果后，两个链表仍须保持原有的结构。
可假定整个链表结构中没有循环。
程序尽量满足 O(n) 时间复杂度，且仅用 O(1) 内存。
本题与主站 160 题相同：https://leetcode-cn.com/problems/intersection-of-two-linked-lists/

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/liang-ge-lian-biao-de-di-yi-ge-gong-gong-jie-dian-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



最开始想到的是利用set来存储是否已访问过，如果已被访问过，那么这个点就是第一个公共节点，但是最好想的还是 计算a，b链表长度差值d，让长的那个先走d次，然后二者再一起走，这样当二者在过程中有一个点相等时，就是第一个公共节点，如果不把二者进度统一对其，就永远找不到相等的点。

```java
public class Solution {
    public ListNode getIntersectionNode(ListNode a, ListNode b) {
        int c1 = 0, c2 = 0;
        ListNode ta = a, tb = b;
        while (ta != null){
             ta = ta.next;
             c1++;
        }
        while (tb != null ){
            tb = tb.next;
            c2++;
        } 
        int d = c1 - c2;
        while (d > 0){
            a = a.next;
            d--;
        } 
        if (d < 0) {
            d = -d;
            while (d > 0){
                b = b.next;
                d--;
            } 
        }
        while (a != b) {
            a = a.next;
            b = b.next;
        }
        return b;
    }
}
```

