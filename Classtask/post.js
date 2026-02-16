const express = require("express");
const app = express();
app.use(express.json());

// yahan pr students ka array hai
let students = [];

// ye id ke liye hai
let nextId = 1;

// POST request se new student add karna
app.post("/students", (req, res) => {
    const { name, marks, city } = req.body;
    
    // check karo ki saare fields hai ya nahi
    if (!name || marks === undefined || !city) {
        return res.status(400).json({ message: "Name, marks, and city are required" });
    }
    
    // new student banao
    const newStudent = {
        id: nextId++, // id khud se badh jaayegi
        name,
        marks,
        city,
        status: "Active" // default status active hai
    };
    
    // student ko array mein daaldo
    students.push(newStudent);
    
    // response de do
    res.status(201).json({ message: "Student created successfully", student: newStudent });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server Started at http://localhost:${port}`);
});
