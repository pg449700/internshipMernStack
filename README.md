# ElectroTech - Enterprise MERN Stack Electronics Platform

ElectroTech is a full-stack e-commerce and hardware distribution platform built using the MERN stack (MongoDB, Express.js, React 18, and Node.js). It demonstrates modern production patterns across Weeks 5, 6, 7, and 8 of the software engineering internship under the supervision of Ahmad Othman.

## System Architecture

The project is structured into three primary sub-systems:

1. **Backend Service (`backend/`)**:
   - Express.js server with RESTful API endpoints.
   - MongoDB database modeling with Mongoose schemas and strict validation.
   - Multi-layer security architecture (Helmet security headers, CORS origin verification, Express rate limiters, bcryptjs password hashing, and stateless JWT authentication).
   - Role-Based Access Control (RBAC) separating customer operations from administrative inventory controls.

2. **Frontend Application (`frontend/`)**:
   - React 18 single-page application with responsive dark-mode interface.
   - Hardware catalog with real-time text search, category filtering, price sliders, and sorting algorithms.
   - Client-side cart state management with persistent storage.
   - Interactive checkout pipeline with shipping verification, tax calculation, and order tracking.
   - Dedicated Administrator Control Center with live inventory metrics, product CRUD operations, and order status fulfillment.

3. **Automated API Testing (`postman/`)**:
   - Comprehensive Postman test collection (`ElectroTech_API.postman_collection.json`) with automated test assertions.
   - Parameterized Postman environment (`ElectroTech_Environment.postman_environment.json`) supporting environment variable chaining.
   - Verification of HTTP response status codes, JSON schema structures, JWT token lifecycles, and security boundary defenses.

## Repository Layout

```text
MernProject/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   └── orderController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── securityMiddleware.js
│   ├── models/
│   │   ├── Order.js
│   │   ├── Product.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── orderRoutes.js
│   │   └── productRoutes.js
│   ├── .env.example
│   ├── package.json
│   ├── seeder.js
│   └── server.js
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── AdminDashboard.js
│   │   │   ├── Cart.js
│   │   │   ├── Checkout.js
│   │   │   ├── Footer.js
│   │   │   ├── Navbar.js
│   │   │   ├── OrderHistory.js
│   │   │   ├── ProductCard.js
│   │   │   └── ProductCatalog.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── styles.css
│   └── package.json
└── postman/
    ├── ElectroTech_API.postman_collection.json
    └── ElectroTech_Environment.postman_environment.json
```

## Quick Start Guide

### 1. Prerequisites
- Node.js (v18.0 or newer)
- MongoDB instance (local or MongoDB Atlas connection string)

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
npm run seed
npm start
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```

### 4. Running Postman Automated Tests
Import both `postman/ElectroTech_API.postman_collection.json` and `postman/ElectroTech_Environment.postman_environment.json` into Postman or run via Newman:
```bash
npx newman run postman/ElectroTech_API.postman_collection.json -e postman/ElectroTech_Environment.postman_environment.json
```
