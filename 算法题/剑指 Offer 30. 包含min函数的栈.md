## 剑指 Offer 30. 包含min函数的栈

定义栈的数据结构，请在该类型中实现一个能够得到栈的最小元素的 min 函数在该栈中，调用 min、push 及 pop 的时间复杂度都是 O(1)。

 

示例:

MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.min();   --> 返回 -3.
minStack.pop();
minStack.top();      --> 返回 0.
minStack.min();   --> 返回 -2.


提示：

各函数的调用总次数不超过 20000 次

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/bao-han-minhan-shu-de-zhan-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

重点在于实现min函数，那么可以使用一个辅助栈，专门用来装最小值。每次往栈中push一个数，要判断辅助栈中当前栈顶元素是否小于这个数，如果大于等于这个数，辅助栈也要push这个数，来保证栈顶元素永远是最小值。

当pop出值时，如果pop出的是当前最小值的话，辅助栈也要pop出这个值，所以需要判断栈Apop出的值是否和辅助栈的栈顶元素也就是最小值相等。如果pop出的不是当前最小值，A栈pop，辅助栈不变

```java
class MinStack {
    Stack<Integer> A, B;
    public MinStack() {
        A = new Stack<>();
        B = new Stack<>();
    }
    public void push(int x) {
        A.push(x);
        if(B.isEmpty() || B.peek() >= x)
            B.push(x);
    }
    public void pop() {
        if(A.pop().equals(B.peek()))
            B.pop();
    }
    public int top() {
        return A.peek();
    }
    public int min() {
        return B.peek();
    }
}
```

