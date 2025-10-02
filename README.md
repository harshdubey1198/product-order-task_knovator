# Test Task - Simple E-commerce Website

Welcome to your Test Task!  

### Task Briefing
Your task is to create a simple e-commerce website that allows users to:
- View a list of products.
- Add products to their cart.
- Place orders.

**Technologies:**
- Frontend: ReactJS
- Backend: NodeJS
- Styling: Any library or approach you prefer.

**Requirements:**

#### Frontend
1. **Product Listing Page**
   - Display a grid of products.
   - Each product card should include:
     - Product image
     - Product name
     - Product description
     - Product price
     - "Add to Cart" button (text or "+" icon)
2. **Cart Page**
   - Accessible via a "Cart" button in the header.
   - Display added products with names, prices, and quantity.
   - Show total price.
   - Form to collect user details:
     - First name (required)
     - Last name (required)
     - Address (required)
3. **Order Placement**
   - "Place Order" button sends a request to the backend.
   - Backend validates required fields.
   - Display a success message upon successful order placement.

#### Backend
1. **Product Data API**
   - Endpoint to fetch a list of products.
   - Each product should have: name, image, description, and price.
   - Products stored in-memory (no database required for products).
2. **Place Order API**
   - Endpoint to place an order.
   - Validate first name, last name, and address.
   - Simulate order placement (print order details to console).
   - Respond with a success message.

#### Additional Guidelines
- Proper project structure for both frontend and backend.
- Error handling on the frontend with user-friendly messages.
- Clean and maintainable code.
- Reusable components encouraged.
- Node_modules **should not** be included in the zip.

### Technical Stack
- **Frontend:** ReactJS
- **Backend:** NodeJS
- **Database (optional for orders):** MongoDB
- **Styling:** Any approach/library

### Marking Criteria
1. Task functionality.
2. Proper naming conventions.
3. Readable code.
4. Reusable components.
5. Use of advanced React concepts.

---

## Environment Variables

### Backend (`.env`)
PORT=7200
TOKEN_KEY=secret


# Testing Keys
MONGO_URI=mongodb+srv://harshhd1198_db_user:harshhd1198_password@task01.mc2ydyg.mongodb.net/task-knovator?retryWrites=true&w=majority&appName=task-knovator
FRONTEND_URL=http://localhost:3000

