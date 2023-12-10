const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const axios = require('axios');
const { User, Book } = require('./Backend/models/models'); // Adjust the path as necessary

// Database connection setup
const MONGODB_URI = 'mongodb://admin:Sp00ky!@localhost:27017/?authSource=admin';
mongoose.connect(MONGODB_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB!');
});

const app = express();

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/searchbooks', async (req, res) => {
    const query = req.query.query;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).send('Error fetching books');
    }
});


// Serve the index.html file on the root route '/'
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});



// User CRUD Routes
// Create a User - Handles AJAX form submission
app.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
});

// Get All Users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send(error);
    }
});

// ... [rest of your user and book CRUD routes]

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
