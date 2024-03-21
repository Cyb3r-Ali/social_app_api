const userModel = require('../models/User');

// Controller function to get all users
exports.getAllUsers = async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await userModel.getAllUsers();

        // Return the list of users
        res.status(200).json({
            status: 200,
            message: 'Users fetched successfully',
            users: users
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({
            status: 500,
            error: 'Internal server error'
        });
    }
};

// Controller function for submitting user bio
exports.submitBio = async (req, res) => {
    const { userId, bio } = req.body;

    // Check if the provided userId corresponds to a registered user who completed step 1
    const user = await userModel.getUserByField("id", userId);

    if (!user) {
        return res.status(400).json({
            status: 400,
            error: 'Please complete step 1 first!'
        });
    }

    // Update the user's bio information in the database
    try {
        await userModel.updateUserBio(userId, bio);
        res.status(200).json({
            status: 200,
            message: 'User bio updated successfully',
            user:req.user
        });
    } catch (error) {
        console.error('Error updating user bio:', error);
        res.status(500).json({
            status: 500,
            error: 'Internal server error'
        });
    }
};
