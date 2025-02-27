// function isValid(s) {
//   // 定义一个栈来存储括号
//   let stack = []

//   // 定义括号的对应关系
//   const parenthesesMap = {
//     '(': ')',
//     '{': '}',
//     '[': ']'
//   }

//   // 遍历字符串中的每个字符
//   for (let char of s) {
//     if (parenthesesMap[char]) {
//       // 如果是开放括号，将其推入栈中
//       stack.push(char)
//     } else {
//       // 如果是闭合括号，检查栈顶的括号是否匹配
//       let top = stack.pop()
//       if (parenthesesMap[top] !== char) {
//         return false // 括号不匹配，返回 false
//       }
//     }
//   }

//   // 最后，栈应该为空，表示所有括号都匹配
//   return stack.length === 0
// }
function isValid(s) {
  let stack = []
  const parenthesesMap = {
    '(': ')',
    '{': '}',
    '[': ']'
  }
  for (let char of s) {
    if (parenthesesMap[char]) {
      stack.push(char)
    } else {
      let top = stack.pop()
      if (parenthesesMap[top] !== char) {
        return false
      }
    }
  }
  return stack.length === 0
}

// 测试例子
console.log(isValid('()')) // true
console.log(isValid('()[]{}')) // true
console.log(isValid('(]')) // false
console.log(isValid('([)]')) // false
console.log(isValid('{[]}')) // true {[  [
