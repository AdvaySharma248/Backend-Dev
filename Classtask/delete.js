const express = require("express");
const app = express();
app.use(express.json());

let students = [
  { id: 1, name: "Advay Sharma", marks: 75, city: "Delhi" },
  { id: 2, name: "Sachin Saini", marks: 65, city: "Mumbai" },
  { id: 3, name: "Nikhil Verma", marks: 45, city: "Chennai" },
  { id: 4, name: "Aman Gupta", marks: 95, city: "Kolkata" },
  { id: 5, name: "Praveen", marks: 54, city: "Agra" },
  { id: 6, name: "Rahul", marks: 78, city: "Mumbai" },
  { id: 7, name: "Aditya", marks: 25, city: "Chennai" }
];

app.get("/students", (req, res) => {
  res.json(students);
});


//remove student by id
app.delete("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const idx = students.findIndex((s) => s.id === id);
  if (idx === -1) {
    return res.status(404).json({ message: "Pata nhi kaha h ab milta hi nhi h" });
  }
  
  // check karo ki student ke marks 70 se kam hai ya nahi
  if (students[idx].marks >= 70) {
    return res.status(400).json({ message: "70 se zyada wale se bakchodi nhi" });
  }
  
  const deleteStudent = students.splice(idx, 1);
  res.json({ message: "Zinda pakadna h saale ko", student: deleteStudent });
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
