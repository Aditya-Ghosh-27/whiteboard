const express = require('express');
require('dotenv').config();
const connectToDatabase = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const canvasRoutes = require('./routes/canvasRoutes');
const cors = require('cors');
const app = express();


// Middlewares
// This will add the necessary headers to all incoming requests
const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true,
};

app.use(cors(corsOptions));

// Built-in middleware for parsing JSON
app.use(express.json());

// Built-in middleware for parsing URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/canvas', canvasRoutes);

connectToDatabase();

// app.get('/', (req, res) => {
//     res.send("API is working");
// });  

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Example app is listening on PORT ${PORT }`);
});

// // What does app.use(cors()) does??
// By default, this tells your Express server to add the header Access-Control-Allow-Origin: * to all of its responses. The * is a wildcard, meaning "allow requests from any origin." This is fine for development.