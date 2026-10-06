# 🛍️ ShopKart | Online Shopping

A full-stack e-commerce website built using React.js, Node.js, Express.js, and MongoDB.

🔗 [Live Website](https://ecommerce-website-frontend-swart.vercel.app/)

---

## 📌 About The Project

ShopKart is a full-stack online shopping platform where users can browse products, search and filter products, manage their cart, add products to their wishlist, place orders, and write product reviews.

The project follows a separate frontend and backend architecture with REST APIs connecting the client and server.

---

## ✨ Features

### 👤 Authentication
- User Registration
- User Login
- JWT-based authentication
- Logout
- Protected routes and APIs

### 🛍️ Products
- Browse products
- Product details
- Search products
- Filter by category
- Sort products by:
  - Newest
  - Oldest
  - Price: Low to High
  - Price: High to Low
  - Name: A-Z
  - Name: Z-A
- Pagination

### 🛒 Shopping Cart
- Add products to cart
- Increase/decrease quantity
- Remove products
- Clear cart
- Automatic cart total

### ❤️ Wishlist
- Add products to wishlist
- Remove products from wishlist
- View wishlist

### 📦 Orders
- Place orders
- View order history
- View order details
- Cancel pending orders
- Order status tracking

### ⭐ Reviews
- View product reviews
- Add product ratings
- Add product comments
- One review per user per product

### 🎨 UI
- Responsive design
- Mobile-friendly layout
- Dark/Light theme
- Modern e-commerce interface

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## 📂 Project Structure

```text
ecommerce-website/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── data/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── vercel.json
│   ├── package.json
│   └── vite.config.js
│
└── backend/
    ├── src/
    │   ├── config/
    │   ├── controllers/
    │   ├── middleware/
    │   ├── models/
    │   ├── routes/
    │   └── server.js
    │
    ├── package.json
    └── .env
