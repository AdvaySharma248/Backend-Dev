// http module ko import karo jo web server banane me help karta hai
const http = require("http");

// server create karo jo requests handle karega
const server = http.createServer((req, res) => {
    // response send karo client ko
    res.end("Server is running");
});

// server ko port 3000 par listen karo
server.listen(3000, () => {
    // jab server start ho jaye to ye message print hoga
    console.log("Server started on port 3000");
});
