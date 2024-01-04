Notes App
This repository contains a Node.js and MongoDB-based backend for a notes application. The application provides endpoints for user authentication, managing notes, and searching for notes.

Table of Contents
Features
Technologies Used
Getting Started
Prerequisites
Installation
Usage
Authentication
Notes
Testing
Postman
Unit Tests
Contributing
License
Features
User signup and login with password hashing.
CRUD operations for managing user notes.
Note sharing functionality between users.
Search functionality for notes based on title and content.
Technologies Used
Node.js: Backend server runtime.
Express: Web application framework for Node.js.
MongoDB: NoSQL database for storing user and note data.
Mongoose: MongoDB object modeling for Node.js.
JWT (JSON Web Tokens): Token-based authentication.
Bcrypt: Password hashing for user security.
Chai and Mocha: Testing frameworks for unit testing.
Getting Started
Prerequisites
Node.js and npm installed.
MongoDB Atlas account for database access.
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/notes-app.git
Install dependencies:

bash
Copy code
cd notes-app
npm install
Set up MongoDB:

Create a MongoDB Atlas cluster and obtain the connection URI.
Create a .env file:

In the root directory, create a .env file and add:

env
Copy code
PORT=4000
MONGODB_URI=your-mongodb-uri
Start the server:

bash
Copy code
npm start
Usage
Authentication
Signup: POST /api/auth/signup

Create a new user by providing a unique username and password in the request body.
Login: POST /api/auth/login

Authenticate an existing user by providing the username and password in the request body.
Notes
Get All Notes: GET /api/notes

Retrieve all notes for the authenticated user.
Get Note by ID: GET /api/notes/:id

Retrieve a specific note by its ID.
Create Note: POST /api/notes

Create a new note by providing a title and content in the request body.
Update Note: PUT /api/notes/:id

Update an existing note by providing a new title and content in the request body.
Delete Note: DELETE /api/notes/:id

Delete a specific note by its ID.
Share Note: POST /api/notes/:id/share

Share a note with another user by providing their user ID in the request body.
Search Notes: GET /api/notes/search?q=query

Search for notes based on a query string in the title or content.
Testing
Postman
Open Postman:

Download and open Postman.
Import Postman Collection:

Import the provided Postman collection file (notes-app.postman_collection.json).
Set up environment variables, including baseURL and authToken.
Run the Tests:

Open the collection in Postman.
Run the collection, ensuring that the environment is selected.
Review Results:

Check responses, status codes, and error messages for each request.
Unit Tests
Run unit tests using Mocha and Chai:

bash
Copy code
npm test
Contributing
Feel free to contribute by submitting issues or pull requests.
