// const express = require('express');
// const cors = require('cors');
// const app = express();
 const dbconfig = require('./db'); // Database connection file
 const userroute = require('./routes/userroute');


// app.use(cors());  // Enable CORS for all routes
// app.use(express.json());  // Middleware to parse JSON requests

// // Route configurations

// app.use('/api/users', userroute);  // User routes, includes registration and login

// const port = process.env.PORT || 5000;
// app.listen(port, () => console.log(`Node Server started on port ${port}`));
// server.js or app.js
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user'); // Adjust the path to your User model

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/your-db-name', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Route to get all users
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
