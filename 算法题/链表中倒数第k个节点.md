### 链表中倒数第k个节点

输入一个链表，输出该链表中倒数第k个节点。为了符合大多数人的习惯，本题从1开始计数，即链表的尾节点是倒数第1个节点。

例如，一个链表有 6 个节点，从头节点开始，它们的值依次是 1、2、3、4、5、6。这个链表的倒数第 3 个节点是值为 4 的节点。

 

示例：

给定一个链表: 1->2->3->4->5, 和 k = 2.

返回链表 4->5.

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

倒数第k个节点，即为正数第length-k个节点

```java
//java
class Solution {
    public ListNode getKthFromEnd(ListNode head, int k) {
        ListNode p = head;
        ListNode p2 = head;
        int n = 0;
         while(p!=null){
            n++;
            p = p.next;
        }
        n = n -k;
        for(int i=0;i<n;i++){
            p2 = p2.next;
        }
        return p2;

    }
}
```

或者定义头节点p1，p2，p1先比p2多指向下一个节点k次，当p1的下一个为空时，则得到的p2就是倒数第k个节点

```java
//java
class Solution {
    public ListNode getKthFromEnd(ListNode head, int k) {
        ListNode p1 = head;
        ListNode p2 = head;
        while(k>0){
            p2 = p2.next;
            k--;
        }
        while(p2!=null){
            p2 = p2.next;
            p1 = p1.next;
        }
        return p1;
}
```

