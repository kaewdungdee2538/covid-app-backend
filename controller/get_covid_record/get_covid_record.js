const express = require("express");
const router = express.Router();
const { getDb } = require("../../pg_database/pg_connection");

router.get("/get", (req, res) => {
    const date = req.query.date;
  let sql = `select * from t_covid_record 
  where tvc_date between $1 and $1
  order by cases desc limit 20;`;
  const query = {
      text:sql,
      values:[date]
  }
  getDb(query).then((value) => {
    // console.log(value);
    res.json(value);
  });
});

module.exports = router;
