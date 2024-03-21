# FriendFusion

# Project Description

The project is a social media platform called "FriendFusion" that allows users to connect, share posts, interact through comments and likes, send messages, and stay updated with notifications. It provides features like user registration and authentication, profile management, post creation/editing/deletion, following/unfollowing users, messaging, notifications, tagging topics, and exploring trending content. The project aims to create a seamless and engaging social networking experience for users while promoting meaningful interactions and content discovery.

#
## DB Structure

### Users Table:
- user_id (Primary Key)
- username
- email
- password
- profile_picture
- bio
- role
- is_admin (boolean)
- registration_date

### Posts Table:
- post_id (Primary Key)
- user_id (Key referencing Users table)
- post_content
- post_date
- likes_count
- comments_count

### Comments Table:
- comment_id (Primary Key)
- post_id (Key referencing Posts table)
- user_id (Key referencing Users table)
- comment_content
- comment_date

### Likes Table:
- like_id (Primary Key)
- post_id (Key referencing Posts table)
- user_id (Key referencing Users table)


### Followers Table:
- follow_id (Primary Key)
- follower_id (Key referencing Users table)
- following_id (Key referencing Users table)
- follow_date

### Messages Table:
- message_id (Primary Key)
- sender_id (Key referencing Users table)
- receiver_id (Key referencing Users table)
- message_content
- message_date
- is_read (boolean flag to indicate if the message has been read)

### Notifications Table:
- notification_id (Primary Key)
- user_id (Key referencing Users table)
- notification_type (e.g., like, comment, follow)
- related_id (ID of the related post/comment/user)
- notification_date
- is_read (boolean flag to indicate if the notification has been read)

### Tag Table:
- tag_id (Primary Key)
- tag_name

### Topics Table:
- topic_id (Primary Key)
- topic_name
- tag_id (Key referencing Tags table, to associate tags with topics)

### Reels Table:
- reel_id (Primary Key)
- user_id (Key referencing Users table)
- reel_content
- reel_date
- likes_count
- comments_count

### Trends Table:
- trend_id (Primary Key)
- trend_name
- trend_description
- trend_hash
- likes_count
- comments_count
- tag_id (Key referencing Tags table, to associate tags with trends)

## API Structure

### User APIs:
- Register User: Create a new user account.
- Login User: Authenticate and log in a user.
- Get User Profile: Retrieve user profile information.
- Update User Profile: Modify user profile details.
- Change Password: Update user password.
- Forgot Password: Send a password reset link to the user's email.
- Delete User Account: Remove a user's account from the system.


### Post APIs:
- Create Post: Allow users to create new posts.
- Edit Post: Modify existing posts.
- Delete Post: Remove a post from the platform.
- Get Post: Retrieve details of a specific post.
- Get User Posts: Get posts created by a specific user.
- Like Post: Allow users to like posts.
- Comment on Post: Enable commenting on posts.

### Comment APIs:
- Get Comments: Retrieve comments for a particular post.
- Add Comment: Allow users to add comments to posts.
- Edit Comment: Modify existing comments.
- Delete Comment: Remove a comment from a post.

### Like APIs:
- Like Post/Comment: Allow users to like posts or comments.
- Unlike Post/Comment: Remove a like from a post or comment.

### Follow APIs:
- Follow User: Enable users to follow other users.
- Unfollow User: Allow users to unfollow other users.
- Get Followers: Retrieve followers of a specific user.
- Get Following: Retrieve users followed by a specific user.

### Message APIs:
- Send Message: Allow users to send messages to other users.
- Get Messages: Retrieve messages for a user.
- Mark Message Read/Unread: Update message status (read/unread).
- Delete Message: Remove a message from the inbox.

### Notification APIs:
- Get Notifications: Retrieve notifications for a user.
- Mark Notification Read/Unread: Update notification status (read/unread).
- Delete Notification: Remove a notification.

### Tag APIs:
- Get Tags: Retrieve all available tags.
- Create Tag: Allow admins to create new tags (if applicable).
- Edit Tag: Modify existing tag details.
- Delete Tag: Remove a tag from the system.

### Topic APIs:
- Get Topics: Retrieve all available topics.
- Create Topic: Allow admins to create new topics (if applicable).
- Edit Topic: Modify existing topic details.
- Delete Topic: Remove a topic from the system.

### Reel APIs:
- Create Reel: Allow users to create new reels.
- Edit Reel: Modify existing reel content.
- Delete Reel: Remove a reel from the platform.
- Get Reels: Retrieve reels for users or explore page.

# Routes

## User Endpoints
- **POST** /register: Create a new user account.
- **POST** /login: Authenticate and log in a user.
- **GET** /profile/{user_id}: Retrieve user profile information.
- **PUT** /profile/update: Modify user profile details.
- **PUT** /password/update: Update user password.
- **UPDATE** /forgot_password: Change user password.
- **DELETE** /delete/{user_id}: Remove a user's account.

## Post Endpoints
- **POST** /posts/create: Create a new post.
- **PUT** /posts/edit/{post_id}: Modify an existing post.
- **DELETE** /posts/delete/{post_id}: Remove a post.
- **GET** /posts/{post_id}: Retrieve details of a specific post.
- **GET** /posts/user/{user_id}: Get posts created by a user.
- **POST** /posts/{post_id}/like: Like a post.
- **POST** /posts/{post_id}/comment: Add a comment to a post.

## Comment Endpoints
- **GET** /comments/{post_id}: Retrieve comments for a post.
- **POST** /comments/{post_id}/add: Add a comment to a post.
- **PUT** /comments/edit/{comment_id}: Modify an existing comment.
- **DELETE** /comments/delete/{comment_id}: Remove a comment.

## Like Endpoints
- **POST** /likes/{post_id}/add: Like a post.
- **DELETE** /likes/{post_id}/remove: Remove a like from a post.

## Follow Endpoints
- **POST** /follow/{user_id}/add: Follow a user.
- **DELETE** /follow/{user_id}/remove: Unfollow a user.
- **GET** /followers/{user_id}: Retrieve followers of a user.
- **GET** /following/{user_id}: Retrieve users followed by a user.

## Message Endpoints
- **POST** /messages/send: Send a message.
- **GET** /messages/{user_id}: Retrieve messages for a user.
- **PUT** /messages/{message_id}/read: Mark a message as read/unread.
- **DELETE** /messages/{message_id}/delete: Remove a message.

## Notification Endpoints
- **GET** /notifications/{user_id}: Retrieve notifications for a user.
- **PUT** /notifications/{notification_id}/read: Mark a notification as read/unread.
- **DELETE** /notifications/{notification_id}/delete: Remove a notification.

## Tag Endpoints
- **GET** /tags: Retrieve all available tags.
- **POST** /tags/create: Create a new tag.
- **PUT** /tags/edit/{tag_id}: Modify an existing tag.
- **DELETE** /tags/delete/{tag_id}: Remove a tag.

## Topic Endpoints
- **GET** /topics: Retrieve all available topics.
- **POST** /topics/create: Create a new topic.
- **PUT** /topics/edit/{topic_id}: Modify an existing topic.
- **DELETE** /topics/delete/{topic_id}: Remove a topic.

## Reel Endpoints
- **POST** /reels/create: Create a new reel.
- **PUT** /reels/edit/{reel_id}: Modify an existing reel.
- **DELETE** /reels/delete/{reel_id}: Remove a reel.
- **GET** /reels/{user_id}: Retrieve reels for a user.

