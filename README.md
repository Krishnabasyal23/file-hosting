#Secure File Hosting
Project: SEcure File Hosting Web Application

#Structure
-/backend
-/frontend
-/uploads(ignored)

#Day1
Initialize repository and folder structure.
created Express Server and basic health route.

# Day 2
Added middlewares-
-cors
-express.json
-dotenv
created test route

#day3
connnected MongoDb using MOngoose
created user model
installed:
-bcrypt
jsonwebtoken

# how to run backend
cd backend
npm install
npm start
Open http://localhost:3001/health to test the server.

## authentication api(day 4)
## REgister User
POST/api/register

Request Body:{
    "username": "john",
    "email": "john@test.com,
    "password": "123456"

}
Success Response:
{
    "message": "User registered successfully"
}

## Login User
POST/api/Login
Request Body:
{
    "email": "john@test.com",
    "password": "123456"
}
Success Response:
{
    "token":"JWT_TOKEN"
}
### Protected Routes
All protected routes requrie this header:
Authorization: Bearer YOUR_TOKEN_HERE

## Environment Variables Setup
Create a .env file inside the backend folder:
MONGO_URI=mongodb://127.0.0.1:27017/secure_file_hosting 
JWT_SECRET=your_secret_key
PORT=3000