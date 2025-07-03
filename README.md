

MERN Stack Blog Application
A full-stack blog application built with the MERN (MongoDB, Express.js, React.js, Node.js) stack, demonstrating seamless integration between front-end and back-end components. This project features full CRUD functionality for blog posts, user authentication, image uploads, and an interactive, responsive user interface styled with Tailwind CSS.

#screenshot
<a href="https://ik.imagekit.io/tba7zelzb/blog-app.jpg?updatedAt=1751549250253" target="_blank" rel="noopener noreferrer">
  Visit Example
</a>

Table of Contents
Features

Technologies Used

Project Structure

Getting Started

Prerequisites

Cloning the Repository

Environment Variables

Installation

Running the Application

API Endpoints

Frontend Details

Acknowledgments

License

Contact

Features
RESTful API: Robust backend built with Express.js and MongoDB.

User Authentication & Authorization: Secure user registration, login, and protected routes using JWT (JSON Web Tokens). Users can only edit/delete their own posts.

Full CRUD for Blog Posts:

Create: Publish new blog posts with a title, content, and an optional image.

Read: View all blog posts on the homepage and detailed individual post pages.

Update: Edit existing blog posts (only by the author).

Delete: Remove blog posts (only by the author).

Image Uploads: Integrate multer for handling image uploads, storing them locally on the server.

Comments: Users can add comments to blog posts (comments are embedded as sub-documents).

Responsive UI: Modern and responsive user interface built with React.js and styled efficiently with Tailwind CSS.

Component Architecture: Clean and modular React components.

React Context API & Hooks: Centralized state management for authentication and efficient data handling.

Technologies Used
This project leverages the following technologies:

Backend (Node.js & Express.js):

Node.js: JavaScript runtime environment.

Express.js: Fast, unopinionated, minimalist web framework.

MongoDB: NoSQL database for storing application data.

Mongoose: MongoDB object data modeling (ODM) for Node.js.

Bcrypt.js: For hashing and salting passwords.

JSON Web Token (JWT): For secure authentication.

Multer: Middleware for handling multipart/form-data (primarily used for file uploads).

CORS: For enabling Cross-Origin Resource Sharing.

Dotenv: For loading environment variables from a .env file.

Express-Async-Handler: Simple middleware for handling exceptions inside of async express routes.

Express-Validator (Optional - for advanced validation): Middleware for request data validation.

Frontend (React.js):

React.js: JavaScript library for building user interfaces.

React Router DOM: For declarative routing in React applications.

Axios: Promise-based HTTP client for making API requests.

JWT-decode: For decoding JWTs on the client-side.

Formik: Building forms in React.

Yup: JavaScript schema builder for value parsing and validation.

Tailwind CSS: A utility-first CSS framework for rapidly building custom designs.

PostCSS & Autoprefixer: For processing CSS with plugins and adding vendor prefixes.

Project Structure
mern-blog/
├── client/                 # React front-end
│   ├── public/             # Static files
│   ├── src/                # React source code
│   │   ├── components/     # Reusable UI components (Navbar, PostCard, PostForm, etc.)
│   │   ├── pages/          # Page-level components (HomePage, PostDetailPage, LoginPage, etc.)
│   │   ├── hooks/          # Custom React hooks (useAuth, usePosts)
│   │   ├── services/       # API interaction services (authService, postService, api.js)
│   │   ├── context/        # React context providers (AuthContext)
│   │   ├── index.css       # Main Tailwind CSS directives
│   │   └── App.jsx         # Main application component and routing
│   └── package.json        # Client dependencies
├── server/                 # Express.js back-end
│   ├── config/             # Configuration files (db.js)
│   ├── controllers/        # Route controllers (authController, postController)
│   ├── models/             # Mongoose models (User.js, Post.js)
│   ├── routes/             # API routes (authRoutes, postRoutes)
│   ├── middleware/         # Custom middleware (authMiddleware, uploadMiddleware)
│   ├── utils/              # Utility functions (generateToken)
│   ├── uploads/            # Directory for storing uploaded images (created automatically by Multer)
│   ├── server.js           # Main server file
│   └── package.json        # Server dependencies
└── README.md               # Project documentation
Getting Started
Follow these steps to get a copy of the project up and running on your local machine for development and testing purposes.

Prerequisites
Node.js & npm/Yarn: Make sure you have Node.js (v14 or higher recommended) and a package manager (npm or Yarn) installed.

Download Node.js

MongoDB: You need a running MongoDB instance. You can:

Install MongoDB locally: MongoDB Community Edition

Use a cloud service like MongoDB Atlas: MongoDB Atlas

Cloning the Repository
Bash

git clone https://github.com/YOUR_USERNAME/mern-blog.git # Replace with your repo URL
cd mern-blog
Environment Variables
Create a .env file in the server/ directory with the following content:

Code snippet

# server/.env

MONGO_URI=mongodb://localhost:27017/mern_blog_db # Replace with your MongoDB connection string
JWT_SECRET=YOUR_SUPER_STRONG_AND_RANDOM_JWT_SECRET # Generate a strong, random string
PORT=5000
Important: Do not commit your .env file to version control.

Installation
Install Backend Dependencies:

Bash

cd server
npm install
# OR yarn install
Install Frontend Dependencies:

Bash

cd ../client # Go back to root and then into client
npm install
# OR yarn install
Running the Application
Start the Backend Server:
Open a terminal in the mern-blog/server directory.

Bash

npm start # Or if you have nodemon installed: nodemon server.js
The server will typically run on http://localhost:5000.

Start the Frontend Development Server:
Open a separate terminal in the mern-blog/client directory.

Bash

npm start # If you used Create React App
# OR npm run dev # If you used Vite
The frontend application will open in your browser (usually at http://localhost:3000 or http://localhost:5173).

You should now have both your frontend and backend running, ready to interact!

API Endpoints
The backend provides the following RESTful API endpoints:

Authentication

POST /api/auth/register - Register a new user.

POST /api/auth/login - Authenticate a user and get a JWT.

Blog Posts

GET /api/posts - Get all blog posts.

GET /api/posts/:id - Get a single blog post by ID.

POST /api/posts - Create a new blog post (Requires authentication, supports image upload).

PUT /api/posts/:id - Update an existing blog post (Requires authentication, author only, supports image update).

DELETE /api/posts/:id - Delete a blog post (Requires authentication, author only).

Comments

POST /api/posts/:id/comments - Add a comment to a specific post (Requires authentication).

Frontend Details
The React frontend is built with a strong emphasis on component reusability and clear separation of concerns:

Pages: Top-level components representing distinct views (e.g., HomePage, PostDetailPage).

Components: Smaller, reusable UI elements (e.g., Navbar, PostCard, PostForm).

Services: Abstraction layer for all API calls using axios, centralizing request logic and JWT handling via an interceptor.

Context API (AuthContext): Manages global authentication state (user, token) across the application, avoiding prop drilling.

Custom Hooks (useAuth, usePosts): Encapsulate reusable stateful logic related to authentication and post data fetching.

Form Handling: Utilizes Formik for simplified form management and Yup for robust validation.

Styling: Fully integrated with Tailwind CSS for rapid and consistent styling using utility classes directly in JSX. Custom CSS is minimal and reserved for base styles or specific overrides.

Acknowledgments
Inspired by various MERN stack tutorial series.

Special thanks to the creators of Node.js, Express.js, React.js, MongoDB, and all the open-source libraries used.



Contact
For any questions or suggestions, feel free to reach out:

Your Name: Wainaina Mwangi

GitHub: wainaina mwangi

Email: wainainaerastus.com (Optional)