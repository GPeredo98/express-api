const mysql = require('mysql')
const { promisify } = require('util');


const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "api_express"
});

db.getConnection((err, connection) => {
    if (err) {
        console.error(err.code);
        console.error(err.sqlMessage);
    }
    if (connection != undefined) {
        connection.release();
        console.log('Database connected');
    }
})

db.query = promisify(db.query);

module.exports = db;