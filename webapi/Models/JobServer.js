const {dbPool1Connect} = require('../database/dbConnection');

  var getAll = async () => {
    await dbPool1Connect
    try {
        const request = dbPool1.request()
        const result = await request.query('select MSDB.DBO.AGENT_DATETIME(servers.last_run_date,servers.last_run_time) as last_run_timestamp, * from dbo.sysjobservers as servers for json path')
        if(result.rowsAffected == 0) return {}
        return result
        
    } catch (error) {
        console.log(error)
    }
}

var getByJobId = async (id) => {
    await dbPool1Connect
    try {
        const request = dbPool1.request()
        const result = await request.query(`select MSDB.DBO.AGENT_DATETIME(servers.last_run_date,servers.last_run_time) as last_run_timestamp, * from dbo.sysjobservers as servers where job_id = '${id}' for json path`)
        if(result.rowsAffected == 0) return {}
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

