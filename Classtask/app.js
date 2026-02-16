// express install kiya hai package.json me
const express = require('express');
// path module chahiye file paths ke liye
const path = require('path');
// apna banaya hua logger middleware
const logger = require('./middleware/logger');
// alag alag routes import kiye
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');

// express ka app banana padta hai
const app = express();
// port number 3000 (achha port hai)
const PORT = 3000;

// middleware jo data ko sahi format me lekar aata hai
app.use(express.json()); // json data ke liye
app.use(express.urlencoded({ extended: true })); // form data ke liye
// apna logger middleware use kar rahe hain
app.use(logger);

// EJS template engine set kiya
app.set('view engine', 'ejs');
// views folder ka location bataya
app.set('views', path.join(__dirname, 'views'));

// sab routes mount kar rahe hain
// Task 1: User Management API
app.use('/users', userRoutes);

// Task 2: Authentication
app.use('/', authRoutes);

// Task 3: Student Result Portal
app.use('/portal', studentRoutes);

// base route (home page)
app.get('/', (req, res) => {
    // simple welcome message
    res.send('<h1>Welcome to ClassTask API</h1><p>Check /portal/students for Task 3</p>');
});

// error handling (404)
app.use((req, res, next) => {
    // 404 error bhejo
    res.status(404).send('Not Found');
});

// server start
app.listen(PORT, () => {
    // console me server start ka message
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Task 1 (Users): http://localhost:3000/users');
    console.log('Task 2 (Auth/Login): POST http://localhost:3000/login');
    console.log('Task 3 (Portal): http://localhost:3000/portal/students');
});
