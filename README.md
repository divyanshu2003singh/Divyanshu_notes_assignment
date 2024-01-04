# Notes App

This repository contains a Node.js and MongoDB-based backend for a notes application. The application provides endpoints for user authentication, managing notes, and searching for notes.

## Features

- User signup and login with password hashing.
- CRUD operations for managing user notes.
- Note sharing functionality between users.
- Search functionality for notes based on title and content.

## Technologies Used

- **Node.js**: Backend server runtime.
- **Express**: Web application framework for Node.js.
- **MongoDB**: NoSQL database for storing user and note data.
- **Mongoose**: MongoDB object modeling for Node.js.
- **JWT (JSON Web Tokens)**: Token-based authentication.
- **Bcrypt**: Password hashing for user security.
- **Chai and Mocha**: Testing frameworks for unit testing.

## Getting Started

### Prerequisites

- Node.js and npm installed.
- MongoDB Atlas account for database access.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/divyanshu2003singh/Divyanshu_notes_assignment.git

My apologies, the previous version wasn't quite GitHub-flavored markdown specific. Here's a revision:

## Installation

1. **Install dependencies:**

    ```bash
    cd notes-app
    npm install
    ```

2. **Set up MongoDB:**

    * Create a MongoDB Atlas cluster and obtain the connection URI.

3. **Create a `.env` file:**

    * In the root directory, create a `.env` file and add:

      ```
      PORT=4000
      MONGODB_URI=your-mongodb-uri
      ```

4. **Start the server:**

    ```bash
    npm start
    ```

## Usage

### Authentication

* **Signup:** `POST /api/auth/signup`
    * Create a new user by providing a unique username and password in the request body.
* **Login:** `POST /api/auth/login`
    * Authenticate an existing user by providing the username and password in the request body.

### Notes

* **Get All Notes:** `GET /api/notes`
    * Retrieve all notes for the authenticated user.
* **Get Note by ID:** `GET /api/notes/:id`
    * Retrieve a specific note by its ID.
* **Create Note:** `POST /api/notes`
    * Create a new note by providing a title and content in the request body.
* **Update Note:** `PUT /api/notes/:id`
    * Update an existing note by providing a new title and content in the request body.
* **Delete Note:** `DELETE /api/notes/:id`
    * Delete a specific note by its ID.
* **Share Note:** `POST /api/notes/:id/share`
    * Share a note with another user by providing their user ID in the request body.
* **Search Notes:** `GET /api/notes/search?q=query`
    * Search for notes based on a query string in the title or content.

## Testing

### Postman

1. Download and open Postman.
2. Import the provided Postman collection file (`notes-app.postman_collection.json`).
3. Set up environment variables, including `baseURL` and `authToken`.
4. Run the collection, ensuring the environment is selected.
5. Review responses, status codes, and error messages for each request.

### Unit Tests

```bash
npm test
```

## Contributing

Feel free to contribute by submitting issues or pull requests.

## License

This project is licensed under the MIT License.


This should be a more faithful representation of GitHub-flavored markdown!

