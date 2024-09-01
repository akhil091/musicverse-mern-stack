const db = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
    static async create(username, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
        return result.insertId;
    }

    static async findByUsername(username) {
        const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        return rows[0];
    }

    static async comparePassword(password, hashedPassword) {
        return bcrypt.compare(password, hashedPassword);
    }
}

module.exports = User;
