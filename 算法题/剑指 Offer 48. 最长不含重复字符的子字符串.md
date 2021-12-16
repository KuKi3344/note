## 剑指 Offer 48. 最长不含重复字符的子字符串

请从字符串中找出一个最长的不包含重复字符的子字符串，计算该最长子字符串的长度。

 

示例 1:

输入: "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
示例 2:

输入: "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
示例 3:

输入: "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。


提示：

s.length <= 40000

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/zui-chang-bu-han-zhong-fu-zi-fu-de-zi-zi-fu-chuan-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```java
class Solution {
    public int lengthOfLongestSubstring(String s) {
        Set<Character> set = new HashSet<>(); //存放窗口状态
        int n = s.length();
        int start = 0, end = 0; //窗口左闭右开
        int ans = 0;
        while (end < n) {
            char c = s.charAt(end); //当前元素
            if (!set.contains(c)) { //当前元素可添加，则窗口扩张，同时更新最大长度
                set.add(c);
                end++;
                ans = Math.max(ans, end - start);
            } else {
                while (set.contains(c)) { //窗口一直收缩到可添加当前元素
                    set.remove(s.charAt(start++));
                }
            }
        }
        return ans;
    }
}
```



