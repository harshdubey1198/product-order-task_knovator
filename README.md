# Product & Order Management

## Overview
This project demonstrates **CRUD operations for products** and **order management**.
It is built with a **MERN stack** and supports **search, pagination, and soft deletion**.

## Tech Stack
- **Frontend:** React.js, Reactstrap, Axios  
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)  
- **Authentication:** JWT (optional demo mode handling)  
- **Environment Config:** dotenv

## Features

### Products
- Create, Read, Update, Soft Delete (`deletedAt` used)  
- Search by product name  
- Pagination for listing products  
- Responsive UI with product cards

### Orders
- Place a new order  
- Fetch all orders  
- Integration with products (add products to order)

## Setup Instructions

### 1. Clone repository
```bash
git clone <repo_url>
cd <repo_folder>
```

### 2. Server Setup
```bash
# for frontend 
npm i 
npm start
# for backend
cd server
npm install
npm run dev
# edit .env with MongoDB URI and PORT
```

### 3. Client Setup
```bash
cd client
npm install
npm start
```

### 4. Access the App
- **Frontend:** `http://localhost:3000`  
- **Backend API:** `http://localhost:7200/api`

## Environment Variables
Create `.env` in `server`:
```env
PORT=7200
DEFAULT_PAGE=1
DEFAULT_LIMIT=8
```

## API Endpoints

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/product/products` | Get products (supports pagination & search) |
| POST   | `/api/product/create`   | Create a new product |
| PUT    | `/api/product/update/:id` | Update product |
| DELETE | `/api/product/delete/:id` | Soft delete product |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/api/orders/place-order` | Place a new order |
| GET    | `/api/orders/get-orders`  | Get all orders |

## Project Structure
```
/client
  /components
  /pages
  /apiServices
/server
  /controllers
  /models
  /services
  /routes
```

## Author
**Harsh Dubey** – Fullstack Developer (MERN)  
- Email: amanad08052@gmail.com  


