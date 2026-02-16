const express = require("express");
const app = express();
app.use(express.json());

let students = [
    {id: 1, name: "Sachin", marks: 60, city: "Hyderabad"},
    {id: 2, name: "Aman", marks: 70, city: "Mumbai"},
    {id: 3, name: "Akanksha", marks: 80, city: "Chennai"},
    {id: 4, name: "Advay", marks: 90, city: "Delhi"}
];

app.get("/students", (req, res)=>{
    res.json(students);
});

app.patch("/students/:id",(req, res)=>{
    const id = parseInt(req.params.id);
    const update = req.body;
    const student = students.find((s)=>s.id == id);
    if(!student){
        return res.status(404).json({message:"Student Not Found"});
    }
    //Apply Partial Updates
    Object.assign(student, update);
    res.json({message:"Student Updated Successfully", student});
});