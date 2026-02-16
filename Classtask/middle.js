const express = require("express");
const app = express();

// // First middleware with next()
// app.use((req, res, next)=>{
//     console.log("Middleware 1 - WITH next()");
//     next(); // This allows execution to continue to the next middleware
// });

// // Second middleware without next() - this will break the chain
// app.use((req, res, next)=>{
//     console.log("Middleware 2 - WITHOUT next()");
//     // Missing next() - this stops the execution chain!
//     res.send("Response from Middleware 2 (without next)");
// });

// // Third middleware - this will NOT execute because previous middleware didn't call next()
// app.use((req, res, next)=>{
//     console.log("Middleware 3 - WILL NOT RUN");
//     next();
// });

// // Route handler - this will NOT execute either
// app.get("/test", (req, res)=>{
//     res.send("route executed");
// })

// // Another route to demonstrate the difference
// app.get("/test-with-next", (req, res)=>{
//     res.send("This route works fine");
// })

// app.use(express.json());
// app.use(express.urlencoded({extended: true}));


// app.use((req,res,next)=>{
//     console.log("Request URL:", req.url);
//     console.log("Request method:", req.method);
//     next();
// });

// app.get("/home", (req, res)=>{
//     res.send("Home page");
// });


// const checkLogin = (req, res, next)=>{
//     const isLoggedIn = true;
//     if(!isLoggedIn){
//         return res.status(401).json({message:"Please Login First"});
//     }
//     next();
// };

// app.get("/dashboard", checkLogin, (req, res)=>{
//     res.send("Dashboard page");
// });

// Authentication Middleware - accepts token from both headers and query params
const authMiddleware = (req, res, next)=>{
    // Check token in headers first
    let token = req.headers.authorization;
    
    // If not in headers, check query parameters
    if(!token) {
        token = req.query.authorization;
    }
    
    // If still no token, return error
    if(!token) return res.status(403).json({message: "Token required"});
    
    // Validate token (accept both "advay" and "Bearer advay" formats)
    if(token != "advay" && token != "Bearer advay") return res.status(401).json({message: "Invalid Token"});
    
    next();
};

app.get("/profile", authMiddleware, (req, res)=>{
    res.send("Profile page");
});

app.get("/error",(req,res)=>{
    throw new Error("Something went wrong");
});
app.use((err,req,res,next)=>{
    console.log("Error Middleware:",err.message);
    res.status(404).json({message:"Internal server error"});
});


// const express = require("express");
const cors = require("cors");

// const app = express();
app.use(cors());

app.get("/data", (req, res)=>{
    res.json({message: "CORS Working"});
});
const allowedOrigins=[
    "http://localhost:5173",
    "http://localhost:3001",
]

app.use(
    cors({
        origin: allowedOrigins,
    })
)
app.listen(3000, ()=>{
    console.log("Server is started on http://localhost:3000");
});