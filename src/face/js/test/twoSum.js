const nums = [2, 3, 5, 7, 9]
const target = 7

const twoSum = (nums, target) => {
  const map = new Map()
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i]
    if (map.has(diff)) {
      return [map.get(diff), i]
    }
    map.set(nums[i], i)
  }
  return []
  // const map = new Map()
  // for (let i = 0; i < nums.length; i++) {
  //   const diff = target - nums[i]
  //   if (map.has(diff)) {
  //     return [map.get(diff), i]
  //   }
  //   map.set(nums[i], i)
  // }
  // return []
}
console.log('11', twoSum(nums, target))

/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
const twoSum2 = (nums, target) => {
  let left = 0
  let right = nums.length - 1

  while (left < right) {
    const sum = nums[left] + nums[right]
    if (sum === target) {
      return [left, right]
    } else if (sum < target) {
      left++
    } else {
      right--
    }
  }
  return []
}
console.log('twoSum2', twoSum2(nums, target))
