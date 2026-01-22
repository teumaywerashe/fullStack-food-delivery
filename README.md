☕ Food Delivery — Menu Management
A full-stack Food Delivery application where customers can browse menus and place orders without creating an account, while restaurant owners and administrators manage items and orders through role-based access.

🚀 Live Demo
Live Site: <https://fullstack-food-delivery-1.onrender.com>
Backend API / Docs: <https://fullstack-food-delivery.onrender.com>

🛠 Tech Stack
Frontend

- React (Vite)
- CSS / plain CSS (update if using Tailwind, Bootstrap, etc.)

Backend

- Node.js
- Express.js
- MongoDB (Mongoose)

Deployment

- Render

✨ Main Features
👥 Customers (No Login Required)

- Select a restaurant / cafe from a list
- View restaurant menu and product details
- Browse by category
- Search items by name
- Add items to cart and place orders

🛠 Admin (Restaurant Owner)

- Secure login with email and password
- If you don’t have an account contact the Super Admin to create one
- Add, update, and delete menu items
- Manage orders and view order status
- Access protected admin routes

🛡 Super Admin

- Full system control
- Create, update, and remove admin (restaurant owner) accounts
- Manage admin privileges
- Oversee the entire system

🔐 Security

- Role-based access control (RBAC)
- Protected admin and super admin routes
- Public access limited to browsing and ordering

📁 Project Structure

```
├── backend
│   ├── config
│   ├── controllers
│   ├── middlewares
│   ├── models
│   ├── routes
│   └── server.js
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   └── main.jsx
│   └── package.json
└── README.md
```

⚙️ Environment Variables
The backend uses environment variables for configuration.

Create a `backend/.env` file. Example:

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/<dbname>
JWT_SECRET=<your_jwt_secret>
CLIENT_URL=http://localhost:5173
NODE_ENV=development
# Optional: storage or third-party credentials (Cloudinary, AWS, etc.)
```

Frontend `.env` (Vite) example:

```env
VITE_API_URL=http://localhost:5000/api
```

▶️ Run Locally
Backend

```bash
cd backend
npm install
npm run dev
```

Frontend

```bash
cd frontend
npm install
npm run dev
```

📡 API Overview
Method Endpoint Description
GET /api/food Get all food items (public/admin)
GET /api/food/:id Get single food item
POST /api/food Create food item (admin)
PUT /api/food/:id Update food item (admin)
DELETE /api/food/:id Delete food item (admin)

GET /api/cart Get current user cart (or session)
POST /api/cart Add item to cart
PUT /api/cart/:id Update cart item quantity
DELETE /api/cart/:id Remove item from cart

POST /api/orders Create new order
GET /api/orders/user Get authenticated user orders
GET /api/orders/:id Get order details (admin/user)

GET /api/notifications Get notifications (authenticated)

POST /api/users/register Register (admin by superadmin / adjust per flow)
POST /api/users/login Login (admin or superadmin)
GET /api/users/:id Get user/admin details
PUT /api/users/:id Update user/admin (protected)
DELETE /api/users/:id Remove admin (superadmin)

- Note: Adjust route paths and request/response payloads to match your implementation in `backend/routes/` and `backend/controllers/`.

🧠 What This Project Demonstrates

- Full-stack application architecture
- RESTful API design
- Role-based authentication & authorization
- Secure environment variable handling

📌 Future Improvements

- Order tracking and delivery status
- Payment gateway integration
- Dashboard analytics for restaurants
- Image upload with CDN (S3 / Cloudinary)
- Email notifications and reporting

👤 Author
<Your Name>

⭐ If you like this project, feel free to give it a star!
