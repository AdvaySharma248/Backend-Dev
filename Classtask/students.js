const express = require("express");
const app = express();
app.use(express.json());

const credentials = [
    { email: "advaysharma248@gmail.com", password: "234567" },
    { email: "asfadfasfa@gmail.com", password: "123456" }
];

// Get all users
app.get("/auth/users", (req, res) => {
    res.json({ message: "user fetched successfully", credentials });
});

// Reset password route (needs old password)
app.put("/auth/reset", (req, res) => {
    const { email, password, newPassword } = req.body;

    const user = credentials.find(
        (cred) => cred.email === email && cred.password === password
    );

    if (!user) {
        return res.status(400).json({ message: "Invalid Password or Email" });
    }

    user.password = newPassword;
    res.json({ message: "Password update successful", user });
});

// Forgot password route (email only)
app.put("/auth/forgot", (req, res) => {
    const { email, newPassword } = req.body;

    const user = credentials.find((cred) => cred.email === email);
    if (!user) {
        return res.status(400).json({ message: "Email not found" });
    }

    user.password = newPassword;
    res.json({ message: "Password reset successful", user });
});



const port = 3000;
app.listen(port, () => {
    console.log(`Server Started at http://localhost:${port}`);
});
