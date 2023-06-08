db.mentors.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "mentor_id",
        as: "mentees"
      }
    },
    {
      $match: { $expr: { $gt: [{ $size: "$mentees" }, 15] } }
    }
  ])
  