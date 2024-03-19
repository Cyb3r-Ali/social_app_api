# Update of (18-3-2024): Setting Up Database Connection and Server

## Overview
Today, we accomplished the following milestones in our project:

- Successfully set up the database connection using `mysql2` and environment variables from a `.env` file with `dotenv`.
- Configured an Express server in `index.js` with middleware for body parsing and serving static files.
- Pushed our project code to GitHub for version control and collaboration.

## Achievements
- **Database Connection:** Created `db.js` for database configuration, ensuring efficient database interactions.
- **Server Configuration:** Configured middleware and static file serving in Express for a robust server setup.
- **GitHub Push:** Ensured version control and collaboration by pushing our project to GitHub.

## Next Steps
Moving forward, our focus will be on:
- Implementing CRUD operations for database interactions.
- Adding authentication and authorization to secure our application.
- Enhancing user experience with additional features and functionalities.

## Challenges Faced
We encountered minor issues with Git's line endings during the setup, but we successfully resolved them by configuring Git appropriately.

While setting up the development environment, we encountered a nodemon issue that prevented automatic server restarts on file changes. However, we were able to address and resolve this issue, ensuring smooth development workflow.

Today's progress marks a significant step forward, and we are excited about the upcoming milestones and improvements in our application.

## Update of (19-3-2024): Implementing Image Upload in User Registration

### Summary:
Today, we made progress in enhancing the user registration process by incorporating the ability for users to upload profile pictures during registration. This feature adds a visual element to user profiles and improves the overall user experience.

### Achievements:
- Successfully integrated image upload functionality into the user registration process, allowing users to upload profile pictures along with other registration details.
- Utilized appropriate middleware or libraries to handle file uploads securely and efficiently.
- Configured the backend to store uploaded images in a designated location or cloud storage service, ensuring data integrity and accessibility.

### Challenges Faced:
1. **Handling File Uploads:**
   - Faced challenges in implementing file upload functionality securely while ensuring compatibility with various file types and sizes.
   - Overcame this by leveraging established libraries or middleware tailored for file uploads and configuring them to meet our requirements.

2. **Data Storage and Management:**
   - Encountered difficulties in determining the optimal storage solution for uploaded images, considering factors such as scalability, cost-effectiveness, and data privacy.
   - Addressed this by carefully evaluating different storage options and selecting the most suitable one based on our application's needs and constraints.

### Next Steps:
- Conduct thorough testing of the image upload feature to ensure seamless integration with the user registration process and smooth user experience.
- Implement additional functionalities such as image resizing and compression to optimize performance and reduce storage requirements.
- Continuously monitor and optimize the image upload process to maintain reliability, security, and efficiency over time.