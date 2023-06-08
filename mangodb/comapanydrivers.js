db.company_drives.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "drive_id",
        as: "students"
      }
    }
  ])
  