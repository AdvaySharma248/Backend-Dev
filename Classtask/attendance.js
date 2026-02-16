const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.send(`Attendance page`)
});

app.get('/attendance',(req,res)=>{
    const name = req.query.name;
    const status = req.query.status;

    if(status === "yes"){
        res.send(`${name} is Present`);
    }else{
        res.send(`${name} is Absent`);
    }
});

// const students = [
//     { name: "Alice", id: 1, status: "yes" },
//     { name: "Bob", id: 2, status: "no" },
//     { name: "Charlie", id: 3, status: "yes" },
//     { name: "David",id: 4, status: "no" }
// ];

// app.post("/students/add", (req, res) =>{
//     const data = req.body;
//     students.push({ name: data.name, id: data.id, status: data.status });
//     res.send(students);
// });




const credentials = [
    {email: "advaysharma248@gmail.com", password: "234567"},
    {email: "bhangbhosda@gmail.com", password: "123456"}
];

app.post("/auth/register", async(req,res)=>{
    const data = req.body;

    //check if user already exists
    const isEmailTaken = credentials.some((c)=>c.email === data.email);
    if(isEmailTaken) return res.status(400).send("Email already taken");
    credentials.push(data);
    res.send("Registered successfully");
});

app.post("/auth/login", async(req,res)=>{
    const {email, password} = req.body;
    const user = credentials.find((c)=>c.email === email && c.password === password);
    console.log(user);
    if(user){
        res.send("Login successfull");
    }else{
        res.send("Invalid email or password");
    }
});

const port = 3000;

app.listen(port, () => {
    console.log(`Server Started at http://localhost:${port}`);
});
