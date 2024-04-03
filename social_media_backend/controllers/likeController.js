const likeModel = require("../models/like")
const postModel = require("../models/Post")

exports.likeAndUnlikePost = async (req, res) => {
    try {
        // Check if the user is authenticated
        if (!req.user) {
            return res.status(401).json({
                status: 401,
                error: 'Unauthorized: User not logged in'
            });
        }

        const postId = req.params.id;
        const userId = req.user.id;
        const post = await postModel.getPostById(postId);

        // Check if the post exists
        if (post.status === 404) {
            return res.status(404).json({
                status: 404,
                error: 'Post not found'
            });
        }

        // Check if the user has already liked the post
        const existingLike = await likeModel.getLikeByUserIdAndPostId(userId, postId);
        if (existingLike) {
            // User has already liked the post, so unlike it
            const unlike = await likeModel.unlikePost(postId, userId);

            // Get likes of post
            const likes = await likeModel.getAllLikesOfAPost(postId);
            const length_of_likes = likes.length;

            // Insert like count into post table
            const Updated_post = await postModel.updatePostLikeCount(postId, length_of_likes);
            if (Updated_post.status === 500) {
                return res.status(400).json({
                    status: 400,
                    message: 'Can not like post cuz it does not exist or have been deleted',
                });
            }

            if (unlike.status === 200) {
                return res.status(200).json({
                    status: 200,
                    message: 'Post unliked successfully, Like count updated.',
                    like_count: length_of_likes
                });
            } else {
                return res.status(unlike.status).json({
                    status: unlike.status,
                    message: unlike.message,
                    error: unlike

                });
            }

        } else {
            // User has not liked the post yet, so like it
            await likeModel.likePost(postId, userId);

            // Get likes of post
            const likes = await likeModel.getAllLikesOfAPost(postId);
            const length_of_likes = likes.length;

            // Insert like count into post table 
            const Updated_post = await postModel.updatePostLikeCount(postId, length_of_likes);
            if (Updated_post.status === 500) {
                return res.status(400).json({
                    status: 400,
                    message: 'Can not like post cuz it does not exist or have been deleted',
                });
            }

            return res.status(201).json({
                status: 201,
                message: 'Post liked successfully, Like count updated.',
                like_count: length_of_likes
            });

        }

    } catch (error) {
        console.error('Error liking/unliking post:', error);
        res.status(500).json({
            status: 500,
            error: `Internal server error: ${error.message}`
        });
    }
};

exports.getAllLikesOfAPost = async (req, res) => {
    try {
        const postId = parseInt(req.params.id);

        // check if post exists 
        const post = await postModel.getPostById(postId);
        if (!post) {
            return res.status(404).json({
                status: 404,
                error: 'Post not found'
            });
        }

        // Call the model function to get all likes of a post
        const likes = await likeModel.getAllLikesOfAPost(postId);

        const length_of_likes = likes.length;

        // Check if there are likes
        if (length_of_likes === 0) {
            return res.status(200).json({
                status: 200,
                message: 'No likes found',
                like_count: length_of_likes,
                like_data: likes
            });
        }

        res.status(200).json({
            status: 200,
            message: 'Successfully retrieved likes of the post',
            like_count: length_of_likes,
            like_data: likes
        });

    } catch (error) {
        console.error('Error retrieving likes of the post:', error);
        res.status(500).json({
            status: 500,
            error: `Internal server error: ${error.message}`
        });
    }
};
