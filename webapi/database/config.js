const dotenv = require('dotenv');
dotenv.config();
const env = process.env;

//Database Connection
const config = { 
    user: env.DB_USER,
    password: env.DB_PW,
    server: env.DB_HOST,
    database: env.DB_NAME,
    options:{
        enableArithAbort: false
    },
    requestTimeout: 50000
}

module.exports = {config}