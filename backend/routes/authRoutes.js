const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userId = await User.create(username, password);
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Error registering user' });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findByUsername(username);
        if (user && await User.comparePassword(password, user.password)) {
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error logging in' });
    }
});

module.exports = router;
