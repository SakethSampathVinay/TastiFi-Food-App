# Tastifi - Restaurant Food Delivery Application

![Tastifi Banner]([https://your-image-url.com/banner.png](https://res.cloudinary.com/dgtfgihga/image/upload/v1727961916/Screenshot_2024-10-03_185337_kfx3hh.png))

## Project Overview
Tastifi is a modern food delivery platform where users can browse restaurants, order food, and track their orders in real-time.

### Features
- **User Authentication** (Sign Up/Login)
- **Add to Cart & Checkout**
- **Payment Integration** (Stripe)
- **Order Tracking & History**
- **Admin Panel** for managing menus, lists, and orders
- **Secure & Scalable Backend**

---

## Tech Stack

| Section     | Technology |
|------------|------------|
| **Frontend**   | React, Vite, Flexbox |
| **Backend**    | Node.js, Express.js, REST API, MongoDB |
| **Admin Panel** | React, Vite, Flexbox |
| **Deployment** | Vercel |
| **Payment**    | Stripe |

---

## Installation & Setup

### Clone the Repository
```bash
git clone <repo-link>
cd tastifi
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
npm install
npm run start
```

### Admin Panel Setup
```bash
cd admin
npm install
npm run dev
```

---

## Deployment Links

**Live URLs:**
- **Frontend:** [Frontend App](https://tasti-fi.vercel.app/)
- **Admin Panel:** [Admin Dashboard](https://tastifi-adminpanels.vercel.app/add)

---

## Environment Variables
Create a `.env` file in **backend/** and **frontend/**:

```env
# Backend .env
PORT=5000
DATABASE_URL=your-database-url
JWT_SECRET=your-jwt-secret
STRIPE_KEY=your-stripe-key
```

```env
# Frontend .env
VITE_API_URL=https://your-api-url.com
STRIPE_KEY=your-stripe-key
```

---

## Contributor
- **Saketh Sampath Vinay** (Main Developer)

---

## Contact
**For Support:** sakethsampath2006@gmail.com

**Happy Coding!**

