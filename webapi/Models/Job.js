const {dbPool1Connect} = require('../database/dbConnection');

var getAll = async () => {
    await dbPool1Connect
    try {
        const request = dbPool1.request()
        const result = await request.query('select * from dbo.sysjobs for json path')
        if(result.rowsAffected == 0) return {}
        return result
        
    } catch (error) {
        console.log(error)
    }
}

var getById = async (id) => {
    await dbPool1Connect
    try {
        const request = dbPool1.request()
        const result = await request.query(`select * from dbo.sysjobs where job_id = '${id}' for json path`)
        if(result.rowsAffected == 0) return {}
        return result
        
    } catch (error) {
        console.log(error)
    }
}

var getByName = async(jobName) => {
    await dbPool1Connect
    try {
        const request = dbPool1.request()
        const result = await request.query(`select * from dbo.sysjobs where name ='${jobName}' for json path`)
        if(result.rowsAffected === 0) return {}
        return result
    } catch (error) {
        console.log(error)
    }
}

var getByServerId = async (id) => {
    await dbPool1Connect
    try {
        const request = dbPool1.request()
        const result = await request.query(`select * from dbo.sysjobs where originating_server_id = '${id}' for json path`)
        if(result.rowsAffected == 0) return {}
        return result
        
    } catch (error) {
        console.log(error)
    }
}

//TODO: can be added get byID, byName etc.

module.exports = {
    getAll,
    getById,
    getByName,
    getByServerId
}

