# ⚙️ Personal Portfolio Backend (Client API)

This repository contains the **backend API** for a dynamic personal portfolio website.

> ⚠️ Note: This backend is designed **only for client-side usage**.
> Admin panel functionalities are handled in a **separate project** and are not included here.

---

## 🚀 Features

* 🔗 REST API for portfolio data
* 📁 Manage Projects, Skills, Experience, About
* 📩 Contact form handling (store/send messages)
* 🔐 Authentication support (JWT-based)
* ☁️ Image upload using Cloudinary
* 📧 Email integration (Nodemailer / Resend)
* ⚡ Real-time support using Socket.io

---

## 🛠 Tech Stack

**Backend:**

* Node.js
* Express.js

**Database:**

* MongoDB (Mongoose)

**Authentication:**

* JWT (jsonwebtoken)
* bcryptjs

**File Upload:**

* Multer
* Cloudinary

**Other Tools:**

* Nodemailer / Resend (Emails)
* Socket.io
* Sharp (Image processing)
* dotenv (Environment config)
* CORS

---

## 📂 Project Structure

```id="bck123"
/models        → Database schemas
/routes        → API routes
/controllers   → Business logic
/middleware    → Auth & validation
/config        → DB & cloud setup
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```id="git12"
git clone https://github.com/your-username/your-backend-repo.git
```

### 2️⃣ Install Dependencies

```id="npm45"
npm install
```

### 3️⃣ Environment Variables

Create a `.env` file:

```id="env78"
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

## ▶️ Run Project

```id="run56"
# Development
npm run dev

# Production
npm start
```

---

## 🔌 API Usage

This backend serves APIs for:

* Portfolio data (projects, skills, etc.)
* Contact form submissions
* Authentication (login/register)

👉 Connect this backend with your frontend (client app) using Axios or Fetch.

---

## 🌍 Base URL

```id="url99"
http://localhost:5000/api
```

---

## 📄 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

**Bala Surya**

* GitHub: https://github.com/your-username

---
