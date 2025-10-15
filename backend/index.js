const express = require('express');
require('dotenv').config();
const connectToDatabase = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const app = express();

// This will add the necessary headers to all incoming requests
app.use(cors());

// Built-in middleware for parsing JSON
app.use(express.json());

// Built-in middleware for parsing URL-encoded data
app.use(express.urlencoded({ extended: true }));

connectToDatabase();

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send("API is working");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Example app is listening on PORT ${PORT }`);
});

// // What does app.use(cors()) does??
// By default, this tells your Express server to add the header Access-Control-Allow-Origin: * to all of its responses. The * is a wildcard, meaning "allow requests from any origin." This is fine for development.