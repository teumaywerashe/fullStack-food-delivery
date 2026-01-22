# Food Delivery — Fullstack Application

This repository contains a full-stack food delivery application with separate `frontend/` and `backend/` folders. This single README documents both sides: how to install, run, and deploy the project, plus environment and API notes.

---

## Table of Contents
- Project overview
- Tech stack
- Prerequisites
- Project structure
- Quick start
  - Backend
  - Frontend
- Environment variables
- API overview
- File uploads & storage
- Development workflow
- Deployment notes
- Contributing
- License & contact

---

## Project overview
This project is a food delivery web application. The backend serves a REST API (Node.js + Express + MongoDB) and the frontend is a Vite + React app that consumes the API.

## Tech stack
- Backend: Node.js, Express, MongoDB (Mongoose)
- Frontend: React (Vite)
- Uploads: local `uploads/` folder (project default) — cloud storage (e.g., Cloudinary) recommended for production

## Prerequisites
- Node.js (16+ recommended)
- npm or yarn
- MongoDB (local or Atlas)

## Project structure (important folders)
- `backend/` — Node API, models, controllers, routes, `server.js`
- `frontend/` — React app (Vite)

Example route files (backend): `routes/cartRoute.js`, `routes/foodRouter.js`, `routes/notificationRoute.js`, `routes/orderRoute.js`, `routes/userRoute.js`.

## Quick start
Run backend and frontend in separate terminals.

### Backend (development)
1. Open a terminal and change to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file (copy from `.env.example` if present) and set the values (example below).

4. Start the server:

```bash
# if project has nodemon/dev script
npm run dev

# or
npm start
# or (explicit)
node server.js
```

Server usually runs on `http://localhost:5000` (or as set by your `PORT` env var).

### Frontend (development)
1. Open a second terminal and change to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the dev server:

```bash
npm run dev
```

The Vite dev server typically runs at `http://localhost:5173` (or as printed by Vite). Ensure `VITE_API_URL` (or equivalent) points to your backend.

## Environment variables (examples)

Backend `.env` sample:

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.example.mongodb.net/dbname
JWT_SECRET=your_jwt_secret_here
CLIENT_URL=http://localhost:5173
# Optional: CLOUDINARY_URL or other storage credentials
# CLOUDINARY_URL=...
NODE_ENV=development
```

Frontend `.env` sample (Vite expects `VITE_` prefix):

```env
VITE_API_URL=http://localhost:5000/api
```

Place frontend env vars in `frontend/.env` (or `.env.local`) depending on your tooling.

## API overview
The backend exposes REST endpoints grouped in route files. Example base routes:

- `POST /api/users` — user registration & login routes
- `GET/POST /api/food` — food items listing, create (admin)
- `POST /api/cart` — cart operations
- `POST /api/orders` — create orders, list user orders
- `GET /api/notifications` — notifications

Authentication is typically implemented with JWT. Protected routes require an `Authorization: Bearer <token>` header.

For exact endpoints and request/response shapes check the route/controller files in `backend/controllers/` and `backend/routes/`.

## File uploads & storage
- The project includes a `backend/uploads/` folder for temporary file storage. For production use a cloud storage provider such as Cloudinary, Amazon S3, or Azure Blob Storage and update the upload logic and environment variables accordingly.

## Development workflow
- Run backend and frontend in separate terminals while developing.
- Use Postman/Insomnia or the browser to test endpoints.
- If you want to run both with one command, consider adding a root `package.json` with a `concurrently` script (optional):

```json
{"scripts": {"dev": "concurrently \"cd backend && npm run dev\" \"cd frontend && npm run dev\""}}
```

## Production & deployment notes
- Build the frontend: `cd frontend && npm run build` — host the output on static hosting (Netlify, Vercel, S3 + CloudFront, or serve from Express).
- Configure backend env vars on your hosting platform and point the frontend build to the production API.
- Use a managed MongoDB (Atlas) in production.
- Replace local file uploads with cloud storage.

## Testing
- There are no automated tests included by default. Use API testing tools (Postman) and manual UI tests. If you'd like, I can add a simple test suite or CI steps.

## Contributing
- Fork the repo, create a feature branch, and open a PR with a clear description.
- Keep commits focused and add documentation for any new environment variables or scripts.

## License
This project does not include a license file. Add a `LICENSE` if you intend to specify one (e.g., MIT).

## Contact
If you want changes to this README (different commands, extra examples, or more detail about specific endpoints), tell me what to include and I’ll update it.

---

Created for this repository — to update, edit `README.md` at the project root.
