/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  // 1. 将所有非0元素移到最前面
  let lastIndex = 0
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[lastIndex] = nums[i]
      lastIndex++
    }
  }
  // 2. 将剩下的位置全部补0
  for (let i = lastIndex; i < nums.length; i++) {
    nums[i] = 0
  }
}

console.log(moveZeroes([0, 1, 0, 3, 12]))
