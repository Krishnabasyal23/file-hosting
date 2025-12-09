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

# Day3
connnected MongoDb using MOngoose
created user model
installed:
-bcrypt
jsonwebtoken

## authentication api(day 4)
-implemented user registration API
implemmeneted user login API
implemented JWT based authenticatiaon
protected routes using Authorization header a

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


# Day 5- File Upload System
-Implemented file upload using Multer
-Files stored in uploads folder
-File data stored in MongoDB
-Implemented protected file upload route
-Privacy support for public and private files

## Day6- File Access and Security
-Implented secure download
-private files protected with authenticatioan
-public files access allowed without login
-Tested full backend workflow
    -register, login, uploadfile, secure download

# Day7- File Streaming, PUblic Access and Security
-Added MP4/pdf streaming endpoint
-Implemented public file sharing route
-Added global rate limiting middleware
-Cleaned up unused routes and fixed inconsistencies
-Final backend polish and verification

# Day8- frontend

# how to run backend
cd backend
npm install
npm start
Open http://localhost:3001/health to test the server.


## Environment Variables Setup
Create a .env file inside the backend folder:
MONGO_URI=mongodb://127.0.0.1:27017/secure_file_hosting 
JWT_SECRET=your_secret_key
PORT=3000


