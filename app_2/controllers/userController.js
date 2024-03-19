// controllers/userController.js comment

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Changed require statement
const userModel = require('../models/User');

const env = require("dotenv")
env.config();

// Controller function for user registration
exports.register = async (req, res) => {
    const { full_name, username, email, password, bio } = req.body;
    const role = 'user';
    const is_admin = 0;
    const profile_picture = "default.png";

    // Check if name, email, and password are provided
    if (!full_name || !email || !password || !username) {
        return res.status(400).json({
            status: 400,
            error: 'Please provide valid credentials.'
        });
    }
    try {
        // Check if the user already exists
        const existingEmail = await userModel.getUserByField("email", email);
        if (existingEmail) {
            return res.status(400).json({
                status: 400,
                error: 'User with this email already exists'
            });
        }

        const existingUsername = await userModel.getUserByField("username", username);
        if (existingUsername) {
            return res.status(400).json({
                status: 400,
                error: 'User with this username already exists'
            });
        }

        // Hash the password using bcryptjs
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with default values for other columns
        const newUser = await userModel.createUser({ full_name, username, email, password: hashedPassword, bio, role, is_admin, profile_picture });

        // Generate JWT token for the new user
        const payload = {
            id: newUser.id,
            username: newUser.username,
            full_name: newUser.full_namename,
            bio: newUser.bio,
            profile_picture: newUser.profile_picture,
            email: newUser.email,
            role: newUser.role,
            is_admin: newUser.is_admin
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '6h' });

        res.status(201).json({
            status: 200,
            message: 'User registered successfully',
            token,
            user: payload
        });

    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({
            status: 500,
            error: error.message
        });
    }
}

// Controller function for user login
exports.login = async (req, res) => {
    const { identifier, password } = req.body;

    try {
        // Check if the identifier is an email
        let userByEmail = await userModel.getUserByField("email", identifier);
        let userByUsername = await userModel.getUserByField("username", identifier);

        // If neither userByEmail nor userByUsername is found, return error
        if (!userByEmail && !userByUsername) {
            return res.status(401).json({
                status: 401,
                error: 'Invalid email or username!'
            });
        }

        // Compare passwords
        const user = userByEmail || userByUsername;
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({
                status: 401,
                error: 'Invalid password!'
            });
        }

        // Generate JWT token for the user
        const payload = {
            id: user.id,
            username: user.username,
            full_name: user.full_namename,
            bio: user.bio,
            profile_picture: user.profile_picture,
            email: user.email,
            role: user.role,
            is_admin: user.is_admin
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '6h' });

        // Send token and user data in response
        res.status(200).json({
            status: 200,
            message: 'Login successful.',
            token,
            user: payload
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({
            status: 500,
            error: 'Internal server error'
        });
    }
};
