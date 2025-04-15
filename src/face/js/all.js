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
  const map = {}
  for (let classItem in classScores) {
    const currentStudent = classScores[classItem]
    console.log('currentStudent', currentStudent)
    const studentList = Object.entries(currentStudent).map(([name, score]) => ({
      name,
      score
    }))
    console.log('studentList', studentList)
    const tempList = [...studentList].sort((a, b) => b.score - a.score)
    console.log('tempList', tempList)
    let rank = 1
    for (let i = 0; i < tempList.length; i++) {
      if (i > 0 && tempList[i].score < tempList[i - 1].score) {
        rank = i + 1
      }
      map[`${tempList[i].name}`] = rank
      // console.log(`${tempList[i].name}${rank}`)
    }
    // for (let student in currentStudent) {
    //   console.log('student', student)
    //   console.log('student', currentStudent[student])

    // }
    studentList.forEach((item) => {
      console.log(`${classItem}${item.name}${map[`${item.name}`]}`)
    })
  }
  // const allStudents = []
  // for (let classItem in classScores) {
  //   const currentStudent = classScores[classItem]
  //   for (let student in currentStudent) {
  //     allStudents.push({
  //       name: student,
  //       score: currentStudent[student],
  //       className: classItem
  //     })
  //   }
  // }
  // allStudents.sort((a, b) => b.score - a.score)
  // console.log(
  //   '%c [  ]-31',
  //   'font-size:13px; background:pink; color:#bf2c9f;',
  //   allStudents
  // )
  // let rank = 1
  // for (let i = 0; i < allStudents.length; i++) {
  //   if (i > 0 && allStudents[i].score < allStudents[i - 1].score) {
  //     rank = i + 1
  //   }
  //   const studentName = allStudents[i].name
  //   console.log(`${allStudents[i].className}${studentName}${rank}`)
  // }
}
console.log('calculateRankings', calculateRankings(classScores))
