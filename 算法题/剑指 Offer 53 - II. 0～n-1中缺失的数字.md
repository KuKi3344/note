## 剑指 Offer 53 - II. 0～n-1中缺失的数字

一个长度为n-1的递增排序数组中的所有数字都是唯一的，并且每个数字都在范围0～n-1之内。在范围0～n-1内的n个数字中有且只有一个数字不在该数组中，请找出这个数字。

 

示例 1:

输入: [0,1,3]
输出: 2
示例 2:

输入: [0,1,2,3,4,5,6,7,9]
输出: 8

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/que-shi-de-shu-zi-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function(nums) {
     for(let i = 0;i < nums.length;i++){
          if(nums[i]!=i){
              return i;
          }
      }
      return nums.length;
};
```

普通想法，for循环一直找到第一个索引与值不相等的数，他的索引就是缺失的数,如果一直到最后一个数都没找到，那就说明这个缺失的数字是最后一位之后应该有的那个数字，即与nums.length相等

有序数组联想到二分法：

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function(nums) {
    let left = 0;
    let right = nums.length-1;
    while(left<=right){
        let mid = Math.floor((left+right)/2);
        if(nums[mid] === mid){
            left =  mid + 1;
        }
        if(nums[mid] != mid){
            right = mid - 1;
        }
    }
    return left;
    
};
```

