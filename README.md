# Quizzical

Quizzical is a web-based platform offering users a variety of quizzes on technical topics, enabling them to test and enhance their knowledge. With a rich set of features, Quizzical provides an engaging, interactive, and personalized learning experience.

## Website
https://quizzical.aadish.tech/

## Features

- Over **11,000+ questions** spanning **7+ technical fields**.
- Quizzes categorized by difficulty levels: **Easy**, **Medium**, and **Hard**.
- Real-time feedback on answers to aid learning.
- Progress tracking to monitor user performance over time.
- JWT-based authentication for secure user sessions.
- API integration for dynamic question fetching.
- Responsive design for seamless usage across devices.

## Technologies Used

- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Authentication:** JWT (JSON Web Token)
- **Optimization:** API caching for faster responses

## Future Goals

- Gamification features (e.g., badges, leaderboards).
- Multiplayer quiz mode for interactive competition.
- Integration with educational platforms for broader reach.

## Pages

### 1. Home

![Home](https://drive.google.com/uc?id=1qpmiAxgkh4WmqVDxkajyCAAKoh38BkVD)


### 2. SignIn

![SignIn](https://drive.google.com/uc?id=1wXT5rHg4x-663DasRAPq8woqvzfRnYJu)


### 3. SignUp

![SignUp](https://drive.google.com/uc?id=1h8SKYr6LpITt_fumzzJ40kAD37eIhr4A)


### 4. Quiz Ongoing

![Quiz Ongoing](https://drive.google.com/uc?id=1NS3vD3sInYVbzcYtGt7XMTaB_zCGzbca)


### 5. Quiz Result

![Quiz Result](https://drive.google.com/uc?id=1SkWzV2BtRzawVzbCK2db5RWhi_BPG47s)


### 6. Past Quizzes

![Past Quizzes](https://drive.google.com/uc?id=133Zo8KZx5FLw5OzL7MjcyrAoabxbJD0w)


## Setup

### Prerequisites

- Node.js and npm
- PostgreSQL installed
- JWT secret key for authentication

### Install Dependencies

1. Clone the repository:

   ```bash
   git clone https://github.com/aadishj23/quizzical.git
   cd quizzical
   ```

2. Install frontend dependencies:

   ```bash
   cd frontend
   npm install
   ```

3. Install backend dependencies:

   ```bash
   cd backend
   npm install
   ```

### Configure Environment Variables

1. Create a `.env` file in the backend directory with the following variables:

   ```
   JWT_SECRET=your_jwt_secret_key
   DATABASE_URL=your_postgresql_connection_string
   ```

   Replace `your_jwt_secret_key` with a strong secret key and `your_postgresql_connection_string` with your PostgreSQL connection string.

2. Create a `.env` file in the frontend directory with:

   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

   Replace the URL with your backend API URL if it's different.

### Run the Application

1. Start the backend server:

   ```bash
   cd backend
   npm start
   ```

2. Start the frontend development server:

   ```bash
   cd frontend
   npm run dev
   ```

The application should now be running on `http://localhost:3000` (frontend) and `http://localhost:5000` (backend).

## Authentication

Quizzical uses JWT for user authentication. Users must include the token in the header of requests requiring authentication.

### API Endpoints

- **POST /api/auth/register**: Register a new user.
  - Request body: `{ "email": "user@example.com", "password": "password123" }`
  - Response: `{ "message": "User registered successfully" }`

- **POST /api/auth/login**: Login with an existing user.
  - Request body: `{ "email": "user@example.com", "password": "password123" }`
  - Response: `{ "token": "your_jwt_token" }`

Include the JWT token in the Authorization header as `Bearer <token>` for protected routes.