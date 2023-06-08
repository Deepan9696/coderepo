db.topics.aggregate([
    {
      $lookup: {
        from: "tasks",
        localField: "_id",
        foreignField: "topic_id",
        as: "tasks"
      }
    }
  ])
  