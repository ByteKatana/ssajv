const {dbPool1Connect} = require('../database/dbConnection');

  var getAll = async () => {
    await dbPool1Connect
    try {
        const request = dbPool1.request()
        const result = await request.query(`select [next_run_timestamp] = 
                                                        CASE schedules.[next_run_date]
                                                            WHEN 0 THEN CONVERT(DATETIME, '1900/1/1')
                                                            ELSE MSDB.DBO.AGENT_DATETIME(schedules.next_run_date,schedules.next_run_time)
                                                        END, * from dbo.sysjobschedules as schedules ORDER BY next_run_date DESC for json path`)
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
        const result = await request.query(`select MSDB.DBO.AGENT_DATETIME(schedules.next_run_date,schedules.next_run_time) as next_run_timestamp, * from dbo.sysjobschedules as schedules where job_id = '${id}' for json path`)
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

