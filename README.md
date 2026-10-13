# ElectroTech - Enterprise MERN Stack Platform & Engine

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![React Version](https://img.shields.io/badge/react-18.3.1-blue.svg)](https://react.dev/)
[![Express Version](https://img.shields.io/badge/express-4.19.2-lightgrey.svg)](https://expressjs.com/)
[![MongoDB / Mongoose](https://img.shields.io/badge/mongoose-8.3.1-green.svg)](https://mongoosejs.com/)
[![Testing: Newman / Postman](https://img.shields.io/badge/tests-Postman%20%7C%20Newman-orange.svg)](https://www.postman.com/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

**ElectroTech** is a modular, full-stack e-commerce engine and extensible MERN (MongoDB, Express.js, React 18, Node.js) platform. Designed both as a turn-key electronics distribution system and as a foundational architecture/starter kit, ElectroTech provides engineering teams with battle-tested patterns for authentication, role-based access control (RBAC), catalog search/filtering, shopping cart state persistence, checkout order fulfillment, and automated contract testing.

Developed during Weeks 5 through 8 of the software engineering internship under the supervision of **Ahmad Othman**.

---

## Table of Contents

- [Overview & Capabilities](#overview--capabilities)
- [System Architecture](#system-architecture)
  - [High-Level Architecture Diagram](#high-level-architecture-diagram)
  - [Subsystem Breakdown](#subsystem-breakdown)
  - [Security & Request Pipeline](#security--request-pipeline)
- [Repository Layout](#repository-layout)
- [Installation & Environment Setup](#installation--environment-setup)
  - [1. Prerequisites](#1-prerequisites)
  - [2. Clone Repository](#2-clone-repository)
  - [3. Backend Configuration & Dependencies](#3-backend-configuration--dependencies)
  - [4. Frontend Dependencies](#4-frontend-dependencies)
  - [5. Database Seeding](#5-database-seeding)
- [Quick Start / Usage](#quick-start--usage)
  - [Running the Services](#running-the-services)
  - [Default Seed Accounts](#default-seed-accounts)
  - [System Health Verification](#system-health-verification)
- [API Reference & Core Contracts](#api-reference--core-contracts)
- [Extensibility Guide: How Others Build On ElectroTech](#extensibility-guide-how-others-build-on-electrotech)
  - [1. Adding New Domain Models and Routes](#1-adding-new-domain-models-and-routes)
  - [2. Integrating Payment Processors (Stripe / PayPal)](#2-integrating-payment-processors-stripe--paypal)
  - [3. Custom Middleware & Cache Layer (e.g., Redis)](#3-custom-middleware--cache-layer-eg-redis)
  - [4. Reusing and Composing Frontend Components](#4-reusing-and-composing-frontend-components)
- [Automated Testing & QA](#automated-testing--qa)
  - [Running Newman Automated Test Suites](#running-newman-automated-test-suites)
- [Roadmap & Maintenance](#roadmap--maintenance)
- [Contributing](#contributing)
- [License](#license)

---

## Overview & Capabilities

ElectroTech serves as a robust baseline for building complex e-commerce, hardware inventory, and B2B ordering portals:

- **Modular Monorepo Structure**: Clean isolation between `backend`, `frontend`, and automated test suites (`postman`).
- **Defensive API Gateway**: Built-in security hardening with Helmet headers, CORS origin verification, Express rate limiters, bcryptjs password hashing, and stateless JWT authorization.
- **Role-Based Access Control (RBAC)**: Enforces least-privilege access boundaries, cleanly distinguishing standard customer operations from administrative inventory controls.
- **Reactive Dark-Mode Client**: React 18 single-page application featuring zero-lag catalog search, multi-attribute filtering, price sliders, cart management, and administrative dashboards.
- **Automated Contract Assertions**: Comprehensive Postman collections and environment variables validating API schemas, status codes, and authorization lifecycles.

---

## System Architecture

### High-Level Architecture Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                        React 18 Frontend Client                        │
│   (Catalog Filter, Cart State, Checkout Flow, Admin Control Center)    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTP / JSON (REST API)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                      Express.js Gateway & Security                     │
│  [Helmet Security Headers] ──► [CORS Whitelist] ──► [Rate Limiter]     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
          ┌─────────────────────────┴─────────────────────────┐
          ▼                                                   ▼
┌───────────────────────────────┐               ┌───────────────────────────────┐
│     Public / Customer APIs    │               │      Admin Protected APIs     │
│  - POST /api/auth/register    │               │  - POST   /api/products       │
│  - POST /api/auth/login       │               │  - PUT    /api/products/:id   │
│  - GET  /api/products         │               │  - DELETE /api/products/:id   │
│  - POST /api/orders           │               │  - GET    /api/orders         │
│  - GET  /api/orders/my-orders │               │  - PUT    /api/orders/:id/st. │
└──────────────┬────────────────┘               └───────────────┬───────────────┘
               │                                                │
               │ [verifyToken Middleware]                       │ [verifyToken + isAdmin]
               └────────────────────────┬───────────────────────┘
                                        ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        Mongoose ODM & Schemas                          │
│            User Model   │   Product Model   │   Order Model            │
└───────────────────────────────────┬────────────────────────────────────┘
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        MongoDB Database Engine                         │
└────────────────────────────────────────────────────────────────────────┘
```

### Subsystem Breakdown

1. **Backend Service (`backend/`)**:
   - **Framework**: Express.js running on Node.js.
   - **Persistence**: MongoDB connected via Mongoose ODM with schema validations and indexing.
   - **Security**: Stateless JSON Web Tokens (`jsonwebtoken`), salting/hashing (`bcryptjs`), HTTP header sanitization (`helmet`), and IP-based rate limiting (`express-rate-limit`).
   - **Diagnostics**: Real-time `/health` check reporting uptime, system timestamp, and MongoDB connection ready states.

2. **Frontend Application (`frontend/`)**:
   - **Framework**: React 18 with modern hook-based state patterns (`useState`, `useEffect`, `useCallback`).
   - **Interface**: Responsive, accessible dark-theme UI crafted with clean CSS custom properties.
   - **Component Hierarchy**:
     - `ProductCatalog` & `ProductCard`: Filtering, searching, sorting, and pagination.
     - `Cart` & `Checkout`: In-memory and local storage state, dynamic tax/shipping calculations.
     - `AdminDashboard`: Real-time inventory metrics, CRUD product forms, and order fulfillment status toggles.
     - `OrderHistory`: Customer order tracking and delivery status indicators.

3. **Automated Testing Suite (`postman/`)**:
   - **Test Runner**: Postman / Newman CLI runner.
   - **Coverage**: Pre-request token generation, schema validation, parameterized tests, error handling regressions, and access control boundaries.

### Security & Request Pipeline

Every incoming HTTP request undergoes the following lifecycle:
```text
Request ──► helmet() ──► cors() ──► express.json() ──► apiLimiter ──► Route Handler ──► Error Handler
```
Protected routes additionally pass through `protect` (JWT decoding and user verification) and `admin` (role assertion).

---

## Repository Layout

```text
modular-mern-starter/
├── LICENSE                                     # MIT Open-Source License
├── README.md                                   # Comprehensive Library & Architecture Guide
├── backend/
│   ├── controllers/
│   │   ├── authController.js                   # User registration, login, profile retrieval
│   │   ├── productController.js                # Product queries, search, admin CRUD operations
│   │   └── orderController.js                  # Order placement, user history, admin status updates
│   ├── middleware/
│   │   ├── authMiddleware.js                   # JWT token extraction and role verification (protect, admin)
│   │   ├── errorMiddleware.js                  # 404 handler and central JSON error formatter
│   │   └── securityMiddleware.js               # Rate limiting configurations
│   ├── models/
│   │   ├── Order.js                            # Order schema, address, price calculations, fulfillment
│   │   ├── Product.js                          # Product schema, pricing, stock tracking, categories
│   │   └── User.js                             # User schema, password hashing middleware, role flags
│   ├── routes/
│   │   ├── authRoutes.js                       # Auth endpoint routing table
│   │   ├── orderRoutes.js                      # Order operations routing table
│   │   └── productRoutes.js                    # Product catalog routing table
│   ├── .env.example                            # Sample environment variables template
│   ├── package.json                            # Backend scripts and dependencies
│   ├── seeder.js                               # Database bootstrap script (sample users & products)
│   └── server.js                               # Application bootstrap, Express configuration, DB hook
├── frontend/
│   ├── public/
│   │   └── index.html                          # HTML5 shell
│   ├── src/
│   │   ├── components/
│   │   │   ├── AdminDashboard.js               # Inventory management & order fulfillment portal
│   │   │   ├── Cart.js                         # Cart drawer/view with item quantity controls
│   │   │   ├── Checkout.js                     # Shipping details, order summary, order submission
│   │   │   ├── Footer.js                       # Global platform footer
│   │   │   ├── Navbar.js                       # Global navigation, auth controls, cart badge
│   │   │   ├── OrderHistory.js                 # Past orders list and order tracking
│   │   │   ├── ProductCard.js                  # Modular individual product presentation card
│   │   │   └── ProductCatalog.js               # Hardware catalog with live search & category filters
│   │   ├── App.js                              # Root component, routing, global state orchestration
│   │   ├── index.js                            # React DOM entrypoint
│   │   └── styles.css                          # Dark-mode design system & utility classes
│   └── package.json                            # Frontend scripts and dependencies
└── postman/
    ├── ElectroTech_API.postman_collection.json # Automated API test collection with assertions
    └── ElectroTech_Environment.postman_environment.json # Configurable environment variables
```

---

## Installation & Environment Setup

### 1. Prerequisites

- **Node.js**: `v18.0.0` or higher ([Download Node.js](https://nodejs.org/))
- **npm**: `v9.0.0` or higher
- **MongoDB**: Active local MongoDB instance (`mongodb://localhost:27017`) or MongoDB Atlas URI

### 2. Clone Repository

```bash
git clone https://github.com/pg449700/modular-mern-starter.git
cd modular-mern-starter
```

### 3. Backend Configuration & Dependencies

Navigate to the `backend/` directory, install packages, and initialize your environment file:

```bash
cd backend
npm install
cp .env.example .env
```

#### Environment Variables Configuration (`backend/.env`):

| Variable | Required | Default Value | Description |
| :--- | :---: | :--- | :--- |
| `PORT` | Optional | `5000` | Port on which the Express server listens |
| `NODE_ENV` | Optional | `development` | Runtime environment (`development`, `production`, `test`) |
| `MONGO_URI` | **Yes** | `mongodb://localhost:27017/electrotech` | MongoDB connection string |
| `JWT_SECRET` | **Yes** | `supersecretjwtkey_electrotech_2026` | Secret key used for signing JSON Web Tokens |
| `JWT_EXPIRE` | Optional | `30d` | Token expiry duration (e.g., `30d`, `24h`) |
| `CLIENT_URL` | Optional | `http://localhost:3000` | Allowed CORS origin for frontend client requests |

### 4. Frontend Dependencies

From the repository root, install the frontend packages:

```bash
cd frontend
npm install
```

### 5. Database Seeding

Populate the database with sample electronics hardware, categories, administrative credentials, and regular users:

```bash
cd backend
npm run seed
```

Output:
```text
MongoDB connected: localhost
Sample data imported successfully!
- Admin Account: admin@electrotech.com (Password: admin123)
- Customer Account: customer@electrotech.com (Password: customer123)
- Products: 12 electronics hardware items seeded
```

---

## Quick Start / Usage

### Running the Services

#### Option A: Terminal 1 - Backend Server
```bash
cd backend
npm run dev   # Uses nodemon for automatic hot-reloading
# or: npm start
```
The server will boot on `http://localhost:5000`.

#### Option B: Terminal 2 - Frontend Client
```bash
cd frontend
npm start
```
The React development server will start and open `http://localhost:3000`.

### Default Seed Accounts

Use these accounts created during the database seeding step to test customer and admin workflows:

| Role | Email | Password | Permissions |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin@electrotech.com` | `admin123` | Product CRUD, Inventory Metrics, Order Fulfillment |
| **Customer** | `customer@electrotech.com` | `customer123` | Browse Catalog, Manage Cart, Place Orders, View History |

### System Health Verification

Execute a health check request against the backend server:

```bash
curl http://localhost:5000/health
```

Expected JSON response:
```json
{
  "status": "healthy",
  "timestamp": "2026-10-13T19:10:00.000Z",
  "uptime": 12.45,
  "database": "connected"
}
```

---

## API Reference & Core Contracts

All API endpoints are prefixed with `/api` and return standardized JSON payloads.

### Authentication Endpoints (`/api/auth`)

| Method | Endpoint | Access | Description | Request Body |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register a new user | `{ name, email, password }` |
| `POST` | `/api/auth/login` | Public | Authenticate user & issue JWT | `{ email, password }` |
| `GET` | `/api/auth/profile` | Authenticated | Retrieve authenticated user profile | Bearer Token in `Authorization` header |

### Product Endpoints (`/api/products`)

| Method | Endpoint | Access | Description | Parameters / Body |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/products` | Public | Fetch products with search/filter | Query: `?keyword=...&category=...` |
| `GET` | `/api/products/:id` | Public | Retrieve single product details | URL param `:id` |
| `POST` | `/api/products` | **Admin Only** | Create a new hardware product | `{ name, price, description, category, countInStock, image }` |
| `PUT` | `/api/products/:id`| **Admin Only** | Update an existing product | Updated fields payload |
| `DELETE`| `/api/products/:id`| **Admin Only** | Delete a product from inventory | URL param `:id` |

### Order Endpoints (`/api/orders`)

| Method | Endpoint | Access | Description | Request Body |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/orders` | Authenticated | Create a new order | `{ orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice }` |
| `GET` | `/api/orders/my-orders` | Authenticated | Fetch current user's order history | Bearer Token in `Authorization` header |
| `GET` | `/api/orders` | **Admin Only** | Fetch all system orders | Bearer Token (Admin) |
| `PUT` | `/api/orders/:id/status`| **Admin Only** | Update order fulfillment status | `{ status: "Processing" \| "Shipped" \| "Delivered" }` |

---

## Extensibility Guide: How Others Build On ElectroTech

ElectroTech is architected to be extended as a library/engine for custom e-commerce applications. Below are standard extension patterns:

### 1. Adding New Domain Models and Routes

To add a new resource (e.g., product reviews, suppliers, or discount coupons):

1. **Define the Mongoose Model** in `backend/models/Supplier.js`:
   ```javascript
   const mongoose = require('mongoose');

   const supplierSchema = new mongoose.Schema({
     name: { type: String, required: true },
     contactEmail: { type: String, required: true },
     rating: { type: Number, default: 5 }
   }, { timestamps: true });

   module.exports = mongoose.model('Supplier', supplierSchema);
   ```

2. **Create the Controller** in `backend/controllers/supplierController.js`:
   ```javascript
   const Supplier = require('../models/Supplier');

   exports.getSuppliers = async (req, res, next) => {
     try {
       const suppliers = await Supplier.find();
       res.json(suppliers);
     } catch (err) {
       next(err);
     }
   };
   ```

3. **Mount the Route** in `backend/routes/supplierRoutes.js` and register it inside `backend/server.js`:
   ```javascript
   const supplierRoutes = require('./routes/supplierRoutes');
   app.use('/api/suppliers', supplierRoutes);
   ```

### 2. Integrating Payment Processors (Stripe / PayPal)

To connect Stripe payment intents:

1. Install Stripe in backend: `npm install stripe`.
2. Add a payment intent controller in `backend/controllers/orderController.js`:
   ```javascript
   const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

   exports.createPaymentIntent = async (req, res, next) => {
     try {
       const { amount } = req.body;
       const paymentIntent = await stripe.paymentIntents.create({
         amount: Math.round(amount * 100), // convert to cents
         currency: 'usd',
         automatic_payment_methods: { enabled: true }
       });
       res.json({ clientSecret: paymentIntent.client_secret });
     } catch (err) {
       next(err);
     }
   };
   ```
3. Expose the endpoint via `orderRoutes.js` and integrate `@stripe/react-stripe-js` into `frontend/src/components/Checkout.js`.

### 3. Custom Middleware & Cache Layer (e.g., Redis)

The architecture supports pluggable middleware before hitting controllers. To cache catalog lookups:

```javascript
const redisClient = require('./config/redis');

const cacheProducts = async (req, res, next) => {
  const cacheKey = `products_${req.query.keyword || 'all'}`;
  const cachedData = await redisClient.get(cacheKey);
  if (cachedData) {
    return res.json(JSON.parse(cachedData));
  }
  res.sendResponse = res.json;
  res.json = (body) => {
    redisClient.setEx(cacheKey, 300, JSON.stringify(body));
    res.sendResponse(body);
  };
  next();
};

router.get('/', cacheProducts, getProducts);
```

### 4. Reusing and Composing Frontend Components

Frontend components are modular and decoupled:

```javascript
import ProductCard from './components/ProductCard';

// Render any list of items using the reusable card component:
function FeaturedProducts({ items, onAddToCart }) {
  return (
    <div className="product-grid">
      {items.map(product => (
        <ProductCard
          key={product._id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
```

---

## Automated Testing & QA

ElectroTech includes an automated test suite verifying contract integrity, HTTP status codes, JSON schema models, and security boundaries.

### Running Newman Automated Test Suites

Ensure Newman is installed, or run via `npx`:

```bash
npx newman run postman/ElectroTech_API.postman_collection.json \
  -e postman/ElectroTech_Environment.postman_environment.json \
  --reporters cli
```

#### What the Test Suite Validates:
- **Health Check**: Validates `status: "healthy"` and database connectivity state.
- **Auth Flow**: Registration, login credential validation, duplicate account prevention, JWT parsing.
- **Product Operations**: Catalog querying, sorting, pagination, and administrative CRUD integrity.
- **RBAC Boundaries**: Verifies non-admin accounts receive `403 Forbidden` on administrative mutations.
- **Rate Limiting**: Verifies that requests exceeding threshold receive `429 Too Many Requests`.

---

## Roadmap & Maintenance

Active roadmap initiatives tracked in GitHub Issues:

- [#1 - Integrate Stripe / PayPal Payment Gateway Processing](https://github.com/pg449700/modular-mern-starter/issues/1) *(enhancement)*
- [#2 - Implement Refresh Token Rotation and HTTP-Only Cookie Storage](https://github.com/pg449700/modular-mern-starter/issues/2) *(enhancement)*
- [#3 - Generate OpenAPI / Swagger Specification and Interactive API Docs](https://github.com/pg449700/modular-mern-starter/issues/3) *(documentation, good first issue)*
- [#4 - Add Multi-Container Docker and Docker-Compose Configuration](https://github.com/pg449700/modular-mern-starter/issues/4) *(enhancement, good first issue)*
- [#5 - Set Up GitHub Actions CI Workflow for Newman API Tests and Linting](https://github.com/pg449700/modular-mern-starter/issues/5) *(enhancement)*

---

## Contributing

Contributions are welcome! Please follow this workflow:

1. **Fork** the repository.
2. **Create a branch** for your feature: `git checkout -b feature/amazing-feature`.
3. **Commit your changes**: `git commit -m 'feat: Add amazing feature'`.
4. **Run Newman tests** to verify no regressions: `npx newman run postman/ElectroTech_API.postman_collection.json -e postman/ElectroTech_Environment.postman_environment.json`.
5. **Push** to the branch: `git push origin feature/amazing-feature`.
6. **Open a Pull Request**.

---

## License

This project is licensed under the [MIT License](LICENSE) - see the [LICENSE](LICENSE) file for full details.
