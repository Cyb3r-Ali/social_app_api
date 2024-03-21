// models/userModel.js

// Import the database connection
const pool = require('../config/db');


// Function to fetch user by feilds from the database
exports.getUserByField = async (fieldName, fieldValue) => {
    try {
        // Construct the SQL query dynamically based on the field provided
        const query = `SELECT * FROM users WHERE ${fieldName} = ?`;

        const [rows] = await pool.query(query, [fieldValue]);
        return rows[0]; // Assuming there's only one matching user
    } catch (error) {
        throw error;
    }
};

// Function to fetch all users from the database
exports.getAllUsers = async () => {
    try {
        const [rows] = await pool.query('SELECT * FROM users');
        return rows || []; // Return an empty array if no users found
    } catch (error) {
        console.error('Error fetching all users:', error);
        const statusCode = error.statusCode || 500; // Default to 500 if statusCode is not provided
        const errorMessage = error.message || 'Internal server error'; // Default to 'Internal server error' if message is not provided
        throw { statusCode, errorMessage };
    }
};


// Function to create a new user in the database
exports.createUser = async ({ full_name, email, password, role, is_admin, profile_picture, username, bio }) => {
    try {

        const sql = `INSERT INTO users (full_name, email, password, role, is_admin, profile_picture, registration_date, username, bio)
        VALUES (?,?,?,?,?,?,?,?,?)`;

        const [result] = await pool.query(sql, [full_name, email, password, role, is_admin, profile_picture, new Date(), username, bio]);
        const user = this.getUserByField("id", result.insertId)
        return user;
    } catch (error) {
        console.log(error);
        const err_obj = {
            status: 500,
            message: error.message
        }
        return err_obj
    }
};