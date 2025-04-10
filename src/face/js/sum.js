// 给定 nums = [2, 3, 5, 9], target = 7

// 因为 nums[0] + nums[3] = 2 + 5 = 7
// 所以返回 [0, 2]

const twoSum = (nums, target) => {
  const map = new Map()
  for (let i = 0; i < nums.length; i++) {
    const item = nums[i]
    const diff = target - item
    if (map.has(diff)) {
      return [map.get(diff), i]
    } else {
      map.set(item, i)
    }
  }
  return []
}
console.log(twoSum([2, 3, 5, 9], 7))
