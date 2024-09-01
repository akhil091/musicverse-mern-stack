const express = require('express');
const router = express.Router();

router.get('/playlist/:id', (req, res) => {
    // Fetch playlist data based on id (example data)
    const playlist = {
        id: req.params.id,
        name: "Chill Vibes",
        songs: ["Song 1", "Song 2", "Song 3"]
    };
    res.json(playlist);
});

module.exports = router;
