const express = require("express");
const router = express.Router();
const { saveDb } = require("../../pg_database/pg_connection");
const axios = require("axios");
router.post("/addrecord", async (req, res) => {
  const covidRecordObj = await getCovidFromAnotherApi();
  const getQuery = await convertToQuery(covidRecordObj);
  const insertQueryCovid = await insertCovidRecord(getQuery);
  res.json(insertQueryCovid);
});

async function getCovidFromAnotherApi() {
  const result = await axios.get(
    "https://disease.sh/v3/covid-19/historical?lastdays=60"
  );
  const getCovidRec = result.data;
  const covidRecord = getCovidRec.map((item) => {
    const _timeline = Object.getOwnPropertyNames(item.timeline.cases);
    const _cases = Object.values(item.timeline.cases);
    let casesObj = [];
    for (let num = 0; num < _timeline.length; num++) {
      casesObj.push({
        timeline: _timeline[num],
        cases: _cases[num],
      });
    }
    return {
      country: item.country,
      cases: casesObj,
    };
  });
  return covidRecord;
}

async function convertToQuery(covidRecordObj) {
  let querys = [];
  covidRecordObj.forEach((item) => {
    item.cases.forEach((subItem) => {
      let sql = `insert into t_covid_record(country,cases,tvc_date)
            values($1,$2,$3);`;
      const query = {
        text: sql,
        values: [item.country, subItem.cases, subItem.timeline],
      };
      querys.push(query);
    });
  });
  return querys;
}

async function insertCovidRecord(querys) {
    const testQuery = {
        text:`insert into t_covid_record(country,cases,tvc_date)  values($1,$2,$3);`,
        values:[ 'Albania', 121200, '3/21/21']
    }
  return saveDb(querys).then((value) => {
    return value;
  });
}
module.exports = router;
