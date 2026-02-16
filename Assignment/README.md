# Express.js Practice Exercises

This project contains 6 complete Express.js practice exercises to reinforce your learning.

## Exercises Included

### 1. User Filtering with Query Parameters
- **Route:** `/users`
- **Features:** Filter users by name using query parameters
- **Try:** `/users?name=john` or `/users?name=smith`

### 2. Response Time Middleware
- **Location:** Custom middleware in `app.js`
- **Features:** Logs response time for each request to console
- **How to see:** Check the terminal output when making requests

### 3. Contact Form with EJS
- **Route:** `/contact`
- **Features:** POST form submission with EJS templating
- **Features:** Form validation and success messages

### 4. Custom 404 Error Page
- **Route:** Any non-existent route
- **Features:** Custom EJS error template
- **Try:** Visit `/nonexistent` to see the 404 page

### 5. Photo Gallery
- **Route:** `/gallery`
- **Features:** Dynamic image display using EJS templates
- **Features:** Uses placeholder images from picsum.photos

### 6. Simple Blog
- **Routes:** 
  - `/blog` - List all posts
  - `/blog/new` - Create new post
  - `/blog/:id` - View individual post
- **Features:** Full CRUD operations for blog posts

## Project Structure

```
assignment/
├── app.js                 # Main Express application
├── package.json          # Project dependencies and scripts
├── views/                # EJS templates
│   ├── layout.ejs       # Main layout template
│   ├── index.ejs        # Home page
│   ├── users.ejs        # Users list with filtering
│   ├── contact.ejs      # Contact form
│   ├── gallery.ejs      # Photo gallery
│   ├── 404.ejs          # Custom 404 error page
│   ├── error.ejs        # Error page template
│   └── blog/            # Blog templates
│       ├── list.ejs     # Blog posts list
│       ├── view.ejs     # Individual post view
│       └── create.ejs   # Create new post form
├── public/              # Static files
│   ├── css/
│   │   └── style.css    # Main stylesheet
│   └── images/          # Image files (placeholder)
└── routes/              # Route handlers (if needed)
```

## How to Run

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **For development (with auto-restart):**
   ```bash
   npm install -g nodemon
   npm run dev
   ```

4. **Visit the application:**
   Open your browser and go to `http://localhost:3000`

## Available Routes

- `GET /` - Home page with all exercises
- `GET /users` - Users list with filtering capability
- `GET /users?name=searchterm` - Filter users by name
- `GET /contact` - Contact form
- `POST /contact` - Submit contact form
- `GET /gallery` - Photo gallery
- `GET /blog` - List all blog posts
- `GET /blog/new` - Create new blog post
- `POST /blog` - Submit new blog post
- `GET /blog/:id` - View individual blog post
- `GET /nonexistent` - Test custom 404 page

## Key Learning Points

### Middleware
- Custom response time logging middleware
- Built-in middleware for static files and body parsing

### Routing
- GET and POST routes
- Dynamic routing with parameters (`/blog/:id`)
- Query parameter handling

### Templating
- EJS template engine
- Layout inheritance
- Conditional rendering
- Loop rendering

### Error Handling
- Custom 404 error pages
- Error middleware for 500 errors

### Forms
- HTML form creation
- POST data handling
- Form validation
- Success/error messaging

## Technologies Used

- **Express.js** - Web framework
- **EJS** - Template engine
- **CSS** - Styling
- **Node.js** - Runtime environment

## Practice Tips

1. **Experiment with the user filtering** - Try different search terms
2. **Check the console logs** - See the response time middleware in action
3. **Test the contact form** - Submit different data and see the validation
4. **Create blog posts** - Add multiple posts and navigate between them
5. **Test error handling** - Try visiting non-existent routes
6. **Inspect the gallery** - Notice how images are dynamically loaded

## Author

Express Practice Exercises - Created for learning purposes

## License

ISC