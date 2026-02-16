const express = require("express");
const app = express();
app.use(express.json());

let students = [
    {id: 1, name: "Sachin", marks: 60, city: "Hyderabad", status: "active"},
    {id: 2, name: "Aman", marks: 70, city: "Mumbai", status: "inactive"},
    {id: 3, name: "Akanksha", marks: 80, city: "Chennai", status: "active"},
    {id: 4, name: "Advay", marks: 90, city: "Delhi", status: "active"}
];

app.get("/students", (req, res)=>{
    res.json(students);
});

app.get("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);
    
    if (!student) {
        return res.status(404).json({ message: "Student Not Found" });
    }
    
    res.json(student);
});

app.patch("/students/:id",(req, res)=>{
    const id = parseInt(req.params.id);
    const update = req.body;
    const student = students.find((s)=>s.id == id);
    if(!student){
        return res.status(404).json({message:"Student Not Found"});
    }
    
    // Check if trying to update status directly
    if(update.status !== undefined && !['active', 'inactive'].includes(update.status)) {
        return res.status(400).json({ message: "Status must be either 'active' or 'inactive'" });
    }
    
    // updateing the 
    if(update.changekardo === true) {
        student.status = student.status === 'active' ? 'inactive' : 'active';
        delete update.changekardo; // Remove changekardo from update to avoid adding it to student object
    }
    
    Object.assign(student, update);
    res.json({message:"Student Updated Successfully", student});
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server Started at http://localhost:${port}`);
});