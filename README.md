# Analytics Dashboard

[Live Frontend Demo](https://analytics-dashboard-zeta.vercel.app/login) | [Backend API](https://analytic-dashboard-ujic.onrender.com/)

---

## Project Overview

The **Analytics Dashboard** is a full-stack web application designed to visualize sales and revenue data. The dashboard displays interactive charts to help analyze revenue, sales by category, order status, top products, and monthly trends.

It includes **filtering options** (date range, category, status) and supports **JWT-based authentication**. The frontend is built with **React** and the backend uses **Node.js + Express**, with **MongoDB** for data storage.

---

## Tech Stack Used

| Layer      | Technology                                |
|------------|-------------------------------------------|
| Frontend   | React, Chart.js, Axios, CSS/Bootstrap     |
| Backend    | Node.js, Express                           |
| Database   | MongoDB (Atlas)                            |
| Authentication | JWT (JSON Web Tokens)                 |
| Deployment | Vercel (Frontend), Render (Backend)       |

---

## Features

- JWT-based login/signup  
- Dashboard with **5+ interactive charts** (Bar, Line, Pie, Doughnut, Area)  
- Filter data by date range, category, and order status  
- Summary cards: total revenue, total sales, categories, average order value  
- Responsive design for desktop and mobile  
- Proper loading states and error handling  

---

## API Endpoints

### Authentication
| Endpoint        | Method | Description                        |
|-----------------|--------|------------------------------------|
| `/api/auth/login`  | POST   | Login with email & password; returns JWT token |
| `/api/auth/signup` | POST   | Create a new user account; returns JWT token |

### Sales / Dashboard Data
| Endpoint                | Method | Description |
|-------------------------|--------|-------------|
| `/api/sales/summary`    | GET    | Returns sales summary for charts and dashboard cards. Supports query params: `startDate`, `endDate`, `category`, `status` |

> **Headers for protected routes:**  
> `Authorization: Bearer <JWT token>`

---

## Database Schema (MongoDB)

### Users Collection

{
  "_id": "ObjectId",
  "email": "string, unique",
  "password": "string (hashed)",
  "createdAt": "Date",
  "updatedAt": "Date"
}


### Sales Collection

{
  "_id": "ObjectId",
  "product": "string",
  "category": "string",
  "status": "string (Completed / Pending / Cancelled)",
  "quantity": "number",
  "revenue": "number",
  "date": "Date"
}

---

## Folder Structure
```text
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

```

---

## Steps to Run Locally
### Backend
cd backend
npm install

### Create .env file:

PORT=5000
MONGO_URI=<your_mongo_uri>
JWT_SECRET=<your_secret_key>

### Start server:

npm start

Server will run at http://localhost:5000

### Frontend
cd frontend
npm install

### Create .env file:

REACT_APP_API_URL=http://localhost:5000

### Start React app:

npm start

App will run at http://localhost:3000

---


## Deployed Screenshots
### Login Page
<img width="1775" height="931" alt="Screenshot 2026-02-27 213639" src="https://github.com/user-attachments/assets/bba0a7a6-456b-41e8-95d4-dc2b9a0c91ad" />
### Dashboard
<img width="1839" height="933" alt="Screenshot 2026-02-27 214051" src="https://github.com/user-attachments/assets/fdff0cad-2bbf-4be0-af87-114fcb71b8a3" />
<img width="1783" height="944" alt="Screenshot 2026-02-27 214135" src="https://github.com/user-attachments/assets/f9303639-f11e-402d-8ed7-1af50deff835" />
<img width="1793" height="947" alt="Screenshot 2026-02-27 214203" src="https://github.com/user-attachments/assets/a0442583-cea6-4cc3-b04e-5bd2af70b881" />

---


## Notes

Demo account credentials for quick access:

Email: admin@test.com

Password: 123456

Copy button included to autofill login.

JWT authentication protects backend routes; the token is stored in localStorage.

The frontend fetches data dynamically from the deployed backend using environment variables.



