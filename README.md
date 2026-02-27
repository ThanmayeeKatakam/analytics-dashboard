Analytics Dashboard

Live Frontend Demo
 | Backend API

Project Overview

The Analytics Dashboard is a full-stack web application designed to visualize sales and revenue data. The dashboard displays interactive charts to help analyze revenue, sales by category, order status, top products, and monthly trends.

It includes filtering options (date range, category, status) and supports JWT-based authentication. The frontend is built with React and the backend uses Node.js + Express, with MongoDB for data storage.

Tech Stack Used
Layer	Technology
Frontend	React, Chart.js, Axios, CSS/Bootstrap
Backend	Node.js, Express
Database	MongoDB (Atlas)
Authentication	JWT (JSON Web Tokens)
Deployment	Vercel (Frontend), Render (Backend)
Features

JWT-based login/signup

Dashboard with 5+ interactive charts (Bar, Line, Pie, Doughnut, Area)

Filter data by date range, category, and order status

Summary cards: total revenue, total sales, categories, average order value

Responsive design for desktop and mobile

Proper loading states and error handling

API Endpoints
Authentication
Endpoint	Method	Description
/api/auth/login	POST	Login with email & password; returns JWT token
/api/auth/signup	POST	Create a new user account; returns JWT token
Sales / Dashboard Data
Endpoint	Method	Description
/api/sales/summary	GET	Returns sales summary for charts and dashboard cards. Supports query params: startDate, endDate, category, status

Headers for protected routes:
Authorization: Bearer <JWT token>

Database Schema (MongoDB)
Users Collection
{
  "_id": "ObjectId",
  "email": "string, unique",
  "password": "string (hashed)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
Sales Collection
{
  "_id": "ObjectId",
  "product": "string",
  "category": "string",
  "status": "string (Completed / Pending / Cancelled)",
  "quantity": "number",
  "revenue": "number",
  "date": "Date"
}
Folder Structure
analytics-dashboard/
│
├─ backend/
│  ├─ config/           # Database connection
│  ├─ controllers/      # Route logic
│  ├─ models/           # MongoDB schemas
│  ├─ routes/           # Express routes
│  └─ server.js         # Main server file
│
├─ frontend/
│  ├─ src/
│  │  ├─ pages/         # Login, Dashboard, etc.
│  │  ├─ components/    # Reusable UI components
│  │  ├─ AuthContext.js # Auth provider
│  │  └─ App.js
│  ├─ public/
│  └─ package.json
│
└─ README.md
Steps to Run Locally
Backend

Go to the backend folder:

cd backend

Install dependencies:

npm install

Create .env file:

PORT=5000
MONGO_URI=<your_mongo_uri>
JWT_SECRET=<your_secret_key>

Start server:

npm start

Server will run at http://localhost:5000

Frontend

Go to the frontend folder:

cd frontend

Install dependencies:

npm install

Create .env file:

REACT_APP_API_URL=http://localhost:5000

Start React app:

npm start

App will run at http://localhost:3000

Deployment

Frontend deployed on Vercel: Analytics Dashboard

Backend deployed on Render: API Endpoint

Dashboard Screenshots
Login Page

Dashboard Overview

Charts Example

Notes

Demo account credentials for quick access:

Email: admin@test.com

Password: 123456

Copy button included to autofill login.

JWT authentication protects backend routes; the token is stored in localStorage.

The frontend fetches data dynamically from the deployed backend using environment variables.
