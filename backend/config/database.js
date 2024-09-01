// config/db.js
const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'musicverse'
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the MySQL database:', err.stack);
        return;
    }
    console.log('Connected to the MySQL database.');
});

// Export the connection
module.exports = connection;
