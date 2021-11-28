## 剑指 Offer 06. 从尾到头打印链表

输入一个链表的头节点，从尾到头反过来返回每个节点的值（用数组返回）。

 

示例 1：

输入：head = [1,3,2]
输出：[2,3,1]


限制：

0 <= 链表长度 <= 10000

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/cong-wei-dao-tou-da-yin-lian-biao-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```java
class Solution {
   public int[] reversePrint(ListNode head){
        int count = 0;
        ListNode temp = head;
        while (temp!=null){
            temp= temp.next;
            count++;
        }
        int[] arr = new int[count];
        temp = head;
        count--;
        while (temp!=null){
            //从后往前往arr中插入值
            arr[count] = temp.val;
            temp = temp.next;
            count--;
        }
        return arr;
    }
}
```

