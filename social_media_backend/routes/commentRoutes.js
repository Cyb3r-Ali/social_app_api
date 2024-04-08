const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/verifyToken');
const commentController = require('../controllers/commentController');

router.get('/:id', commentController.getAllCommentsOfAPost);

router.post('/comment/:id', authenticateToken, commentController.createComment);

router.put('/comment/:id', authenticateToken, commentController.editComment);

module.exports = router;
