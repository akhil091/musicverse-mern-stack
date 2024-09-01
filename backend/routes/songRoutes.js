const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/songs', async (req, res) => {
    try {
        const [songs] = await pool.query('SELECT * FROM songs');
        res.json(songs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching songs' });
    }
});

module.exports = router;
