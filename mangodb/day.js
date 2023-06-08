db.company_drives.find({
    start_date: {
      $gte: ISODate("2020-10-15"),
      $lte: ISODate("2020-10-31")
    }
  })
  