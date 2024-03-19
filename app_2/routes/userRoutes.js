const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require("../controllers/authController")
const authenticateToken = require('../middlewares/verifyToken');
const handleDefaultRoute = require("../middlewares/handleDefaultRoute")


// Default route
router.get('/', authenticateToken, handleDefaultRoute)

// Route for user registration
router.post('/register', authController.register);


// Route for user login
router.post('/login', authController.login);

// Route for user logout
router.post("/logout", authController.logout)


// Route to get all users (protected route)
router.get('/users', authenticateToken, userController.getAllUsers);


// Route for user registration
// router.get('/register', (req, res) => {
//     res.json({
//         status: 200,
//         success: true,
//         message: 'Please enter register details'
//     })
// });


// Route for user login
// router.get('/login', (req, res) => {
//     res.json({
//         status: 200,
//         success: true,
//         message: 'Please enter login details'
//     })
// });


module.exports = router;
