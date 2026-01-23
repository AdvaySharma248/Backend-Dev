const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res) => {
    let str;
    switch (req.url) {
        case '/':
            str = "Home Page";
            break;
        case '/about':
            str = "About Page";
            break;
        case '/contact':
            str = "Contact Page";
            break;
        default:
            str = "404 not Found";
            break;
    }
    res.end(str);
    const log = `${Date.now()} : ${req.method} ${req.url} New Request Received\n ${str}\n`;

    fs.appendFile("log.txt", log, (err) => {
        if (err) {
            console.log("Error writing log");
        }
    });

});

myServer.listen(8000, () => {
    console.log("Server Started");
});
