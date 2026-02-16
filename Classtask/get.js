const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send("My name is Advay Sharma and my age is 21");
});

app.get('/about', (req, res) => {
    const name = req.query.name;jkx
    const age = req.query.age;

    res.send(`Name: ${name}, Age: ${age}`);
});

app.listen(3000, () => {
    console.log("Server Started at http://localhost:3000");
});


