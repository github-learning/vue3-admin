// 1.分数相同的时候名次相同
// 2.当出现相同分数的情况下,名次并不连续.既排名在两个并列第一之后的学生名次是第三,排名在三个并列第一之后的学生名次是第四
// 输出示例(不需要考虑输出顺序):
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

function calculateRankings(classScores) {
  // 读取出班级 / student
  // 对student 再读取出name / score
  // 对score 进行排序 （要保留原始数据位置）
  // 对排名进行处理，如果current排名 < current -1 则rank  + 1
  // 输出 班级 - student - 排名
  const map = {}

  // 处理每个班级
  for (const [className, students] of Object.entries(scores)) {
    // 将学生转为数组并保持原始顺序
    const studentList = Object.entries(students).map(([name, score]) => ({
      name,
      score
    }))

    // 创建排序副本用于计算排名
    const sortedStudents = [...studentList].sort((a, b) => b.score - a.score)

    // 计算排名
    // 初始化排名为1
    let rank = 1
    // 遍历排序后的学生列表
    for (let i = 0; i < sortedStudents.length; i++) {
      // 如果当前学生的分数小于前一个学生的分数，则排名加1
      if (i > 0 && sortedStudents[i].score < sortedStudents[i - 1].score) {
        rank = i + 1
      }
      // 存储排名结果
      const studentName = sortedStudents[i].name
      rankMap[`${className}_${studentName}`] = rank

      console.log(
        '%c [  ]-48',
        'font-size:13px; background:pink; color:#bf2c9f;',
        rankMap
      )
    }

    // 按原始顺序输出
    studentList.forEach((student) => {
      console.log(
        `${className} ${student.name} 第${rankMap[`${className}_${student.name}`]}`
      )
    })
  }
}

// 执行计算
calculateRankings(classScores)
