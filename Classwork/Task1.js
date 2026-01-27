// http module jo web server banane me help karta hai
const http = require('http');
// file system module jo files me likhne ke liye use hota hai
const fs = require('fs');
// path module jo file paths handle karne me help karta hai
const path = require('path');

// server create karo jo http requests handle karega
const server = http.createServer((req, res) => {
    // request se url nikalo
    const { url } = req;
    // response message ke liye variable
    let responseMessage = '';
    
    // url ke according alag alag responses
    switch(url) {
        case '/':
            responseMessage = 'This is Home Page';
            break;
        case '/about':
            responseMessage = 'This is About Page';
            break;
        case '/contact':
            responseMessage = 'This is Contact Page';
            break;
        default:
            responseMessage = '404 Page Not Found';
    }
    
    // current time stamp lelo
    const timestamp = new Date().toISOString();
    // log entry format banana hai
    const logEntry = `${timestamp} | ${url} | ${responseMessage}\n`;
    
    // log entry ko file me append karo
    fs.appendFile(path.join(__dirname, 'log.txt'), logEntry, (err) => {
        // agar error aaye to console pe print karo
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });
    
    // response header set karo
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    // response bhejo client ko
    res.end(responseMessage);
});

// port number define karo
const PORT = 8000;
// server ko port par listen karo
server.listen(PORT, () => {
    // server start hone par message print karo
    console.log(`Server is listening on port ${PORT}`);
});