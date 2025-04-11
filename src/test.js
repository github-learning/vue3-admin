const classScores = {
  一班: {
    张小丙: 87,
    张小甲: 98,
    张小乙: 90
  },
  二班: {
    王七六: 76,
    王九七: 97,
    胡八一: 81,
    王六零: 60,
    刘八一: 81,
    李八一: 81
  }
}

function calculateRankings(scores) {
  const results = []

  // 处理每个班级
  for (const [className, students] of Object.entries(scores)) {
    // 将学生转为数组并排序
    const sortedStudents = Object.entries(students)
      .map(([name, score]) => ({ name, score }))
      .sort((a, b) => b.score - a.score)

    // 计算排名
    let rank = 1
    for (let i = 0; i < sortedStudents.length; i++) {
      // 如果不是第一个学生，且分数小于前一个学生，则更新rank
      if (i > 0 && sortedStudents[i].score < sortedStudents[i - 1].score) {
        rank = i + 1
      }
      // 保存结果
      results.push({
        className,
        name: sortedStudents[i].name,
        rank
      })
    }
  }

  // 输出结果（按题目示例顺序）
  // 一班
  console.log(
    `一班 张小丙 第${results.find((r) => r.name === '张小丙').rank}名`
  )
  console.log(
    `一班 张小甲 第${results.find((r) => r.name === '张小甲').rank}名`
  )
  console.log(
    `一班 张小乙 第${results.find((r) => r.name === '张小乙').rank}名`
  )
  // 二班
  console.log(
    `二班 李八一 第${results.find((r) => r.name === '李八一').rank}名`
  )
  console.log(
    `二班 刘八一 第${results.find((r) => r.name === '刘八一').rank}名`
  )
  console.log(
    `二班 胡八一 第${results.find((r) => r.name === '胡八一').rank}名`
  )
  console.log(
    `二班 王七六 第${results.find((r) => r.name === '王七六').rank}名`
  )
  console.log(
    `二班 王九七 第${results.find((r) => r.name === '王九七').rank}名`
  )
  console.log(
    `二班 王六零 第${results.find((r) => r.name === '王六零').rank}名`
  )
}

// 执行计算
calculateRankings(classScores)
