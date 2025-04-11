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
  // 创建排名映射表
  const rankMap = {}

  // 处理每个班级
  for (const [className, students] of Object.entries(scores)) {
    console.log(
      '%c [  ]-24',
      'font-size:13px; background:pink; color:#bf2c9f;',
      className
    )

    console.log(
      '%c [  ]-29',
      'font-size:13px; background:pink; color:#bf2c9f;',
      students
    )
    // 将学生转为数组并保持原始顺序
    const studentList = Object.entries(students).map(([name, score]) => ({
      name,
      score
    }))

    console.log(
      '%c [  ]-40',
      'font-size:13px; background:pink; color:#bf2c9f;',
      studentList
    )

    // 创建排序副本用于计算排名
    const sortedStudents = [...studentList].sort((a, b) => b.score - a.score)

    console.log(
      '%c [  ]-49',
      'font-size:13px; background:pink; color:#bf2c9f;',
      sortedStudents
    )

    // 计算排名
    let rank = 1
    for (let i = 0; i < sortedStudents.length; i++) {
      if (i > 0 && sortedStudents[i].score < sortedStudents[i - 1].score) {
        rank = i + 1
      }
      // 存储排名结果
      const studentName = sortedStudents[i].name
      rankMap[`${className}_${studentName}`] = rank

      console.log(
        '%c [  ]-65',
        'font-size:13px; background:pink; color:#bf2c9f;',
        rankMap
      )
    }

    // 按原始顺序输出
    studentList.forEach((student) => {
      console.log(
        `${className} ${student.name} 第${rankMap[`${className}_${student.name}`]}名`
      )
    })
  }
}

// 执行计算
calculateRankings(classScores)
