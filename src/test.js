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

  for (const [className, students] of Object.entries(classScores)) {
    console.log(
      '%c [  ]-25',
      'font-size:13px; background:pink; color:#bf2c9f;',
      students
    )
    const studentList = Object.entries(students).map(([name, score]) => ({
      name,
      score
    }))
    const tempList = [...studentList].sort((a, b) => b.score - a.score)
    // console.log(tempList)
    let rank = 1
    for (let i = 0; i < tempList.length; i++) {
      if (i > 0 && tempList[i].score < tempList[i - 1].score) {
        rank = i + 1
      }
      const studentName = tempList[i].name
      map[studentName] = rank
    }
    studentList.forEach((item) => {
      console.log(`${className}${item.name}${map[`${item.name}`]}`)
    })
  }
}

// 执行计算
calculateRankings(classScores)
