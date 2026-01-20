const fs = require('fs');
const path = require('path');

function logData(data, filename) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${data}\n`;
    const filePath = path.join(__dirname, filename);
    
    fs.appendFile(filePath, logEntry, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });
}

module.exports = {
    logData
};