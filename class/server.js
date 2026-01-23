// const http = require("http");
// const fs = require('fs');

// const myServer = http.createServer((req, res) => {
//     // console.log(req);
//     console.log(`${Date.now()} New Request Rec. \n`);
//     fs.appendFile("log.txt", log, (err) => {
//         if (err) {
//             console.log("Error Writing log")
//         }
//     });
//     res.end("Hello from server");
// });

// myServer.listen(8000, () => {
//     console.log("server Started");
// });
const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res) => {


    let str = "";
    switch (req.url) {
        case '/':
            str = "Home Page"
            res.end("Home Page");
            break;
        case '/about':
            str = "About Page"
            res.end("About Page");
            break;
        case '/contact':
            str = "Contact Page"
            res.end("Contact Page");
            break;
        default:
            str = "404 Not Found"
            res.end("404 Not Found");
            break;
    }
    // res.end("Hello from server");
    const log = `${Date.now()} : New Request Received\n`;

    console.log(log);

    fs.appendFile("log.txt", log);
});

myServer.listen(8000, () => {
    console.log("Server Started");
});
