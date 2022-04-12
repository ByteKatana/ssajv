const {dbPool1Connect} = require('../database/dbConnection');

  var getAll = async () => {
    await dbPool1Connect
    try {
        const request = dbPool1.request()
        const result = await request.query('select * from dbo.sysjobactivity order by start_execution_date desc for json path')
        if(result.rowsAffected == 0) return {}
        return result
    } catch (error) {
        console.log(`ERROR!!!: ${error}`)
    }
}

var getByJobId = async (id) => {
    await dbPool1Connect
    try {
        const request = dbPool1.request()
        const result = await request.query(`select * from dbo.sysjobactivity where job_id = '${id}' order by start_execution_date desc for json path`)
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

