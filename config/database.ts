var mysql = require('mysql');

export default mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'sampleDB'
})





