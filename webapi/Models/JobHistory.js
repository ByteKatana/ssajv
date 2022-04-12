const { dbPool1Connect } = require("../database/dbConnection")

var getAll = async () => {
  await dbPool1Connect
  try {
    const request = dbPool1.request()
    const result = await request.query(
      "select MSDB.DBO.AGENT_DATETIME(history.run_date,history.run_time) as run_timestamp, * from dbo.sysjobhistory as history order by run_date desc for json path"
    )
    if (result.rowsAffected == 0) return {}
    return result
  } catch (error) {
    console.log(error)
  }
}

//select CONVERT(date, convert(varchar(10), run_date)) as rundate, * from dbo.sysjobhistory where job_id = '${id}' order by run_date desc for json path
var getByJobId = async (id) => {
  await dbPool1Connect
  try {
    const request = dbPool1.request()
    const result = await request.query(
      `select MSDB.DBO.AGENT_DATETIME(history.run_date,history.run_time) as run_timestamp, CONVERT(date, convert(varchar(10), run_date)) as rundate, * from dbo.sysjobhistory as history where job_id = '${id}' order by run_date desc for json path`
    )
    if (result.rowsAffected == 0) return {}
    return result
  } catch (error) {
    console.log(error)
  }
}

//TODO: can be added get byID, byName etc.

module.exports = {
  getAll,
  getByJobId
}
