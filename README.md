<div align="center">

# 📱 Insta Reels App

### A Full-Stack Instagram-Style Reels Experience Built with MERN Stack

[![JavaScript](https://img.shields.io/badge/JavaScript-99.6%25-brightgreen.svg?style=for-the-badge&logo=javascript&logoColor=yellow)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![React](https://img.shields.io/badge/React-19-61DAFB.svg?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-Fast%20Build-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-NoSQL_DB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

*An Instagram-inspired project offering an immersive short-video sharing experience! Built as a modern single-page application with state-of-the-art technologies.*

[Features](#-features) • [Tech Stack](#-tech-stack) • [Project Structure](#-project-structure) • [Quick Start](#-quick-start) • [API Endpoints](#-api-endpoints) • [Contributing](#-contributing)

</div>

---

## ✨ Features

### 🔒 Authentication & Security
✅ Secure **JWT-based authentication**  
✅ Login/Register flows with strong validation  
✅ Protected routes with private user profiles  

### 📸 Content Creation
✅ **Reels/Posts** with media uploads (images, videos)  
✅ Hassle-free uploads using **Multer integration**  
✅ **Searchable hashtags** for posts  

### 💬 Social Interactions
✅ **Likes & Comments** capability for Reels/Posts  
✅ Real-time updates in feed view  
✅ **Direct messaging** feature

### 🎨 User Interface
✅ Responsive design using **TailwindCSS**  
✅ **Framer Motion** animations for engaging UX  
✅ Fully immersive Instagram-inspired interface  

---

## 🛠️ Tech Stack

### Frontend
| Technology | Description |
|------------|-------------|
| ⚛️ **React 19** | Library for building modern UI |
| ⚡ **Vite** | Blazing fast development bundler |
| 🎨 **Tailwind CSS** | Modern utility-first CSS framework |
| 🧭 **React Router** | Simplified client-side navigation |
| 🎭 **Framer Motion** | Advanced animations for components |

### Backend
| Technology | Description |
|------------|-------------|
| 🚀 **Express.js** | Fast & lightweight Node.js framework |
| 🔑 **JWT** | Token-based Authentication |
| 🍃 **MongoDB** | NoSQL database |
| 📤 **Multer** | Middleware to handle media uploads |

---

## 📁 Project Structure

```plaintext
Insta-Reels-App/
├── 📂 frontend/        # React frontend application
│   ├── src/
│   │   ├── pages/       # Pages (Feed, Reels, Profile, etc.)
│   │   ├── components/  # Modular UI components
│   │   ├── hooks/       # Reusable hooks for API connections
│   │   ├── context/     # Context API State Management
│   │   └── services/    # Axios services for API calls
│   └── package.json
│
└── 📂 backend/         # Express.js backend server
    ├── routes/         # API endpoints (auth, posts, comments, etc.)
    ├── models/         # Mongoose Schemas (User, Post, Media)
    ├── middleware/     # Authentication & Validation
    ├── uploads/        # Stored media uploads (images/videos)
    └── package.json
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18 or later)
- **MongoDB** (Local or Atlas)
- **npm** or **yarn**

---

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Abhishek-sandhu/Insta-Reels-App.git
cd Insta-Reels-App
```

---

### 2️⃣ Backend Setup
```bash
cd backend
npm install
npm start
```
🔗 Backend deployed at `https://insta-reels-app.onrender.com`  
📂 MongoDB connected to MongoDB Atlas  

---

### 3️⃣ Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
⚡ Vite dev server starts at `http://localhost:5173`  
🔌 By default, communicates with `/api` (update `VITE_API_BASE_URL` in `.env` if required).

---

## ⚙️ Environment Variables

### Setup your `.env` files for local development:

#### Frontend (`frontend/.env`)
```text
VITE_API_BASE_URL=/api
```

#### Backend (`backend/.env`)
```text
PORT=5000
MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/your-database
JWT_SECRET=your_super_secret_key
```

#### Frontend (`frontend/.env`)
```text
VITE_API_URL=https://insta-reels-app.onrender.com
```

---

## 🔌 API Endpoints

### Authentication APIs
| Endpoint              | Method  | Functionality               |
|-----------------------|---------|-----------------------------|
| `/api/auth/login`     | `POST`  | Authenticate and get token  |
| `/api/auth/register`  | `POST`  | Register a new user         |
| `/api/auth/me`        | `GET`   | Get the current logged user |

---

## 🖼️ Screenshots

> Share how awesome your project looks by adding screenshots showcasing your app!

---

## 🤝 Contributing

🎉 Contributions are welcomed and appreciated! Here's how you can help:  
1. **Fork** this repository  
2. **Create a branch** for your feature (`git checkout -b feature/AmazingFeature`)  
3. **Commit your code** (`git commit -m 'Add some AmazingFeature'`)  
4. **Push your feature branch** (`git push origin feature/AmazingFeature`)  
5. **Create a Pull Request!**  

---

## 🛡️ License

This project is available under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

<div align="center">

### 💖 Made with passion using MERN Stack 💖  
⚡ _Star this repo_ if you like it! ⭐

</div>
