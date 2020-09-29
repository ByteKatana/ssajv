const mssql = require('mssql');
const {config} = require('./config');

dbPool1 = new mssql.ConnectionPool(config)
dbPool1Connect = dbPool1.connect().then((result) => {if(result._connected) console.log("DB Connection Successfull!")})

module.exports = {
    dbPool1Connect
}

