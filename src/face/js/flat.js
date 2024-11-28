function flattenArray(arr) {
  let resultArr = []
  arr.forEach((element) => {
    if (Array.isArray(element)) {
      resultArr = resultArr.concat(flattenArray(element))
    } else {
      resultArr.push(element)
    }
  })
  return resultArr
}
const nestedArray = [1, [2, [3, 4], 5], 6, [7, 8]]
console.log(flattenArray(nestedArray)) // 输出: [1, 2, 3, 4, 5, 6, 7, 8]
console.log(nestedArray.flat(2))
console.log(nestedArray.flat(Infinity))
