const fs = require('fs');
const path = require('path');

const errorLogger = (err, req, res, next) => {
    const errorLog = `${new Date().toISOString()} - ${err.message}\n`;
    fs.appendFileSync(path.join(__dirname, '../logs/errors.log'), errorLog);
    next(err);
};

module.exports = errorLogger;
