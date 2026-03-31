# 🌐 Dynamic Personal Portfolio (Full Stack)

A fully dynamic personal portfolio website built using modern web technologies.
This project includes both **frontend (client)** and **backend (API)** to manage and display portfolio data dynamically.

> ⚠️ Note: Admin panel is developed as a **separate repository** and is not included in this project.

---

## 🚀 Features

* 🧑‍💻 Dynamic portfolio (projects, skills, experience, about)
* 🔗 REST API integration
* 📩 Contact form (store & send messages)
* ☁️ Image upload support (Cloudinary)
* 🔐 Authentication (JWT-based)
* ⚡ Real-time updates (Socket.io)
* 📱 Fully responsive design
* 🎨 Modern UI with animations

---

## 🛠 Tech Stack

### Frontend

* React.js (Vite)
* JavaScript (ES6+)
* Tailwind CSS, Bootstrap, CSS
* Material UI (MUI)
* Framer Motion, AOS

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

### Tools & Integrations

* Axios
* JWT Authentication
* Multer + Cloudinary
* Nodemailer / Resend
* Socket.io

---

## 📂 Project Structure

```id="full01"
/client        → Frontend (React - Vite)
/server        → Backend (Node.js - Express)
/models        → Database schemas
/routes        → API routes
/controllers   → Business logic
/middleware    → Auth & validation
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```id="full02"
(https://github.com/BalasuryaMCA2023/Personal_Dynamic_Portfolio-.git)
```

---

### 2️⃣ Install Dependencies

```id="full03"
# Install frontend
cd client
npm install

# Install backend
cd ../server
npm install
```

---

### 3️⃣ Environment Variables

Create a `.env` file inside `/server`:

```id="full04"
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

---

### 4️⃣ Run Project

```id="full05"
# Run backend
cd server
npm run dev

# Run frontend
cd client
npm run dev
```

---

## 🔌 API Base URL

```id="full06"
http://localhost:5000/api
```

---

## 🔗 Related Repositories

* 🛠 Admin Panel (separate project)
  *Used for managing portfolio content dynamically*

---

## 🌍 Live Demo

*Add your deployed link here*

---

## 📸 Screenshots

*Add project screenshots here*

---

## 📄 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

**Bala Surya**

* GitHub: https://github.com/BalasuryaMCA2023
* Portfolio: https://your-portfolio-link.com

---

