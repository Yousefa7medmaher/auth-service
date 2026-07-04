# Auth Service (Express.js + MongoDB + Google OAuth)

This is a secure authentication microservice built using **Express.js**, **MongoDB**, **Mongoose**, and **Passport.js** with **Google OAuth 2.0** support. It supports:
- User registration & login with email/password
- Login using Google account
- JWT-based authentication
- Role-based access control (admin, student, instructor)

---

## Features

- Register with email & strong password
- Login with email/password
- Login with Google using Passport.js
- Role-based access (e.g. admin only routes)
- JWT token issued on successful login
- Secured endpoints (e.g. `/protected`, `/admin`)
- Docker support
- CI pipeline via GitHub Actions

---

## Project Structure

```
.
├── config/
│   └── db.js                # MongoDB connection logic
├── controllers/
│   ├── Login.js             # Login controller (JWT)
│   ├── Register.js          # Registration controller
│   ├── Profile.js           # User profile (get/update)
│   └── passport.js          # Passport Google OAuth strategy
├── models/
│   └── User.js              # Mongoose User schema/model
├── src/
│   ├── middleware/
│   │   └── auth.js          # JWT authentication & role authorization
│   ├── routes/
│   │   └── route.js         # All API routes
│   └── server.js            # Express app entry point
├── utils/
│   └── response.js          # Helper for sending responses
├── DockerFile               # Docker build instructions
├── package.json             # Project dependencies & scripts
├── .gitignore               # Ignores .env and other files
└── .env                     # Environment variables (not committed)
```

---

## Environment Variables

Create a `.env` file in the root with:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback
NODE_ENV=development
```

---

## API Endpoints

### Auth & User

- `POST /register` — Register a new user (name, email, password, phone)
- `POST /login` — Login with email & password (returns JWT)
- `GET /auth/google` — Start Google OAuth login
- `GET /auth/google/callback` — Google OAuth callback

### Profile

- `GET /profile` — Get current user's profile (JWT required)
- `PUT /profile` — Update name/phone (JWT required)

### Protected & Role-based

- `GET /protected` — Any authenticated user (JWT required)
- `GET /admin` — Only admin users (JWT required)

---

## Security

- Passwords are hashed with bcryptjs
- JWT tokens for stateless authentication
- Role-based access control middleware
- Google OAuth 2.0 via Passport.js

---

## Docker

Build and run with Docker:

```sh
docker build -t auth-service .
docker run -p 5000:5000 --env-file .env auth-service
```

---

## Scripts

- `npm run dev` — Start server with nodemon (development)

---

## Dependencies

- express, mongoose, dotenv, bcryptjs, jsonwebtoken, cors
- passport, passport-google-oauth20

---

## Notes

- Make sure to set up your Google OAuth credentials in the Google Cloud Console.
- The `.env` file is ignored by git for security.
- Replace `your-production-domain.com` in CORS settings for production.
