## Update of (18-3-2024): Setting Up Database Connection and Server

### Overview
Today, we accomplished the following milestones in our project:

- Successfully set up the database connection using `mysql2` and environment variables from a `.env` file with `dotenv`.
- Configured an Express server in `index.js` with middleware for body parsing and serving static files.
- Pushed our project code to GitHub for version control and collaboration.

### Achievements
- **Database Connection:** Created `db.js` for database configuration, ensuring efficient database interactions.
- **Server Configuration:** Configured middleware and static file serving in Express for a robust server setup.
- **GitHub Push:** Ensured version control and collaboration by pushing our project to GitHub.

### Next Steps
Moving forward, our focus will be on:
- Implementing CRUD operations for database interactions.
- Adding authentication and authorization to secure our application.
- Enhancing user experience with additional features and functionalities.

### Challenges Faced
We encountered minor issues with Git's line endings during the setup, but we successfully resolved them by configuring Git appropriately.

While setting up the development environment, we encountered a nodemon issue that prevented automatic server restarts on file changes. However, we were able to address and resolve this issue, ensuring smooth development workflow.

Today's progress marks a significant step forward, and we are excited about the upcoming milestones and improvements in our application.
#
# Update of (18-3-2024): Ends Here
#

# Update of (19-3-2024): Implemented Register, Login and Logout.

## Added Functionality:
- Implemented user registration functionality.
- Implemented user login functionality.
- Added a middleware to handle default route redirection.
- Added a middleware to authenticate JWT tokens.
- Implemented a function to fetch all users from the database.
- Restricted access to the list of users to only authenticated users.

## Functionality Details:

### User Registration:
- Created a register function in the user controller to handle user registration.
- Implemented validation of user input using Joi.
- Hashed the user's password before storing it in the database.
- Created a new user with default values for other columns.

### User Login:
- Developed a login function in the user controller to handle user login.
- Validated user input using Joi schema.
- Checked if the user exists in the database and verified the password.
- Generated a JWT token upon successful login for authentication.

### Middleware for Default Route Handling:
- Implemented a middleware function to redirect users to the login/register page if they visit the default route ("/") without authentication.
- Redirected authenticated users to the dashboard or another authenticated page.

### Middleware for JWT Token Authentication:
- Added a middleware function to authenticate JWT tokens for protected routes.
- Used this middleware to restrict access to the list of users, allowing only authenticated users to view all users.

### Fetching All Users:
- Created a getAllUsers function in the user controller to retrieve all users from the database.
- Implemented error handling to catch and respond to any errors that occur during the retrieval process.

## Conclusion:
With these additions and modifications, the application now supports user registration, login, and fetching all users. Additionally, it ensures that only authenticated users can access certain routes, providing a more secure and user-friendly experience.

