// http module jo web server banane me help karta hai
const http = require("http");

// todos array jo saare todo items store karega
let todos = [];
// id counter jo har naye todo ko unique id dega
let id = 1;

// server create karo jo API requests handle karega
const server = http.createServer((req, res) => {
    // response ka content type set karo json ke liye
    res.setHeader("Content-Type", "application/json");

    // GET request for /todos - saare todos return karo
    if (req.method === "GET" && req.url === "/todos") {
        res.end(JSON.stringify(todos));
    }

    // POST request for /todos - naya todo add karo
    else if (req.method === "POST" && req.url === "/todos") {
        // body data collect karne ke liye empty string
        let body = "";

        // request se data chunks me aata hai
        req.on("data", chunk => body += chunk);
        // jab saara data aajaye
        req.on("end", () => {
            // json data parse karo
            const data = JSON.parse(body);

            // agar title nahi hai to error de do
            if (!data.title) {
                res.statusCode = 400;
                return res.end(JSON.stringify({ error: "Title required" }));
            }

            // naya todo object banao
            const todo = {
                id: id++,                    // unique id assign karo
                title: data.title,           // user se mila title
                completed: false             // by default not completed
            };

            // todo array me push karo
            todos.push(todo);
            // status code 201 (created) set karo
            res.statusCode = 201;
            // naya todo return karo
            res.end(JSON.stringify(todo));
        });
    }

    // PUT request for /todos/:id - existing todo update karo
    else if (req.method === "PUT" && req.url.startsWith("/todos/")) {
        // url se todo id nikalo
        const todoId = parseInt(req.url.split("/")[2]);
        // body data collect karne ke liye
        let body = "";

        // data chunks collect karo
        req.on("data", chunk => body += chunk);
        // jab data complete ho jaye
        req.on("end", () => {
            // json parse karo
            const data = JSON.parse(body);
            // todo id se todo find karo array me
            const todo = todos.find(t => t.id === todoId);

            // agar todo nahi mila to 404 error
            if (!todo) {
                res.statusCode = 404;
                return res.end(JSON.stringify({ error: "Todo not found" }));
            }

            // agar title diya gaya hai to update karo
            if (data.title !== undefined) todo.title = data.title;
            // agar completed status diya gaya hai to update karo
            if (data.completed !== undefined) todo.completed = data.completed;

            // updated todo return karo
            res.end(JSON.stringify(todo));
        });
    }

    // DELETE request for /todos/:id - todo delete karo
    else if (req.method === "DELETE" && req.url.startsWith("/todos/")) {
        // url se id nikalo
        const todoId = parseInt(req.url.split("/")[2]);
        // todo ka index find karo
        const index = todos.findIndex(t => t.id === todoId);

        // agar index nahi mila to 404 error
        if (index === -1) {
            res.statusCode = 404;
            return res.end(JSON.stringify({ error: "Todo not found" }));
        }

        // array se todo remove karo
        const deleted = todos.splice(index, 1);
        // delete hua todo return karo
        res.end(JSON.stringify(deleted[0]));
    }

    // agar koi aur route ho to 404 error
    else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: "Route not found" }));
    }
});

// server ko port 3000 par start karo
server.listen(3000, () => {
    console.log("TODO API running on port 3000");
});
