const http = require("http");

let todos = [];
let id = 1;

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "application/json");

    if (req.method === "GET" && req.url === "/todos") {
        res.end(JSON.stringify(todos));
    }

    else if (req.method === "POST" && req.url === "/todos") {
        let body = "";

        req.on("data", chunk => body += chunk);
        req.on("end", () => {
            const data = JSON.parse(body);

            if (!data.title) {
                res.statusCode = 400;
                return res.end(JSON.stringify({ error: "Title required" }));
            }

            const todo = {
                id: id++,
                title: data.title,
                completed: false
            };

            todos.push(todo);
            res.statusCode = 201;
            res.end(JSON.stringify(todo));
        });
    }

    else if (req.method === "PUT" && req.url.startsWith("/todos/")) {
        const todoId = parseInt(req.url.split("/")[2]);
        let body = "";

        req.on("data", chunk => body += chunk);
        req.on("end", () => {
            const data = JSON.parse(body);
            const todo = todos.find(t => t.id === todoId);

            if (!todo) {
                res.statusCode = 404;
                return res.end(JSON.stringify({ error: "Todo not found" }));
            }

            if (data.title !== undefined) todo.title = data.title;
            if (data.completed !== undefined) todo.completed = data.completed;

            res.end(JSON.stringify(todo));
        });
    }

    else if (req.method === "DELETE" && req.url.startsWith("/todos/")) {
        const todoId = parseInt(req.url.split("/")[2]);
        const index = todos.findIndex(t => t.id === todoId);

        if (index === -1) {
            res.statusCode = 404;
            return res.end(JSON.stringify({ error: "Todo not found" }));
        }

        const deleted = todos.splice(index, 1);
        res.end(JSON.stringify(deleted[0]));
    }

    else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: "Route not found" }));
    }
});

server.listen(3000, () => {
    console.log("TODO API running on port 3000");
});
