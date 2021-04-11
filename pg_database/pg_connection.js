const pool = require("../config/db");

module.exports.saveDb = async function (querys) {
  const client = await pool.connect();
  await client.query("BEGIN");
  try {
    for(let num =0;num<querys.length;num++){
        console.log('query : '+num);
        await client.query(querys[num]);
    }
    await client.query("COMMIT");
  } catch (e) {
    await client.query("ROLLBACK");
    client.release(true);
    console.log("Database error : " + e);
    return false;
  } finally {
    client.release(true);
    return true;
  }
};

module.exports.getDb = async function (querys) {
  const client = await pool.connect();
  let result = null;
  try {
    const res = await client.query(querys);
    if (res.rowCount === 0) {
      return (result = {
        error: "Not Data",
        result: null,
      });
    }
    console.log("Database result : " + res);
    result = {
      error: null,
      result: res.rows,
    };
  } catch (e) {
    console.log("Database error : " + e);
    result = {
        error: e,
        result: null,
      };
  } finally {
    client.release(true);
    await client.end();
    return result;
  }
};
