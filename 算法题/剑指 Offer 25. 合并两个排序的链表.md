## 剑指 Offer 25. 合并两个排序的链表

输入两个递增排序的链表，合并这两个链表并使新链表中的节点仍然是递增排序的。

示例1：

输入：1->2->4, 1->3->4
输出：1->1->2->3->4->4
限制：

0 <= 链表长度 <= 1000

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/he-bing-liang-ge-pai-xu-de-lian-biao-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```java
class Solution {
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
         ListNode a = new ListNode(0);
         ListNode b = a;
        while(l1!=null&&l2!=null){
            if(l1.val<l2.val){
                a.next=l1;
                l1 = l1.next;
            }else{
                a.next=l2;
                l2 = l2.next;
            }
            a = a.next;

        }
        if(l1!=null){
            a.next = l1;
        }else{
            a.next = l2;
        }
        //可以写成a.next = l1!=null ? l1 : l2;

        return b.next;
    }
}
```

```java
class Solution {
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
         ListNode a = new ListNode(0);
         ListNode b = a;
        while(l1!=null&&l2!=null){
            if(l1.val<l2.val){
                a.next=l1;
                l1 = l1.next;
            }else{
                a.next=l2;
                l2 = l2.next;
            }
            a = a.next;

        }
        while(l1!=null){
            a.next = l1;
            l1 = l1.next;
            a = a.next;
        }
        while(l2!=null){
            a.next = l2;
            l2 = l2.next;
            a = a.next;
        }

        return b.next;
    }
}
```

