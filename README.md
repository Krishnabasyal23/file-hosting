#Secure File Hosting
Project: SEcure File Hosting Web Application

# Structure
-/backend
-/frontend
-/uploads(ignored)

# Server runs at `http://localhost:3000`.
Health-check: `http://localhost:3000/health` → should return `{ ok: true }`

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
connected MongoDb using Mongoose
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
-REgister, Login, upload, public, download, delete features on file
-Dynamic fetching of data
-Secure upload/download via token auth


# how to run backend
open terminal, go to backend folder
cd backend
npm install
npm start
Open http://localhost:3001/health to test the server.

# How to run frontend
cd frontend
npm install
npm start
Open http://localhost:3000 in your browser
The frontend will communicate with the backend at http://localhost:3001

or ,

run backend, start server
open with live server



## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/register` | Register a new user |
| POST | `/api/login` | Login user — returns JWT token |
| POST | `/api/upload` | Upload file (auth required, form-data) |
| GET | `/api/public-files` | List all public files |
| GET | `/api/my-files` | List logged-in user’s files (auth) |
| GET | `/api/files/:id/download` | Download file (auth + permission) |
| DELETE | `/api/files/:id` | Delete a file (owner only, auth) |

## Environment Variables (`backend/.env`)

## Environment Variables Setup
Create a .env file inside the backend folder:
MONGO_URI=mongodb://127.0.0.1:27017/secure_file_hosting 
JWT_SECRET=your_secret_key
PORT=3000


## Demo Flow
-Register->Login-> Receive Token
-Upload file(pdf or Mp4) with privacy set
- View public files(public)/ myfiles(private or public)
-Download/delete own files
-logout

#  NOTES
-make sure MongoDB is running locally.
-make sure backend is running before using frontend forms