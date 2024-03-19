// Set up Express 
const express = require("express");
const app = express(); // Initialize app
const env = require('dotenv'); // Require environment varialbes
const db = require('./config/db'); // Require your database pool configuration

// Import routes 
const userRoutes = require("./routes/userRoutes")

// Load environment variables
env.config();

// Set Up PORT
const PORT = process.env.PORT || 8080;
const BASE_URL = process.env.BASE_URL

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


// Routes 
app.use("/api", userRoutes)

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${BASE_URL}:${PORT}`);
});
