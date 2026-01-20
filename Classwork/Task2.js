const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    if (req.method === 'GET') {
        switch(pathname) {
            case '/':
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Welcome to our server!');
                break;
            
            case '/about':
                const htmlContent = `
                    <h1>About Us</h1>
                    <p>This is a simple Node.js HTTP server.</p>
                `;
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(htmlContent);
                break;
            
            case '/user':
                const name = query.name || 'Unknown';
                const age = query.age || 'Unknown';
                
                const userResponse = {
                    name: name,
                    age: age
                };
                
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(userResponse));
                break;
            
            default:
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 Page Not Found');
        }
    } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method Not Allowed');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});