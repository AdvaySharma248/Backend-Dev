const http = require('http');
// url module jo urls parse karne me help karta hai
const url = require('url');

// server create karo jo http requests handle karega
const server = http.createServer((req, res) => {
    // url ko parse karo query parameters ke saath
    const parsedUrl = url.parse(req.url, true);
    // pathname nikalo url se
    const pathname = parsedUrl.pathname;
    // query parameters nikalo
    const query = parsedUrl.query;

    // sirf GET requests allow karo
    if (req.method === 'GET') {
        // pathname ke according alag alag responses
        switch(pathname) {
            case '/':
                // home page ke liye plain text response
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Welcome to our server!');
                break;
            
            case '/about':
                // about page ke liye html content
                const htmlContent = `
                    <h1>About Us</h1>
                    <p>This is a simple Node.js HTTP server.</p>
                `;
                // content type html set karo
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(htmlContent);
                break;
            
            case '/user':
                // query se name aur age nikalo, agar nahi hai to 'Unknown'
                const name = query.name || 'Unknown';
                const age = query.age || 'Unknown';
                
                // user response object banao
                const userResponse = {
                    name: name,
                    age: age
                };
                
                // json response ke liye content type set karo
                res.writeHead(200, { 'Content-Type': 'application/json' });
                // object ko json me convert karke bhejo
                res.end(JSON.stringify(userResponse));
                break;
            
            default:
                // agar route nahi mila to 404 error
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 Page Not Found');
        }
    } else {
        // agar GET ke alawa koi aur method aaye to error
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method Not Allowed');
    }
});

// port number define karo
const PORT = 3000;
// server ko port par listen karo
server.listen(PORT, () => {
    // server start hone par message print karo
    console.log(`Server is listening on port ${PORT}`);
});