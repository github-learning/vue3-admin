const nums = [2, 3, 5, 7, 8, 9]
const target = 11
// 定义一个名为 twoSum 的函数，接收两个参数：一个数组 arr 和一个目标值 target
function twoSum(arr, target) {
  // 使用 for 循环遍历数组
  for (let i = 0; i < arr.length; i++) {
    // 使用 for 循环遍历数组，从 i+1 开始
    for (let j = i + 1; j < arr.length; j++) {
      // 如果当前两个数的和等于目标值，则返回这两个数的索引
      if (arr[i] + arr[j] === target) {
        return [i, j]
      }
    }
  }
}

console.log(
  '%c [  ]-17',
  'font-size:13px; background:pink; color:#bf2c9f;',
  twoSum(nums, target)
)
