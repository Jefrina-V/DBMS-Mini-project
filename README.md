# 🛒 EMart Grocery Inventory Management System

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)
![License](https://img.shields.io/badge/license-MIT-orange)

## 📋 Overview

EMart is a **full-stack web application** designed to digitize and automate the core operations of a retail grocery store. The system enables efficient management of product catalogues, category organization, user authentication, order processing, and real-time sales monitoring.

### 🎯 Key Features

- ✅ **User Authentication** - Secure registration and login with password hashing.
- ✅ **Product Management** - Browse products organized by categories with real-time search.
- ✅ **Category Management** - Create and manage product categories dynamically.
- ✅ **Order Processing** - Place orders with automatic stock tracking.
- ✅ **Dashboard Analytics** - Real-time metrics: total products, quantity sold, sales amount.
- ✅ **Invoice Generation** - Download professional PDF invoices using jsPDF.
- ✅ **Order Management** - View, delete individual orders or clear all orders.
- ✅ **Responsive Design** - Modern UI that works on desktop and mobile devices.

## 🏗️ Architecture
┌─────────────────────────────────────────────────────────────┐
│ PRESENTATION LAYER                                          │
│ HTML / CSS / JavaScript                                     │
├─────────────────────────────────────────────────────────────┤
│ BUSINESS LAYER                                              │
│ Node.js / Express.js REST API                               │
├─────────────────────────────────────────────────────────────┤
│ DATA LAYER                                                  │
│ MongoDB Atlas                                               │
└─────────────────────────────────────────────────────────────┘


## 🛠️ Technology Stack

### Frontend

 **HTML5** -Structure and content .
 
 **CSS3**-Styling, animations, responsive design.
 
**JavaScript (ES6+)**-Client-side logic, API integration .

 **jsPDF**- PDF invoice generation.
 
**Google Fonts (Poppins)** - Typography .

### Backend
**Node.js** | JavaScript runtime environment.

**Express.js**-REST API framework.

 **bcryptjs**-Password hashing for security.
 
 **cors**-Cross-origin resource sharing.
 
**dotenv** - Environment variable management.

### Database
 **MongoDB Atlas** -Cloud NoSQL database .
 
 **Mongoose** -ODM for schema definition and validation .

## 📁 Project Structure
emart-inventory-system/
│
├── backend/
│ ├── config/
│ │ └── db.js # MongoDB connection
│ ├── controllers/
│ │ ├── authController.js # Authentication logic
│ │ ├── productController.js # Product CRUD operations
│ │ └── orderController.js # Order processing with transactions
│ ├── models/
│ │ ├── user.js # User schema with password hashing
│ │ ├── product.js # Product schema
│ │ └── order.js # Order schema with audit logging
│ ├── routes/
│ │ ├── authRoute.js # Authentication endpoints
│ │ ├── productRoute.js # Product endpoints
│ │ └── orderRoute.js # Order endpoints
│ ├── .env # Environment variables
│ ├── package.json # Dependencies
│ └── server.js # Entry point
│
├── frontend/
│ ├── login.html # User login page
│ ├── register.html # User registration page
│ ├── dashboard.html # Analytics dashboard
│ ├── products.html # Product catalogue
│ ├── categories.html # Category management
│ ├── add_product.html # Add new order
│ └── orders.html # Order management & invoices
│


### Prerequisites

- **Node.js** (v18.x or higher)
- **MongoDB Atlas Account** (free tier)

📡 **API Endpoints**
Authentication Routes
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login existing user
Product Routes
Method	Endpoint	Description
GET	/api/products	Get all products
POST	/api/products	Create a new product
DELETE	/api/products/:id	Delete a product
Order Routes
Method	Endpoint	Description
GET	/api/orders	Get all orders
POST	/api/orders	Create a new order (ACID transaction)
DELETE	/api/orders/:id	Delete an order
POST	/api/orders/eod-reorder	EOD batch processing

💾 **Database Schema**
User Collection
javascript
{
  _id: ObjectId,
  username: String (unique, required),
  email: String (unique, required),
  password: String (hashed),
  orders: [ObjectId],  // References to Order documents
  createdAt: Date,
  updatedAt: Date
}
Product Collection
javascript
{
  _id: ObjectId,
  name: String (required),
  category: String (required),
  price: Number (min: 0),
  stock: Number (min: 0, default: 0),
  userId: ObjectId  // Reference to User
}
Order Collection
javascript
{
  _id: ObjectId,
  products: [{
    name: String,
    quantity: Number,
    price: Number
  }],
  category: String,
  totalAmount: Number,
  userId: ObjectId,  // Reference to User
  createdAt: Date,
  updatedAt: Date
}


🔒 **ACID Properties Demonstrated**

**Atomicity**-	Multi-document transactions in createOrder() using startSession() and commitTransaction().

**Consistency**-	Mongoose schema validation with min: 0 constraints.

**Isolation**-	Snapshot isolation in MongoDB replica sets.

**Durability**-	Write-ahead logging and journaling in MongoDB.

🔄 **Enterprise Features**

1. Database Normalization (1NF to 3NF)
   
1NF: Atomic values in product arrays within orders

2NF: Separated User, Product, Order collections

3NF: Removed transitive dependencies (price snapshot in orders)

2. Triggers (Middleware) for Auditing
   
pre('save') middleware for password hashing

post('save') middleware for order audit logging

3. Views Equivalent (Aggregation Pipelines)
   
Dashboard statistics aggregation

Low stock product filtering

4. Stored Procedures Equivalent
   
createOrder() function encapsulating multi-step transaction logic

processEODReorder() for batch processing

5. EOD Batch Processing
   
Identifies low-stock products (stock < 10)

Generates reorder requests automatically


📝**Future Enhancements**

JWT-based authentication for enhanced security

Email notifications for order confirmations

Advanced analytics dashboard with charts

Role-based access control (Admin, Manager, Staff)

Mobile application (React Native)

Payment gateway integration (Razorpay/Stripe)

Real-time stock updates using WebSockets

⚠️ **Limitations**

Session management uses localStorage (vulnerable to XSS)

No built-in backup and restore functionality

Single-user focus (limited concurrent access)

No support for multiple store locations

📄 **License**
This project is licensed under the MIT License - see the LICENSE file for details.
