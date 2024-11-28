function formatNumberWithIntl(number) {
  return new Intl.NumberFormat('en-US').format(number)
}

// 示例
console.log(formatNumberWithIntl(123456789)) // 输出: "123,456,789"
console.log(formatNumberWithIntl(1000)) // 输出: "1,000"
console.log(formatNumberWithIntl(-9876543)) // 输出: "-9,876,543"

function formatNumberManually(number) {
  let numStr = number.toString()
  let result = ''
  let count = 0

  for (let i = numStr.length - 1; i >= 0; i--) {
    result = numStr[i] + result
    count++
    if (count === 3 && i !== 0 && numStr[i - 1] !== '-') {
      result = ',' + result
      count = 0
    }
  }

  return result
}

// 示例
console.log(formatNumberManually(123456789)) // 输出: "123,456,789"
console.log(formatNumberManually(1000)) // 输出: "1,000"
console.log(formatNumberManually(-9876543)) // 输出: "-9,876,543"
