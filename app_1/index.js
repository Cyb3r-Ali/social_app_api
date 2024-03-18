const express = require("express");
const app = express();
const env = require('dotenv');
const db = require('./config/db'); // Require your database pool configuration

// Load environment variables
env.config();

// PORT
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
