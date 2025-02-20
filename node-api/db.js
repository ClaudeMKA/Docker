const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'db',
    user: 'user',
    password: 'password',
    database: 'db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = db; 