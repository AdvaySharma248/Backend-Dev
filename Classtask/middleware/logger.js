// logger middleware // request log karne ke liye
const logger = (req, res, next) => {
    // request time, method aur url log kar rahe hain
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    // next middleware pe jaao
    next();
};

// logger export kar rahe hain
module.exports = logger;
