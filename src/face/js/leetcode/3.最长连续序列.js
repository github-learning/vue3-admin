/**
 * 先确定是否是最小值，left 无，说明是最小，并且看后面有无值，无值，说明以100为首，最长序列的长度为1
 * 先确定是否是最小值，left 无，说明是最小，并且看后面有无值，有值，说明后面要继续以 100 为首，向后看，只要有，就长度 +1，当前值 +1
 * 然后比较streack， 并返回
 * 99 无 100 无 101     1
 * 3 有 4 无 5   1
 * 199 无 200 无 201  1
 * 0 无 1 有 2， len:2. 继续 有 3，len:3. 继续 有 4 ，len： 4， 继续 无 5，最长为4
 * 2 有 3 ，说明不是最小
 * 1 有 2 说明不是最小
 *
 *
 * @param {number[]} nums
 * @return {number}
 */

var longestConsecutive = function (nums) {
  const num_set = new Set(nums)
  let longStreak = 0

  for (let num of num_set) {
    if (!num_set.has(num - 1)) {
      let currentNum = num
      let currentStreak = 1

      while (num_set.has(currentNum + 1)) {
        currentNum += 1
        currentStreak += 1
      }
      longStreak = Math.max(longStreak, currentStreak)
    }
  }
  return longStreak
}
const nums = [100, 4, 200, 1, 3, 2, 1]

console.log(
  '%c [  ]-10',
  'font-size:13px; background:pink; color:#bf2c9f;',
  longestConsecutive(nums)
)
