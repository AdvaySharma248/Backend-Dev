// authentication middleware // token check karne ke liye
const authMiddleware = (req, res, next) => {
    // authorization header le rahe hain
    const authHeader = req.headers['authorization'];

    // Check if token exists and matches our dummy token concept // token check kar rahe hain
    if (!authHeader || authHeader !== 'Bearer dummy-token') {
        // agar token nahi hai ya galat hai to unauthorized error
        return res.status(401).json({ error: 'Unauthorized: Invalid or missing token' });
    }

    // agar sahi hai to next middleware pe jaao
    next();
};

// middleware export kar rahe hain
module.exports = authMiddleware;
