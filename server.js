const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (like the HTML and CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Simulate a simple "database" (in-memory)
let users = [];

// Handle login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    // Find user in the "database"
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Redirect to sim.html if login is successful
        res.redirect('/sim.html');
    } else {
        // If login fails, send back an error
        res.send('<p>Login failed. Please check your credentials.</p><a href="/">Go back</a>');
    }
});

// Handle registration
app.post('/register', (req, res) => {
    const { email, password } = req.body;

    // Check if the user already exists
    const userExists = users.find(u => u.email === email);

    if (userExists) {
        // If the user already exists, show an error
        res.send('<p>Registration failed. User already exists.</p><a href="/">Go back</a>');
    } else {
        // Register the user
        users.push({ email, password });
        // Redirect to sim.html after successful registration
        res.redirect('/sim.html');
    }
});

// Serve sim.html for a successful login/registration
app.get('/sim.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'sim.html'));
});

// Default route to serve the index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
