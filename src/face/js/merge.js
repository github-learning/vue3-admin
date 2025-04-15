const gradeList = [{ grade1: '-年级' }, { grade2: '二年级' }]
const studentList = [
  { grade1: ['小明', '小张', '小赵'] },
  { grade2: ['张三', '李四', '王五'] }
]

const merge = (studentList, gradeList) => {
  const gradMap = {}
  let students = []
  gradeList.forEach((item) => {
    const [key, value] = Object.entries(item)[0]
    gradMap[key] = value
  })

  studentList.forEach((gradObj) => {
    const [key, studentNames] = Object.entries(gradObj)[0]
    studentNames.forEach((student) => {
      students.push({
        name: student,
        grad: gradMap[key]
      })
    })
  })
  return students
}
console.log('merge', merge(studentList, gradeList))
// const student = []
// for (let grad of studentList) {
//   for (let s in grad) {
//     for (let a of grad[s]) {
//       student.push({
//         name: a,
//         grad: gradeList.filter((item) => item[s])[0][s]
//       })
//     }
//   }
// }
// return student
let result = {
  beijign: 100,
  nmg: 200
}
const objToArray = (obj) => {
  return Object.entries(obj).map(([name, value]) => ({ name, value }))
}
console.log('objToArray', objToArray(result))
// result = [
//   {
//     name: 'xx',
//     value: ''
//   }
// ]
const arrOne = [1, 2, 3]
const arrTwo = [2, 3, 4]
// 交集
const intersection = (arr1, arr2) => {
  return arr1.filter((item) => arr2.some((item2) => item2 === item))
}

console.log(
  '%c [  ]-61',
  'font-size:13px; background:pink; color:#bf2c9f;',
  intersection(arrOne, arrTwo)
)

// 并集
const union = (arr1, arr2) => {
  return [...new Set([...arr1, ...arr2])]
}
console.log(
  '%c [  ]-62',
  'font-size:13px; background:pink; color:#bf2c9f;',
  union(arrOne, arrTwo)
)

// 差集

const different = (arr1, arr2) => {
  const diff1 = arr1.filter((item) => arr2.every((item2) => item2 !== item))
  const diff2 = arr2.filter((item) => arr1.every((item2) => item2 !== item))
  return [...diff1, ...diff2]
}
console.log(
  '%c [  ]-63',
  'font-size:13px; background:pink; color:#bf2c9f;',
  different(arrOne, arrTwo)
)

const intersect = function (nums1, nums2) {
  if (nums1.length < nums2.length) {
    ;[nums1, nums2] = [nums2, nums1] // 确保 nums1 长度更大，减少遍历次数
  }
  return nums1.filter((num) => {
    if (nums2.includes(num)) {
      const index = nums2.indexOf(num)
      nums2.splice(index, 1) // 移除已匹配元素，避免重复匹配
      return true
    }
    return false
  })
}

const nums1_1 = [1, 2, 1, 2]
const nums2_1 = [2, 2, 2]
const result1 = intersect(nums1_1, nums2_1)
console.log('测试用例 1 预期结果: [2, 2, 2]，实际结果:', result1)

// 测试用例 2
const nums1_2 = [4, 9, 5]
const nums2_2 = [9, 4, 9, 8, 4]
const result2 = intersect(nums1_2, nums2_2)
console.log('测试用例 2 预期结果: [4, 9]，实际结果:', result2)

// 测试用例 3
const nums1_3 = [3, 1, 2]
const nums2_3 = [2, 2]
const result3 = intersect(nums1_3, nums2_3)
console.log('测试用例 3 预期结果: [2]，实际结果:', result3)
