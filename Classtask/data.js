// express module import kiya
const express = require("express");

// express ka app banaya
const app = express();
// json data ke liye middleware
app.use(express.json());
// form data ke liye middleware
app.use(express.urlencoded({ extended: true }));

// home page route
app.get('/',(req,res)=>{
    res.send(`Attendance page`)
});

// attendance check karne ka route
app.get('/attendance',(req,res)=>{
    // url se name aur status lenge
    const name = req.query.name;
    const status = req.query.status;

    // agar status yes hai to present
    if(status === "yes"){
        res.send(`${name} is Present`);
    }else{
        // warna absent
        res.send(`${name} is Absent`);
    }
});

// commented code (use nahi kar rahe)
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

// users ka credentials array
const credentials = [
    {email: "advaysharma248@gmail.com", password: "234567"},
    {email: "\a@gmail.com", password: "123456"}
];

// register karne ka route
app.post("/auth/register", async (req, res) => {
    // form se data lenge
    const data = req.body;
    const password = data.password;

    // check karo email already hai ya nahi
    const isEmailTaken = credentials.some((c) => c.email === data.email);
    if (isEmailTaken) return res.status(400).send("Email already taken");

    // password validation (uppercase, lowercase, number chahiye)
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9@]+$/;
    if (!passwordRegex.test(password)) {
        return res
            .status(400)
            .send("Password must contain uppercase, lowercase, number and only allowed characters");
    }

    // @ sirf ek baar allowed hai
    let atCount = 0;
    for (let i = 0; i < password.length; i++) {
        if (password[i] === '@') atCount++;
        if (atCount > 1) {
            return res.status(400).send("@ allowed only once");
        }
    }

    // new user credentials me add kiya
    credentials.push(data);
    res.send("Registered successfully");
});


// login karne ka route
app.post("/auth/login", async(req,res)=>{
    // form se email aur password lenge
    const {email, password} = req.body;
    // credentials me se user find karo
    const user = credentials.find((c)=>c.email === email && c.password === password);
    console.log(user);
    // agar user mila to login success
    if(user){
        res.send("Login successfull");
    }else{
        // warna invalid message
        res.send("Invalid email or password");
    }
});

// port number
const port = 3000;

// server start
app.listen(port, () => {
    console.log(`Server Started at http://localhost:${port}`);
});
