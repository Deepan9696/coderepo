db.codekata.aggregate([
    {
      $match: { user_id: "USER_ID_HERE" }
    },
    {
      $group: {
        _id: "$user_id",
        problem_count: { $sum: "$problem_count" }
      }
    }
  ])
  