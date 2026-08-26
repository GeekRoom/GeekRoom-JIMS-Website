# 🚀 GeekRoom JIMS - Official Website

<div align="center">
  <p>The official website for the GeekRoom technical society at JIMS, featuring a modern public interface and a secure, fully-featured Admin Panel.</p>
</div>

---

## 🌟 Features

### Public Portal
- **Modern UI/UX**: Built with a sleek, dark-themed, glassmorphism aesthetic using Tailwind CSS.
- **Dynamic Events System**: Browse upcoming hackathons, seminars, and past events with detailed image galleries.
- **Team Directory**: Meet the Presidents and Department Heads powering GeekRoom.
- **Contact Integration**: Reach out directly through the website (powered by Brevo email integration).

### Secure Admin Dashboard
- **JWT Authentication**: Hardcoded admin login with automatic 24-hour session management.
- **Events Management**: Create, edit, and delete events. Supports uploading single cover images and multi-image galleries (via ImageKit).
- **Team Management**: Add and update Team Heads, assign roles, and include social links (LinkedIn).
- **Analytics Overview**: View recent activity and total stats at a glance.

---

## 💻 Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS, PostCSS
- **Routing**: React Router DOM v7
- **Icons**: Lucide React & React Icons

### Backend
- **Server**: Node.js & Express.js
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JSON Web Tokens (JWT)
- **File Storage**: ImageKit & Multer
- **Email Service**: Brevo

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/) installed on your machine.

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/GeekRoom-JIMS-Website.git
   cd GeekRoom-JIMS-Website
   ```

2. **Setup the Backend:**
   ```bash
   cd Backend
   npm install
   ```
   Create a `.env` file in the `Backend` directory with your database and API keys:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
   BREVO_API_KEY=your_brevo_api_key
   ```
   Run the backend server:
   ```bash
   npm run dev
   ```

3. **Setup the Frontend:**
   Open a new terminal window:
   ```bash
   cd ../Frontend
   npm install
   ```
   Create a `.env` file in the `Frontend` directory if needed (e.g., for API base URLs):
   ```env
   VITE_API_BASE_URL=http://localhost:3000/api
   ```
   Run the frontend development server:
   ```bash
   npm run dev
   ```

---

## 🔐 Admin Access

To access the secure admin panel:
1. Navigate to `http://localhost:5173/admin/login`.
2. Enter the designated Admin credentials to access the dashboard.
*(Access is restricted to authorized society leads only).*

---

## 🛠️ Project Structure
```text
GeekRoom-JIMS-Website/
├── Backend/                 # Express.js REST API
│   ├── src/
│   │   ├── controllers/     # Route logic (Auth, Events, Team)
│   │   ├── middleware/      # JWT protection & file upload prep
│   │   ├── model/           # Mongoose schemas
│   │   ├── routes/          # Express route definitions
│   │   └── app.js           # Server configuration
│   └── package.json
└── Frontend/                # React Vite Application
    ├── src/
    │   ├── components/      # Reusable UI components & layouts
    │   ├── pages/           # Public and Admin pages
    │   ├── utils/           # API handlers and helpers
    │   └── App.jsx          # Application routing
    └── package.json
```

---

<div align="center">
  <p>Built with ❤️ for GeekRoom JIMS.</p>
</div>