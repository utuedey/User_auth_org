```markdown
# User Authentication & Organisation API

This project is a simple backend API for user authentication and organisation management built using Node.js, Express, Sequelize ORM, and PostgreSQL. It includes endpoints for user registration, login, and CRUD operations on organisations.

## Features

- User Registration with hashed passwords
- User Login with JWT authentication
- Organisation creation and management
- Users can belong to multiple organisations
- Organisations can have multiple users
- Protected routes with JWT middleware
- Validation of input fields
- Error handling

## Technologies Used

- Node.js
- Express
- Sequelize ORM
- PostgreSQL
- Bcrypt.js
- Jsonwebtoken
- Dotenv

## Getting Started

### Prerequisites

- Node.js and npm installed
- PostgreSQL database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/yourrepository.git
   cd yourrepository
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your database URL and JWT secret:
   ```plaintext
   DATABASE_URL=your_database_url
   JWT_SECRET=your_jwt_secret
   ```

4. Set up the database:
   ```bash
   npx sequelize-cli db:create
   npx sequelize-cli db:migrate
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

The server should now be running on `http://localhost:3000`.

## API Endpoints

### User Authentication

- **Register User**
  - **Endpoint:** `POST /auth/register`
  - **Request Body:**
    ```json
    {
      "firstName": "string",
      "lastName": "string",
      "email": "string",
      "password": "string",
      "phone": "string"
    }
    ```
  - **Response:**
    ```json
    {
      "status": "success",
      "message": "Registration successful",
      "data": {
        "accessToken": "eyJh...",
        "user": {
          "userId": "string",
          "firstName": "string",
          "lastName": "string",
          "email": "string",
          "phone": "string"
        }
      }
    }
    ```

- **Login User**
  - **Endpoint:** `POST /auth/login`
  - **Request Body:**
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
  - **Response:**
    ```json
    {
      "status": "success",
      "message": "Login successful",
      "data": {
        "accessToken": "eyJh...",
        "user": {
          "userId": "string",
          "firstName": "string",
          "lastName": "string",
          "email": "string",
          "phone": "string"
        }
      }
    }
    ```

### User Management

- **Get User by ID**
  - **Endpoint:** `GET /users/:id`
  - **Headers:**
    ```plaintext
    Authorization: Bearer <accessToken>
    ```
  - **Response:**
    ```json
    {
      "status": "success",
      "message": "User retrieved successfully",
      "data": {
        "userId": "string",
        "firstName": "string",
        "lastName": "string",
        "email": "string",
        "phone": "string"
      }
    }
    ```

### Organisation Management

- **Get All Organisations**
  - **Endpoint:** `GET /organisations`
  - **Headers:**
    ```plaintext
    Authorization: Bearer <accessToken>
    ```
  - **Response:**
    ```json
    {
      "status": "success",
      "message": "Organisations retrieved successfully",
      "data": {
        "organisations": [
          {
            "orgId": "string",
            "name": "string",
            "description": "string"
          }
        ]
      }
    }
    ```

- **Get Organisation by ID**
  - **Endpoint:** `GET /organisations/:orgId`
  - **Headers:**
    ```plaintext
    Authorization: Bearer <accessToken>
    ```
  - **Response:**
    ```json
    {
      "status": "success",
      "message": "Organisation retrieved successfully",
      "data": {
        "orgId": "string",
        "name": "string",
        "description": "string"
      }
    }
    ```

- **Create Organisation**
  - **Endpoint:** `POST /organisations`
  - **Headers:**
    ```plaintext
    Authorization: Bearer <accessToken>
    ```
  - **Request Body:**
    ```json
    {
      "name": "string",
      "description": "string"
    }
    ```
  - **Response:**
    ```json
    {
      "status": "success",
      "message": "Organisation created successfully",
      "data": {
        "orgId": "string",
        "name": "string",
        "description": "string"
      }
    }
    ```

- **Add User to Organisation**
  - **Endpoint:** `POST /organisations/:orgId/addUser`
  - **Headers:**
    ```plaintext
    Authorization: Bearer <accessToken>
    ```
  - **Request Body:**
    ```json
    {
      "userId": "string"
    }
    ```
  - **Response:**
    ```json
    {
      "status": "success",
      "message": "User added to organisation successfully"
    }
    ```

## Testing

- To run unit tests and end-to-end tests:
  ```sh
  npm test
  ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Express.js](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Bcrypt.js](https://github.com/dcodeIO/bcrypt.js)
- [Jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)

## Author

- [Joseph Utuedeye](https://x.com/joecodes2)
