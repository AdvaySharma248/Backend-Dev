const http = require("http");

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { "Content-Type": "text/plain" })
        res.end("Welcome to the website!")
    } else if (req.url === '/about') {
        res.writeHead(200, { "Content-Type": "text/html" })
        res.end("<h1>About Page</h1>")
    } else if (req.url === '/user') {
        res.writeHead(200, { "Content-Type": "application/json" })
        res.end(JSON.stringify({ name: "Advay", email: "advay@gmail.com", age: 20 }))
    } else {
        res.writeHead(404, { "Content-Type": "text/html" })
        res.end("<h1>404 Page Not Found</h1>")
    }
})

server.listen(8000, () => {
    console.log("Server is Running at http://localhost:8000/")
})
