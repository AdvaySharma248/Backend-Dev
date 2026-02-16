// sabse pehle express install kiya hai package.json me
const express = require('express');
// path module bhi chahiye file paths ke liye
const path = require('path');

// express ka app banana padta hai har project me
const app = express();
// port number jahan server chalega (3000 acha port hai)
const PORT = 3000;

// ye sab middleware hai jo data ko sahi format me lekar aata hai
app.use(express.urlencoded({ extended: true })); // form data ke liye
app.use(express.json()); // json data ke liye
app.use(express.static('public')); // images/css/js files ke liye

// EJS template engine use kar rahe hain HTML pages ke liye
app.set('view engine', 'ejs');
// views folder ka location batana padta hai
app.set('views', path.join(__dirname, 'views'));

// ek simple middleware banaya hai jo time log karega
const responseTimeLogger = (req, res, next) => {
    const start = Date.now(); // request ka start time note kiya
    console.log(`${req.method} ${req.url} - Request aaya ${new Date().toISOString()}`);
    
    const oldEnd = res.end; // purana res.end save kar liya
    res.end = function(chunk, encoding) {
        const responseTime = Date.now() - start; // calculate kiya kitna time laga
        console.log(`${req.method} ${req.url} - Response bheja gaya ${responseTime}ms me`);
        oldEnd.call(this, chunk, encoding); // original res.end call kiya
    };
    
    next(); // agle middleware pe bhej do
};

// apna time logger middleware use kar rahe hain
app.use(responseTimeLogger);

// users ka data array me store kiya hai
const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com' }
];

// blog posts ka data bhi ek array me hai
let blogPosts = [
    { 
        id: 1, 
        title: 'My First Blog Post', 
        content: 'This is the content of my first blog post. Welcome to my blog!',
        author: 'John Doe',
        date: new Date().toISOString().split('T')[0]
    },
    { 
        id: 2, 
        title: 'Learning Express.js', 
        content: 'Express.js is a great framework for building web applications. It makes routing and middleware handling very easy.',
        author: 'Jane Smith',
        date: new Date().toISOString().split('T')[0]
    }
];

// jab koi / pe jayega to ye chalega (home page)
app.get('/', (req, res) => {
    // index.ejs file ko render karo aur title bhejo
    res.render('index', { title: 'Express Practice Exercises' });
});

// user filter karne ka route (/users)
app.get('/users', (req, res) => {
    // url se name parameter lenge (?name=john)
    const { name } = req.query;
    // pehle sab users le lenge
    let filteredUsers = users;
    
    // agar name diya hai to filter karenge
    if (name) {
        // name ke hisab se users filter karo
        filteredUsers = users.filter(user => 
            user.name.toLowerCase().includes(name.toLowerCase())
        );
    }
    
    // users.ejs file render karo aur data bhejo
    res.render('users', { 
        title: 'Users List',
        users: filteredUsers,
        searchTerm: name || ''
    });
});

// contact form ke routes
app.get('/contact', (req, res) => {
    // contact.ejs file render karo (empty message)
    res.render('contact', { title: 'Contact Us', message: '' });
});

app.post('/contact', (req, res) => {
    // form se name, email, message lenge
    const { name, email, message } = req.body;
    // console me data dekhne ke liye print kiya
    console.log('Contact form submitted:', { name, email, message });
    // thank you message dikhao
    res.render('contact', { 
        title: 'Contact Us', 
        message: 'Thank you for your message! We will get back to you soon.' 
    });
});

// photo gallery ka route
app.get('/gallery', (req, res) => {
    // images ka array banaya hai (gallery me dikhane ke liye)
    const images = [
        { name: 'nature1.jpg', alt: 'Beautiful landscape' },
        { name: 'nature2.jpg', alt: 'Mountain view' },
        { name: 'nature3.jpg', alt: 'Ocean sunset' }
    ];
    // gallery.ejs file render karo aur images bhejo
    res.render('gallery', { title: 'Photo Gallery', images });
});

// blog routes
app.get('/blog', (req, res) => {
    // blog/list.ejs file render karo aur posts bhejo
    res.render('blog/list', { title: 'Blog Posts', posts: blogPosts });
});

// ek blog post dekhne ke liye
app.get('/blog/:id', (req, res) => {
    // url se post id lenge
    const postId = req.params.id;
    // post id ke hisab se find karo
    const post = blogPosts.find(p => p.id == postId);
    
    // agar post nahi mila to 404 page dikhao
    if (!post) {
        return res.status(404).render('404', { title: 'Post Not Found' });
    }

    // blog/view.ejs file render karo aur post bhejo
    res.render('blog/view', { title: post.title, post });
});

// naya blog post banane ka form
app.get('/blog/new', (req, res) => {
    // blog/create.ejs file render karo (empty error)
    res.render('blog/create', { title: 'Create New Post', error: '' });
});

// blog post banane ka code
app.post('/blog', (req, res) => {
    // form se title, content, author lenge
    const { title, content, author } = req.body;
    
    // form validation (check karo sab fields bharo)
    if (!title || !content || !author) {
        return res.render('blog/create', { 
            title: 'Create New Post', 
            error: 'All fields are required!' 
        });
    }
    
    // naya post object banaya
    const newPost = {
        id: blogPosts.length + 1, // id diya
        title, // title
        content, // content
        author, // author
        date: new Date().toISOString().split('T')[0] // aaj ki date
    };
    // new post array me add kiya
    blogPosts.push(newPost);
    // blog page pe redirect kar do
    res.redirect('/blog');
});

// 404 error handler (agar page nahi mile to)
app.use((req, res, next) => {
    // 404 status code aur 404.ejs page dikhao
    res.status(404).render('404', { title: 'Page Not Found' });
});

// General error handler (agar koi aur error aaye to)
app.use((err, req, res, next) => {
    // error console me print karo
    console.error(err.stack);
    // 500 error aur error.ejs page dikhao
    res.status(500).render('error', { title: 'Something went wrong!', error: err.message });
});

// server start kar rahe hain
app.listen(PORT, () => {
    // console me server start ka message
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Available routes:');
    console.log('- http://localhost:3000/ (Home)');
    console.log('- http://localhost:3000/users (Users with filtering)');
    console.log('- http://localhost:3000/contact (Contact form)');
    console.log('- http://localhost:3000/gallery (Photo gallery)');
    console.log('- http://localhost:3000/blog (Blog posts)');
    console.log('- http://localhost:3000/blog/new (Create new post)');
});