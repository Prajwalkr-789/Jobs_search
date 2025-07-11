# 💼 Job Search Website

A modern full-stack job search platform where users can browse, filter, and explore job listings with ease. Built using **Next.js (React)** for the frontend, and **Node.js + Express + TypeScript + PostgreSQL** for the backend.

---

## 🛠 Tech Stack

| Layer      | Technologies                              |
|------------|-------------------------------------------|
| Frontend   | Next.js, React, Tailwind CSS, Axios       |
| Backend    | Node.js, Express, TypeScript, PostgreSQL  |
| Dev Tools  | Nodemon, ESLint, dotenv                   |


## ✨ Features

### Frontend (Next.js)
- 🔍 Real-time job filtering (location, salary, job type)
- 🧭 User-friendly interface with Tailwind CSS
- 📱 Responsive and mobile-friendly
- 📤 Form to post new jobs 
- ❌ Clean empty-state messages when no jobs match

### Backend (Node.js + Express + TypeScript)
- ✅ REST API with type-safe routes
- 🗃️ PostgreSQL database integration
- 🌐 CORS enabled for frontend-backend communication
- 🔒 Input validation & error handling

---

## 🌐 Live Demo

🔗 [View Live Site](https://jobs-search-delta.vercel.app/)

> ⚠️ Note: The backend is hosted on [Render](https://render.com), so the **first request may take a few seconds** to wake up the server.


## 📁 Project Structure
```txt
job-search-website/
├── backend/ # Express API
│ ├── src/
│ │ ├── controllers/
│ │ ├── Database/
│ │ ├── models/
│ │ ├── routes/
│ │ ├── types/
│ │ └── app.ts
│ └── .env
├── frontend/ # Next.js frontend
├── public/ 
├── src/
│ ├── Components/ 
│ ├── Utils/ 
│ ├── app/ 
│ │ ├── createjob/ 
│ │ ├── joblistings/ 
```

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Prajwalkr-789/Jobs_search
cd Jobs_search
```
2. Setup Backend
```bash
cd backend
npm install
```
```txt
Create .env file
PORT=8080
DATABASE_URL=postgresql://username:password@localhost:5432/jobdb
npm run dev
```
3. Setup Frontend
```bash
cd ../frontend
npm install
```
```txt
Create .env file
NEXT_PUBLIC_BACKEND_URL=http://localhost:8080 
npm run dev
```
```txt
✅ API Example
POST /jobs/create
{
  "title": "Frontend Developer",
  "company": "BluBridge",
  "location": "Chennai",
  "salaryMin": 6,
  "salaryMax": 10,
  "jobType": "Full time",
  "experience": "1-2 years",
  "description": "Looking for React developers to join our team."
}
```
