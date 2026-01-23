const http = require("http");

// const server = http.createServer((req, res) => {
//     res.writeHead(200, { "Content-Type": "plain/text" })
//     res.end("Hello World");
// })
// const server = http.createServer((req, res) => {
//     if (req.url === '/home') {
//         res.writeHead(200, {
//             "content-type": 'text/html'
//         })
//         res.end("<h1>Home Page</h1>")
//     } else if (req.url === '/about') {
//         res.writeHead(200, {
//             "content-type": 'text/html'
//         })
//         res.end("<h1>About Page</h1>")
//     }
//     res.writeHead(404, {
//         "content-type": 'text/html'
//     })
//     res.end("<h1 style='color:red; text-align:center'>Server is Running</h1>")
// })

let user = {
    username: "Advay",
    email: "advaysharma248 @gmail.com",
    password: "123456"
}
const server = http.createServer((req, res) => {
    res.writeHead(200, {
        "content-type": "application/json"
    })
    res.end(JSON.stringify(user));
})

server.listen(8080, () => {
    console.log("Server running at http://localhost:8080/");
});