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
  const rankMap = {}

  for (const [className, students] of Object.entries(classScores)) {
    const studentList = Object.entries(students).map(([name, score]) => ({
      name,
      score
    }))
    const sortedStudents = [...studentList].sort((a, b) => b.score - a.score)

    let rank = 1
    for (let i = 0; i < sortedStudents.length; i++) {
      if (i > 0 && sortedStudents[i].score !== sortedStudents[i - 1].score) {
        rank = i + 1
      }
      const studentName = sortedStudents[i].name
      rankMap[`${className}_${studentName}`] = rank
    }
    studentList.forEach((students) => {
      console.log(
        `${className} ${students.name}第${rankMap[`${className}_${students.name}`]}`
      )
    })
  }
}

calculateRankings(classScores)
