const db = require('../config/database');

class UserPreferences {
    static async getPreferences(userId) {
        const [rows] = await db.query('SELECT * FROM user_preferences WHERE user_id = ?', [userId]);
        return rows[0];
    }

    static async updatePreferences(userId, preferences) {
        const { favoriteGenres, recentlyPlayed } = preferences;
        await db.query('UPDATE user_preferences SET favorite_genres = ?, recently_played = ? WHERE user_id = ?',
            [favoriteGenres, JSON.stringify(recentlyPlayed), userId]);
    }
}

module.exports = UserPreferences;
