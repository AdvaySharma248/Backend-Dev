const http = require("http");
const fs = require("fs");

const newServer = http.createServer((req, res) => {
    let str = "";
    switch (req.url) {
        case '/': {
            str = "We are Currently at the home page of the website";
            break;
        }
        case "/about": {
            str = "Now u are reading the content on the about page";
            break;
        }
        case "/contact": {
            str = "U are at the contact page of the website and u can see my contact info!"
            break;
        }
        default: {
            str = "404 Error Page Not Found";
            break;
        }
    }
    res.end(str);
    const reqdata = `${Date.now()} : ${req.method} ${req.url}\n  Content of the page: ${str}\n`;
    fs.appendFile("log.txt", reqdata, (err) => {
        if (err) {
            console.log("Some Error Occured");
        }
    });
});

newServer.listen(7000, () => {
    console.log("Server Started Succesfully");
});