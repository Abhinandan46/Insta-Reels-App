# Insta Reels App

Full-stack Instagram-style feed/reels experience built with React 19 + Vite on the frontend and Express/MongoDB on the backend. Includes JWT auth, post/reel creation with media uploads, comments, and a modern Tailwind UI.

## Project Structure
- `frontend/` – React app (protected routes for feed, reels, profile, messages; Tailwind + Framer Motion; axios services)
- `backend/` – Express API (auth/posts/reels routes, MongoDB via Mongoose, multer uploads to `/uploads`)

## Quick Start
1) Backend
```bash
cd backend
npm install
npm start
```
Defaults to `http://localhost:5000` with Mongo at `mongodb://localhost:27017/insta_reels`.

2) Frontend
```bash
cd frontend
npm install
npm run dev
```
Vite dev server runs at `http://localhost:5173` and calls the API at `/api` (configure `VITE_API_BASE_URL` if needed).

## Environment
- Frontend: `VITE_API_BASE_URL` (default `/api`)
- Backend: `PORT` (default 5000), Mongo connection string

## Scripts
- Frontend: `npm run dev`, `npm run build`, `npm run lint`
- Backend: `npm start`

## Notes
- Static uploads are served from `/uploads` on the backend
- Remember to keep `node_modules` and `uploads` out of git (already ignored)
# Insta Reels App

Full-stack Instagram-style feed/reels experience built with React 19 + Vite on the frontend and Express/MongoDB on the backend. Includes JWT auth, post/reel creation with media uploads, comments, and a modern Tailwind UI.

## Project Structure
- `frontend/` – React app (protected routes for feed, reels, profile, messages; Tailwind + Framer Motion; axios services)
- `backend/` – Express API (auth/posts/reels routes, MongoDB via Mongoose, multer uploads to `/uploads`)

## Quick Start
1) Backend
```bash
cd backend
npm install
npm start
```
Defaults to `http://localhost:5000` with Mongo at `mongodb://localhost:27017/insta_reels`.

2) Frontend
```bash
cd frontend
npm install
npm run dev
```
Vite dev server runs at `http://localhost:5173` and calls the API at `/api` (configure `VITE_API_BASE_URL` if needed).

## Environment
- Frontend: `VITE_API_BASE_URL` (default `/api`)
- Backend: `PORT` (default 5000), Mongo connection string

## Scripts
- Frontend: `npm run dev`, `npm run build`, `npm run lint`
- Backend: `npm start`

## Notes
- Static uploads are served from `/uploads` on the backend
- Remember to keep `node_modules` and `uploads` out of git (already ignored)
