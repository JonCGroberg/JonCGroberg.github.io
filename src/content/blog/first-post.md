---
title: 'TwoSum Sorted'
description: 'How to solve the TwoSum Sorted problem'
pubDate: 'Jul 26 2024'
heroImage: '/blog-twosum-sorted.png'
---


### The key insight
-  Inputs are sorted, **therefore** if we start at the left and right ....
	*  Moving the left pointer up the list will ALWAYS increase the sum
		>  *(our small value gets larger, therefore the sum gets larger)*
	*  Moving the right pointer down the list will ALWAYS decrease the sum
		>  *( our large value gets smaller therefore the sum gets smaller)*

### Example
>   ( 02 is 2 and 03 is 3, just makes the spacing nice)
1.  ` 2 7 8 9 15 16 20  |  Target = 16`
2.  ` ^ _ _ _ __ __ ^_   |  02 + 20 > 16` -> make the sum smaller
3.  ` ^ _ _ _ __ ^_ __   |  02 + 16 > 16`  -> so make the sum smaller
4.  ` ^ _ _ _ ^_ __ __    |  02 + 15 > 16` -> so make the sum smaller still
5.  ` ^ _ _ ^ __ __ __    |  02 +  09 < 16` -> so make the sum larger
6.  ` _ ^ _ ^ __ __ __    |  07 +  09 = 16` -> found it

### Logic
  *  right pointer moves until sum <= target where sum = left+right
  *  if sum < target left+=1
  *  if sum > target right-=1
  *  if sum== target return [left+1right+1]


### Solution
```python
class Solution:
    def twoSum(self, numbers: List[int], target: int) -> List[int]:
        l, r = 0, len(numbers) - 1

        while l < r:
            target_hat = numbers[l] + numbers[r]

            if target_hat < target:
                l += 1
            elif target_hat > target:
                r -= 1
            else:
                return [l + 1, r + 1]  # 1 based index results
```
