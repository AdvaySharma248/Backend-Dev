// express module import kiya
const express = require('express');
// router banaya (express ka router)
const router = express.Router();

// students ka data memory me store kiya hai
let students = [
    { id: 1, name: 'John Doe', marks: 85, grade: 'A' },
    { id: 2, name: 'Jane Smith', marks: 45, grade: 'C' },
    { id: 3, name: 'Sam Wilson', marks: 30, grade: 'F' }
];

// grade calculate karne ka function
const calculateGrade = (marks) => {
    // 90 se zyada marks = A+
    if (marks >= 90) return 'A+';
    // 80 se zyada marks = A
    if (marks >= 80) return 'A';
    // 70 se zyada marks = B
    if (marks >= 70) return 'B';
    // 60 se zyada marks = C
    if (marks >= 60) return 'C';
    // 50 se zyada marks = D
    if (marks >= 50) return 'D';
    // 50 se kam marks = F
    return 'F';
};

// students list dikhane ke liye (/students)
router.get(['/', '/students'], (req, res) => {
    // students.ejs file render karo aur students data bhejo
    res.render('students', { students });
});

// ek student ka detail dikhane ke liye (/students/:id)
router.get('/students/:id', (req, res) => {
    // url se id lekar student find karo
    const student = students.find(s => s.id === parseInt(req.params.id));
    // agar student nahi mila to simple message
    if (!student) return res.send('Student not found');
    // studentDetail.ejs file render karo aur student data bhejo
    res.render('studentDetail', { student });
});

// student add karne ka form dikhane ke liye
router.get('/add-student', (req, res) => {
    // addStudent.ejs file render karo
    res.render('addStudent');
});

// form submit karne ka code
router.post('/add-student', (req, res) => {
    // form se name aur marks lenge
    const { name, marks } = req.body;
    // naya student object banaya
    const newStudent = {
        id: students.length + 1, // id diya
        name, // name
        marks: parseInt(marks), // marks number me convert kiye
        grade: calculateGrade(parseInt(marks)) // grade calculate kiya
    };
    // new student array me add kiya
    students.push(newStudent);
    // students page pe redirect kar do
    res.redirect('/portal/students');
});

// router export karo taki dusre files me use kar sake
module.exports = router;
