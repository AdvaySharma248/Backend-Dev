const express = require('express');
const router = express.Router();
const validateUser = require('../middleware/validation');

// In-memory data store
let users = [
    { id: 1, name: 'Alice', email: 'alice@example.com', role: 'Admin' },
    { id: 2, name: 'Bob', email: 'bob@example.com', role: 'User' }
];

// GET /users - Fetch all users
router.get('/', (req, res) => {
    res.json(users);
});

// GET /users/:id - Fetch user by ID
router.get('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
});

// POST /users - Add a new user
router.post('/', validateUser, (req, res) => {
    const { name, email, role } = req.body;
    const newUser = {
        id: users.length + 1,
        name,
        email,
        role
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// PUT /users/:id - Update user details
router.put('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ error: 'User not found' });

    const { name, email, role } = req.body;
    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;

    res.json(user);
});

// DELETE /users/:id - Remove a user
router.delete('/:id', (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'User not found' });

    users.splice(index, 1);
    res.status(200).json({ message: 'User deleted successfully' });
});

module.exports = router;
