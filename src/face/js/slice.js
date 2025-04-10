const fn = (arr, n) => {
  const result = []
  for (let i = 0; i < arr.length; i += n) {
    result.push(arr.slice(i, i + n))
  }
  return result
}
console.log('fn', fn([1, 2, 3, 4, 5], 2))
