const url = require("url");
const http = require("http");

const myServer = http.createServer((req, res) => {
    const myUrl = url.parse(req.url, true);
    console.log(myUrl);

    switch(myUrl.pathname){
        case "/":
            res.end("This is home Page");
            break;
        case "about":
            const username = myUrl.query.myname;
            res.end(`This is about page of ${username}`);
            break;
        default:
            res.end("404 Error Page Not Found");
            break;
    }
})

myServer.listen(7000, () => {
    console.log("Server Started Successfully");
})