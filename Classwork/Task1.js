const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const { url } = req;
    let responseMessage = '';
    
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
    
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp} | ${url} | ${responseMessage}\n`;
    
    fs.appendFile(path.join(__dirname, 'log.txt'), logEntry, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });
    
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(responseMessage);
});

const PORT = 8000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});