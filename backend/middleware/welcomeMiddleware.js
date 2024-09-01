const welcomeMiddleware = (req, res, next) => {
    console.log(`Welcome to MusicVerse! A request was made to: ${req.url}`);
    next(); // Pass control to the next middleware function
};

module.exports = welcomeMiddleware;
