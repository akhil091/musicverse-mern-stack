require('dotenv').config();
const express = require('express');
const db = require('./config/database');

const welcomeMiddleware = require('./middleware/welcomeMiddleware');
const rateLimiter = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');
const errorHandler = require('./middleware/uploadMiddleware');

const authRoutes = require('./routes/authRoutes');
const contentRoutes = require('./routes/contentRoutes');
const contentRoutes = require('./routes/songRoutes');

const cors = require('cors');
const app = express();
const path = require('path');

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(welcomeMiddleware);
app.use(uploadMiddleware);
app.use(rateLimiter);

app.use(cors({
    origin: 'http://your-frontend-domain.com',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));

app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/content', songRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
