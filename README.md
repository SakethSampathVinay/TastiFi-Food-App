🍽️ Tastifi - Restaurant Food Delivery Application



🚀 Project Overview

Tastifi is a modern food delivery platform where users can browse restaurants, order food, and track their orders in real-time.

🔹 Features

User Authentication (Sign Up/Login)

Add to Cart & Checkout

Payment Integration (Stripe)

Order Tracking & History

Admin Panel for managing restaurants, menus, and orders

Secure & Scalable Backend

🛠️ Tech Stack

Section

Technology

Frontend

React, Vite, Flexbox

Backend

Node.js, Express.js, REST API, MongoDB

Admin Panel

React, Vite, Flexbox

Deployment

Vercel

Payment

Stripe

⚙️ Installation & Setup

Clone the Repository

git clone <repo-link>
cd tastifi

Frontend Setup

cd frontend
npm install
npm run dev

Backend Setup

cd backend
npm install
npm run start

Admin Panel Setup

cd admin
npm install
npm run dev

🌍 Deployment Links

🚀 Live URLs:

Frontend: Frontend App

Backend API: API Documentation

Admin Panel: Admin Dashboard

🔑 Environment Variables

Create a .env file in backend/ and frontend/:

# Backend .env
PORT=5000
DATABASE_URL=your-database-url
JWT_SECRET=your-jwt-secret
STRIPE_KEY=your-stripe-key

# Frontend .env
VITE_API_URL=https://your-api-url.com
STRIPE_KEY=your-stripe-key

📡 API Documentation

Endpoint

Method

Description

/api/auth/register

POST

User Registration

/api/auth/login

POST

User Login

/api/orders

GET

Fetch Orders

/api/payment

POST

Process Payment

For full API documentation, refer to API Docs.

👨‍💻 Contributor

Saketh Sampath Vinay (Main Developer)

📞 Contact

📧 For Support: saketh@example.com

💡 Raise an Issue: GitHub Issues

🚀 Happy Coding! 🎉

