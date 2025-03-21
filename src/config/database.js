const mysql = require('mysql')
const { promisify } = require('util');


const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
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