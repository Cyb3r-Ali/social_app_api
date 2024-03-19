// Import necessary modules
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Changed require statement
const userModel = require('../models/User'); // Import user model
const Joi = require('joi');
const env = require("dotenv")
env.config(); // Load environment variables

// Define a custom validator function to check if a string is all lowercase
const isLowerCase = (value, helpers) => {
    if (value === value.toLowerCase()) {
        return value; // If the value is all lowercase, return it
    } else {
        return helpers.error('any.lowercase');
    }
};

// Define Joi schema for user registration
const registerSchema = Joi.object({
    full_name: Joi.string().required(),
    username: Joi.string()
        .required()
        .custom((value, helpers) => {
            if (value.includes(' ')) {
                return helpers.message({ custom: 'Username must not contain spaces' });
            }
            if (value !== value.toLowerCase()) {
                return helpers.message({ custom: 'Username must be all lowercase' });
            }
            return value;
        }),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    bio: Joi.string().allow('').optional()
});


// Define Joi schema for user login
const loginSchema = Joi.object({
    identifier: Joi.string().required().messages({
        'any.required': 'You must provide an email or username'
    }),
    password: Joi.string().min(8).required()
});


// Controller function for user registration
exports.register = async (req, res) => {
    // Validate request body against the schema
    const { error } = registerSchema.validate(req.body);
    if (error) {
        // Return validation error message
        return res.status(400).json({
            status: 400,
            error: error.details[0].message
        });
    }

    // Destructure necessary data from the request body
    const { full_name, username, email, password, bio } = req.body;

    // Set default values for role and is_admin
    const role = 'user';
    const is_admin = 0;

    // Set default profile picture
    const profile_picture = "default.png";

    try {
        // Check if the user already exists by email
        const existingEmail = await userModel.getUserByField("email", email);
        if (existingEmail) {
            return res.status(400).json({
                status: 400,
                error: 'User with this email already exists'
            });
        }

        // Check if the user already exists by username
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
            full_name: newUser.full_name,
            bio: newUser.bio,
            profile_picture: newUser.profile_picture,
            email: newUser.email,
            role: newUser.role,
            is_admin: newUser.is_admin
        }

        // Sign JWT token with secret key and expiration time
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '6h' });

        // Send success response with token and user data
        res.status(201).json({
            status: 200,
            message: 'User registered successfully',
            token,
            user: payload
        });

    } catch (error) {
        console.error('Error registering user:', error);
        // Send error response in case of any internal error
        res.status(500).json({
            status: 500,
            error: error.message
        });
    }
}

// Controller function for user login
exports.login = async (req, res) => {
    // Validate request body against the schema
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: 400,
            error: error.details[0].message
        });
    }

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
            full_name: user.full_name,
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

// Controller function for user logout 
exports.logout = async (req, res) => {
    // Clear token from headers or cookies or wherever it's stored 
    // For example, if you're using JWT in headers 
    res.setHeader('Authorization', '');
    res.status(200).json({
        status: 200,
        message: 'User logged out successfully'
    });
};