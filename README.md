# Task Manager

A fullstack task management application with JWT authentication built with Next.js and NestJS.

## 🚀 Live Demo

- **Frontend:** https://task-manager-one-liard.vercel.app
- **Backend:** https://task-manager-h8q8.onrender.com

> Note: The backend is hosted on Render's free tier and may take ~30 seconds to wake up after inactivity.

---

## 🛠️ Tech Stack

**Frontend**
- Next.js 15 (App Router)
- TypeScript
- Bootstrap 5
- Axios

**Backend**
- NestJS
- TypeORM
- PostgreSQL
- JWT Authentication
- Passport.js
- bcryptjs

---

## ✨ Features

- User registration and login with JWT
- Password encryption with bcrypt
- Protected routes (frontend and backend)
- Full task CRUD (create, read, update, delete)
- Each user only sees their own tasks
- Input validation on both frontend and backend
- Error handling and user feedback

---

## 📦 Running Locally

### Prerequisites

- Node.js 18+
- PostgreSQL installed and running
- NestJS CLI: `npm install -g @nestjs/cli`

### 1. Clone the repository

```bash
git clone https://github.com/ArticFish/task-manager.git
cd task-manager
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder based on `.env.example`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=task_manager
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d
FRONTEND_URL=http://localhost:3001
```

Create the database in PostgreSQL:

```bash
psql -U postgres
CREATE DATABASE task_manager;
\q
```

Run the backend:

```bash
npm run start:dev
```

The backend will run on `http://localhost:3000`

### 3. Frontend setup

```bash
cd frontend
npm install
```

Create a `.env.local` file in the `frontend` folder:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Run the frontend:

```bash
npm run dev
```

The frontend will run on `http://localhost:3001`

---
---

## 🐳 Running with Docker

### Prerequisites

- Docker Desktop installed and running

### 1. Clone the repository
```bash
git clone https://github.com/ArticFish/task-manager.git
cd task-manager
```

### 2. Create the environment file

Create a `.env` file in the root folder:
```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=taskmanager
DB_HOST=db
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=taskmanager
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d
FRONTEND_URL=http://localhost:3001
NEXT_PUBLIC_API_URL=http://localhost:3000
PORT=3000
```

### 3. Run
```bash
docker-compose up --build
```

- Frontend: http://localhost:3001
- Backend: http://localhost:3000

## 🌐 Deploying

### Backend (Render)

1. Create a new Web Service on [Render](https://render.com)
2. Connect your GitHub repository
3. Set **Root Directory** to `backend`
4. Set **Build Command** to `npm install && npm run build`
5. Set **Start Command** to `npm run start:prod`
6. Add the environment variables from `.env.example` with your production values

> For the database, use [Supabase](https://supabase.com) and make sure to use the **Session Pooler** connection string to avoid IPv6 issues with Render.

### Frontend (Vercel)

1. Import your repository on [Vercel](https://vercel.com)
2. Set **Root Directory** to `frontend`
3. Add the environment variable:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
   ```
4. Deploy

---

## 📡 API Endpoints

### Auth (public)

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| POST | `/auth/register` | Register a new user | `{ username, email, password }` |
| POST | `/auth/login` | Login and get JWT token | `{ email, password }` |

### Tasks (protected 🔒)

All task endpoints require a valid JWT token in the `Authorization` header:
```
Authorization: Bearer <your_token>
```

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| GET | `/tasks` | Get all tasks for the logged in user | - |
| GET | `/tasks/:id` | Get a single task by id | - |
| POST | `/tasks` | Create a new task | `{ title, description }` |
| PATCH | `/tasks/:id` | Update a task | `{ title?, description?, status? }` |
| DELETE | `/tasks/:id` | Delete a task | - |

Requests to protected endpoints without a valid token will return a `401 Unauthorized` error.

---

## 📋 DTOs (Data Transfer Objects)

The backend uses DTOs to validate and control the data that enters and exits the API. This ensures that only expected fields are accepted and that they meet the required format.

**CreateUserDto** (register)
- `username` → string, min 3 characters
- `email` → valid email format
- `password` → string, min 8 characters

**CreateAuthDto** (login)
- `email` → valid email format
- `password` → string, min 8 characters

**CreateTaskDto** (create task)
- `title` → required string
- `description` → required string
- `status` → optional string (defaults to `pending`)

**UpdateTaskDto** (update task)
- All fields from `CreateTaskDto` are optional
- Extra fields like `id` are automatically stripped by the validation pipe

---

## 📁 Project Structure

```
task-manager/
├── frontend/          # Next.js app
│   ├── app/
│   │   ├── login/
│   │   ├── register/
│   │   └── tasks/
│   └── lib/
│       └── api.ts     # Axios instance with JWT interceptor
└── backend/           # NestJS app
    └── src/
        ├── auth/      # JWT authentication
        ├── users/     # User management
        └── tasks/     # Tasks CRUD
```
