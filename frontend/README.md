
# Insta Reels (MERN)

Modern Instagram-style reels/feed experience built with React 19 + Vite on the frontend and an Express/MongoDB API for auth, posts, reels, and media uploads.

## Features
- Authenticated flows with login/register, protected routes, and token-based API calls
- Feed, reels, profile, and messaging views with Tailwind styling and Framer Motion transitions
- Post creation with media upload (multer), comments, likes data, and searchable hashtags
- MongoDB models for users, posts, comments; static media served from `/uploads`

## Tech Stack
- Frontend: React 19, Vite, Tailwind CSS, Framer Motion, React Router
- Backend: Express, MongoDB (Mongoose), JWT auth, Multer for file uploads

## Quick Start
1) Install deps
```
npm install
```
2) Backend (from /backend)
```
npm install
npm start
```
Runs at https://insta-reels-app.onrender.com with MongoDB Atlas.

3) Frontend (from /frontend)
```
npm run dev
```
Vite dev server starts at http://localhost:5173 and proxies API calls to `/api` by default.

## Environment
- Frontend: `VITE_API_URL` to point to the deployed backend (default `http://localhost:5000` for development)
- Production: Set `VITE_API_URL=https://insta-reels-app.onrender.com`
- Backend: set `PORT` (default 5000) and Mongo connection string if not using local Mongo

## Scripts
- `npm run dev` – start Vite dev server
- `npm run build` – production build
- `npm run lint` – lint frontend code

## Folder Structure (excerpt)
- `frontend/src` – React app (pages, components, hooks, context, services)
- `backend` – Express server, routes, models, uploads storage
