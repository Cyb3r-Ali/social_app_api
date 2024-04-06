const pool = require('../config/db');

exports.getAllPostsWithUserData = async () => {
    try {
        const sql = `
            SELECT posts.*, users.full_name, users.profile_picture
            FROM posts
            INNER JOIN users ON posts.user_id = users.id
            ORDER BY posts.id DESC
        `;
        console.log("sql", sql);
        const [posts] = await pool.query(sql);
        console.log("logging posts in model", posts);

        posts.forEach(post => {
            post.media = post.media.split(',');
        });

        const response = {
            status: 200,
            message: "Posts fetched successfully",
            posts: posts
        };

        return response;
    } catch (error) {
        throw error;
    }
};

exports.insertPost = async (userId, caption, media) => {
    try {
        const date = new Date();
        const currentDate = `${date}`;

        const mediaString = media.join(',');

        const values = [userId, caption, mediaString, currentDate];
        console.log("values", values);
        const sql = 'INSERT INTO posts (user_id, caption, media, post_date) VALUES (?, ?, ?, ?)';
        const [result] = await pool.query(sql, values);

        if (result.affectedRows < 1) {
            throw new Error('Failed to create post');
        }

        const postId = result.insertId;
        const newPost = await this.getPostById(postId);
        if (newPost) {
            return {
                status: 201,
                message: 'Post created successfully',
                data: newPost
            };
        } else {
            return {
                status: 500,
                message: 'Failed to create post'
            };
        }
    } catch (error) {
        console.error('Failed to create post:', error);
        return {
            status: 500,
            message: `Failed to create post: ${error.message}`
        };
    }
};

exports.getPostById = async (postId) => {
    try {
        const sql = 'SELECT posts.*, users.full_name, users.profile_picture FROM posts INNER JOIN users ON posts.user_id = users.id WHERE posts.id = ?';
        const [rows] = await pool.query(sql, [postId]);

        if (rows.length < 1) {
            err = {
                status: 404,
                message: 'Post not found'
            }
            return err;
        }

        const post = rows[0];
        const media = post.media.split(',');

        return {
            post: {
                id: post.id,
                caption: post.caption,
                media: media,
                user_id: post.user_id,
                full_name: post.full_name,
                profile_picture: post.profile_picture,
                created_at: post.post_date,
            },
            status: 200,
            message: 'Post retrieved successfully'
        };
    } catch (error) {
        console.error({
            status: 500,
            message: `Failed to get single post: ${error.message}`,
            error: `Failed to get post with ID ${postId}: ${error}`
        });
        err = {
            status: 500,
            message: `Failed to get single post: ${error.message}`,
        }
        return err;
    }
};


exports.getAllPostsByUserId = async (userId) => {
    try {
        const sql = 'SELECT posts.*, users.full_name, users.profile_picture FROM posts INNER JOIN users ON posts.user_id = users.id WHERE posts.user_id = ?';
        const [rows] = await pool.query(sql, [userId]);

        const posts = rows.map(post => {
            const media = post.media.split(',');
            return {
                id: post.id,
                caption: post.caption,
                media: media,
                user_id: post.user_id,
                full_name: post.full_name,
                profile_picture: post.profile_picture,
                created_at: post.post_date,
            };
        });

        return posts;
    } catch (error) {
        console.error({
            status: 500,
            message: `Failed to get posts by user ID ${userId}: ${error.message}`,
            error: `Failed to get posts by user ID ${userId}: ${error}`,
        });
        throw new Error(`Failed to get posts by user ID ${userId}: ${error.message}`);
    }
};

exports.updatePost = async (postId, updateFields) => {
    try {
        if (Object.keys(updateFields).length === 0) {
            throw new Error('No fields provided for update');
        }

        let sql = 'UPDATE posts SET ';
        const values = [];
        let mediaValues = [];

        Object.keys(updateFields).forEach((key, index) => {
            if (key !== 'media') {
                sql += `${key} = ?`;
                values.push(updateFields[key]);
            } else {
                mediaValues = updateFields[key];
            }
            if (index < Object.keys(updateFields).length - 1) {
                sql += ', ';
            }
        });

        sql += ' WHERE id = ?';
        values.push(postId);

        const [result] = await pool.query(sql, [...values, postId]);

        if (result.affectedRows < 1) {
            throw new Error('Failed to update post');
        }

        if (mediaValues.length > 0) {
            const updateMediaSql = 'UPDATE posts SET media = ? WHERE id = ?';
            await pool.query(updateMediaSql, [mediaValues.join(','), postId]);
        }

        const updatedPost = await this.getPostById(postId);
        return updatedPost;
    } catch (error) {
        throw new Error(error.message);
    }
};


exports.updatePostLikeCount = async (postId, likeCount) => {
    try {
        const sql = 'UPDATE posts SET like_count = ? WHERE id = ?';
        const [result] = await pool.query(sql, [likeCount, postId]);
        if (result.affectedRows < 1) {
            err = {
                status: 500,
                message: `Failed to update post's like count.`,
            }
            return err
        }

        const updatedPost = await this.getPostById(postId);
        return updatedPost;
    } catch (error) {
        console.error({
            status: 500,
            message: `Failed to update post like count: ${error.message}`,
            error: `Failed to update post likes ${postId}: ${error}`
        });
        err = {
            status: 500,
            message: `Failed to update post's like count: ${error.message}`,
        }
        return err
    }
};

exports.deletePost = async (postId) => {
    try {
        const sql = 'DELETE FROM posts WHERE id = ?';
        const [result] = await pool.query(sql, [postId]);

        if (result.affectedRows !== 1) {
            return {
                status: 404,
                message: 'Post not found or could not be deleted',
                error: 'Post not found or could not be deleted'
            };
        }

        return {
            status: 200,
            message: 'Post deleted successfully'
        };
    } catch (error) {
        console.error('Error deleting post:', error);
        return {
            status: 500,
            message: 'Internal server error',
            error: error.message
        };
    }
};
