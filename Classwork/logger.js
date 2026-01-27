// file system module jo files me data likhne ke liye use hota hai
const fs = require('fs');
// path module jo file paths handle karne me help karta hai
const path = require('path');

// ye function data ko log file me likhta hai
function logData(data, filename) {
    // current time stamp lelo
    const timestamp = new Date().toISOString();
    // log entry format banana hai
    const logEntry = `[${timestamp}] ${data}\n`;
    // file ka poora path banao
    const filePath = path.join(__dirname, filename);
    
    // file me data append karo
    fs.appendFile(filePath, logEntry, (err) => {
        // agar error aaye to error message print karo
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });
}

// function ko export karo taaki dusri files me use kiya ja sake
module.exports = {
    logData
};