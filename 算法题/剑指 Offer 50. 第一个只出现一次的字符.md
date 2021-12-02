## 剑指 Offer 50. 第一个只出现一次的字符

在字符串 s 中找出第一个只出现一次的字符。如果没有，返回一个单空格。 s 只包含小写字母。

示例 1:

输入：s = "abaccdeff"
输出：'b'
示例 2:

输入：s = "" 
输出：' '


限制：

0 <= s 的长度 <= 50000

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/di-yi-ge-zhi-chu-xian-yi-ci-de-zi-fu-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

 ```java
class Solution {
    public char firstUniqChar(String s) {
        HashMap<Character, Boolean> map = new HashMap<>();

        char[] cs = s.toCharArray();
        int length = cs.length;

        // 将key添加到hashmap中，value用boolean值表示是否只出现一次
        for (int i = 0; i < length; i++) {
            // 如果存在key的话，存入false，否则存入true
            map.put(cs[i], !map.containsKey(cs[i]));
        }

        // 遍历每一个字符，查找map表，查看是否只出现一次
        for (int i = 0; i < length; i++) {
            if (map.get(cs[i])) {
                return cs[i];
            }
        }

        return ' ';
    }
}
 ```

**扩展：**若是让你找出出现次数为n的数

```java
class Solution {
    public char firstUniqChar(String s) {
        HashMap<Character,Integer> result = new HashMap<>();
        
        
        for (char c:s.toCharArray()) {

            if (result.isEmpty() || !result.containsKey(c)) {
                result.put(c, 1);
            } else {
                result.put(c, result.get(c) + 1);
            }
        }

        for (char c:s.toCharArray()) {
            if (result.get(c) == 1) {
                return c;
            }
        }


        return ' ';
    }
}
```

