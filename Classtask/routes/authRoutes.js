// express import kiya
const express = require('express');
// router banaya
const router = express.Router();
// auth middleware import kiya
const authMiddleware = require('../middleware/auth');

// Mock User Database for Login // mock user database
const registeredUsers = [
    { email: 'admin@example.com', password: 'password123' }
];

// POST /login // login route
router.post('/login', (req, res) => {
    // form se email aur password le rahe hain
    const { email, password } = req.body;

    // user find kar rahe hain // email aur password se
    const user = registeredUsers.find(u => u.email === email && u.password === password);

    // agar user mil gaya to login successful
    if (user) {
        // dummy token generate kiya
        const token = 'dummy-token';
        // success message aur token send kiya
        return res.json({
            message: 'Login successful',
            token: token
        });
    }

    // agar user nahi mila to unauthorized error
    res.status(401).json({ error: 'Invalid credentials' });
});

// GET /dashboard (Protected) // dashboard protected route
router.get('/dashboard', authMiddleware, (req, res) => {
    // welcome message send kiya
    res.json({ message: 'Welcome to the Dashboard! You are authorized.' });
});

// GET /profile (Protected) // profile protected route
router.get('/profile', authMiddleware, (req, res) => {
    // profile data send kiya
    res.json({ message: 'This is your profile data.' });
});

module.exports = router;
